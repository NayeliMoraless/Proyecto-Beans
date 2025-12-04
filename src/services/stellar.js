import { Horizon, Keypair, TransactionBuilder, Networks, Operation, Asset, StrKey, Memo } from '@stellar/stellar-sdk';

const server = new Horizon.Server('https://horizon-testnet.stellar.org');

/**
 * Check if an account exists on the network
 * @param {string} publicKey - Stellar public key
 * @returns {Promise<boolean>}
 */
export const accountExists = async (publicKey) => {
    try {
        await server.loadAccount(publicKey);
        return true;
    } catch (error) {
        if (error.response?.status === 404) {
            return false;
        }
        throw error;
    }
};

/**
 * Get account balance
 * @param {string} publicKey - Stellar public key
 * @returns {Promise<string>} Balance in XLM
 */
export const checkBalance = async (publicKey) => {
    try {
        // Validate public key format
        if (!StrKey.isValidEd25519PublicKey(publicKey)) {
            throw new Error('Formato de clave pública inválido');
        }

        const account = await server.loadAccount(publicKey);
        const xlmBalance = account.balances.find((b) => b.asset_type === 'native');
        return xlmBalance ? xlmBalance.balance : '0';
    } catch (error) {
        console.error('Error fetching balance:', error);
        if (error.response?.status === 404) {
            throw new Error('Cuenta no encontrada. Asegúrate de que la cuenta esté fondeada.');
        }
        throw error;
    }
};

/**
 * Validate transaction parameters before building
 * @param {string} sourceSecret - Source account secret key
 * @param {string} destinationPublic - Destination public key
 * @param {string} amount - Amount to send
 * @returns {Promise<{valid: boolean, error?: string}>}
 */
/**
 * Validate transaction parameters before building
 * @param {string|null} sourceSecret - Source account secret key (null if using external signer)
 * @param {string} destinationPublic - Destination public key
 * @param {string} amount - Amount to send
 * @param {string} [sourcePublicKey] - Source public key (required if sourceSecret is null)
 * @returns {Promise<{valid: boolean, error?: string}>}
 */
const validateTransactionParams = async (sourceSecret, destinationPublic, amount, sourcePublicKey = null) => {
    // Validate secret key format if provided
    if (sourceSecret && !StrKey.isValidEd25519SecretSeed(sourceSecret)) {
        return { valid: false, error: 'Clave secreta inválida' };
    }

    // Validate destination public key format
    if (!StrKey.isValidEd25519PublicKey(destinationPublic)) {
        return { valid: false, error: 'Dirección de destino inválida' };
    }

    // Validate amount
    const amountNum = parseFloat(amount);
    if (isNaN(amountNum) || amountNum <= 0) {
        return { valid: false, error: 'Monto inválido' };
    }

    // Check if destination account exists
    const destExists = await accountExists(destinationPublic);
    if (!destExists) {
        return { valid: false, error: 'La cuenta de destino no existe en la red' };
    }

    // Get source public key
    let sourcePublic = sourcePublicKey;
    if (sourceSecret) {
        const sourceKeypair = Keypair.fromSecret(sourceSecret);
        sourcePublic = sourceKeypair.publicKey();
    }

    if (!sourcePublic) {
        return { valid: false, error: 'Clave pública de origen no proporcionada' };
    }

    try {
        const balance = await checkBalance(sourcePublic);
        const balanceNum = parseFloat(balance);

        // Account for minimum balance (1 XLM) and transaction fee (0.00001 XLM)
        const minRequired = amountNum + 0.00001;
        if (balanceNum < minRequired) {
            return { valid: false, error: `Saldo insuficiente. Necesitas al menos ${minRequired} XLM` };
        }

        // Warn if balance will be below minimum
        if (balanceNum - amountNum < 1) {
            return { valid: false, error: 'Debes mantener al menos 1 XLM en tu cuenta' };
        }
    } catch (error) {
        return { valid: false, error: error.message };
    }

    return { valid: true };
};

/**
 * Send XLM payment to another account
 * @param {string|function} sourceSecretOrSigner - Secret key (string) or signer function
 * @param {string} destinationPublic - Public key of recipient (starts with G)
 * @param {string} amount - Amount of XLM to send
 * @param {string} memo - Optional memo for the transaction
 * @param {string} sourcePublicKey - Required if using a signer function
 * @returns {Promise<{success: boolean, hash: string, ledger: number}>}
 */
export const sendPayment = async (sourceSecretOrSigner, destinationPublic, amount, memo = '', sourcePublicKey = null) => {
    try {
        let sourceKeypair;
        let senderPublicKey = sourcePublicKey;

        // Determine if we have a secret key or a signer function
        const isSignerFunction = typeof sourceSecretOrSigner === 'function';

        if (!isSignerFunction) {
            // It's a secret key
            if (!StrKey.isValidEd25519SecretSeed(sourceSecretOrSigner)) {
                throw new Error('Clave secreta inválida');
            }
            sourceKeypair = Keypair.fromSecret(sourceSecretOrSigner);
            senderPublicKey = sourceKeypair.publicKey();
        } else {
            // It's a signer function, we need the public key
            if (!senderPublicKey) {
                throw new Error('Se requiere la clave pública para firmar externamente');
            }
        }

        // Validate other parameters
        const validation = await validateTransactionParams(
            isSignerFunction ? null : sourceSecretOrSigner,
            destinationPublic,
            amount,
            senderPublicKey // Pass public key explicitly for validation
        );

        if (!validation.valid) {
            throw new Error(validation.error);
        }

        // Load source account
        const sourceAccount = await server.loadAccount(senderPublicKey);

        // Build transaction
        const transactionBuilder = new TransactionBuilder(sourceAccount, {
            fee: await server.fetchBaseFee(),
            networkPassphrase: "Test SDF Network ; September 2015", // Force Testnet
        });

        console.log("Transaction built for network:", "Test SDF Network ; September 2015");

        // Add payment operation
        transactionBuilder.addOperation(
            Operation.payment({
                destination: destinationPublic,
                asset: Asset.native(),
                amount: amount.toString(),
            })
        );

        // Add memo if provided
        if (memo && memo.trim()) {
            transactionBuilder.addMemo(Memo.text(memo.trim().substring(0, 28)));
        }

        // Set timeout and build
        const transaction = transactionBuilder.setTimeout(30).build();

        let result;

        if (isSignerFunction) {
            // Sign with external signer (Freighter)
            const xdr = transaction.toXDR();
            console.log("Unsigned XDR:", xdr);

            const signedXdr = await sourceSecretOrSigner(xdr);
            console.log("Signed XDR from Freighter:", signedXdr);

            // Submit signed XDR
            const transactionFromXdr = TransactionBuilder.fromXDR(signedXdr, "Test SDF Network ; September 2015");
            result = await server.submitTransaction(transactionFromXdr);
        } else {
            // Sign with secret key
            transaction.sign(sourceKeypair);
            result = await server.submitTransaction(transaction);
        }

        // Verify transaction was successful
        if (!result.successful) {
            throw new Error('La transacción no se completó exitosamente');
        }

        return {
            success: true,
            hash: result.hash,
            ledger: result.ledger,
        };
    } catch (error) {
        console.error('Error sending payment:', error);

        // Parse Stellar-specific errors
        let errorMessage = 'Error al enviar la transacción';

        if (error.response?.data?.extras?.result_codes) {
            const codes = error.response.data.extras.result_codes;

            // Transaction-level errors
            if (codes.transaction === 'tx_insufficient_balance') {
                errorMessage = 'Saldo insuficiente para completar la transacción';
            } else if (codes.transaction === 'tx_bad_seq') {
                errorMessage = 'Error de secuencia. Por favor intenta de nuevo';
            } else if (codes.transaction === 'tx_insufficient_fee') {
                errorMessage = 'Tarifa de transacción insuficiente';
            } else if (codes.transaction === 'tx_bad_auth') {
                errorMessage = 'Error de autenticación. Verifica tu clave secreta';
            }

            // Operation-level errors
            if (codes.operations) {
                if (codes.operations.includes('op_no_destination')) {
                    errorMessage = 'La cuenta de destino no existe';
                } else if (codes.operations.includes('op_underfunded')) {
                    errorMessage = 'Fondos insuficientes en la cuenta origen';
                } else if (codes.operations.includes('op_line_full')) {
                    errorMessage = 'La cuenta de destino ha alcanzado su límite';
                }
            }
        } else if (error.message) {
            errorMessage = error.message;
        }

        throw new Error(errorMessage);
    }
};

/**
 * Get recent payment operations for an account
 * @param {string} publicKey - Stellar public key
 * @param {number} limit - Number of transactions to fetch
 * @returns {Promise<Array>}
 */
export const getTransactionHistory = async (publicKey, limit = 10) => {
    try {
        if (!StrKey.isValidEd25519PublicKey(publicKey)) {
            throw new Error('Formato de clave pública inválido');
        }

        const operations = await server
            .payments()
            .forAccount(publicKey)
            .limit(limit)
            .order('desc')
            .call();

        // Enrich each payment with transaction details (to get memo)
        const enrichedPayments = await Promise.all(
            operations.records.map(async (payment) => {
                try {
                    // Fetch the transaction details to get memo
                    const transaction = await server.transactions()
                        .transaction(payment.transaction_hash)
                        .call();

                    // Add memo to payment record
                    return {
                        ...payment,
                        memo: transaction.memo || null,
                        memo_type: transaction.memo_type || 'none'
                    };
                } catch (err) {
                    console.error('Error fetching transaction details:', err);
                    // Return payment without memo if transaction fetch fails
                    return {
                        ...payment,
                        memo: null,
                        memo_type: 'none'
                    };
                }
            })
        );

        return enrichedPayments;
    } catch (error) {
        console.error('Error fetching transaction history:', error);
        // If 404, it means no operations found (new account), return empty array
        if (error.response?.status === 404) {
            return [];
        }
        throw error;
    }
};
