import {
    isConnected,
    requestAccess,
    signTransaction,
    setAllowed,
} from "@stellar/freighter-api";

/**
 * Check if Freighter is installed and connected
 * @returns {Promise<boolean>}
 */
export const checkConnection = async () => {
    try {
        const connected = await isConnected();
        return connected;
    } catch (error) {
        console.error("Error checking Freighter connection:", error);
        return false;
    }
};

/**
 * Request access to the user's public key
 * @returns {Promise<string|null>} The public key or null if failed
 */
export const retrievePublicKey = async () => {
    try {
        const connected = await checkConnection();
        if (!connected) {
            throw new Error("Freighter no está instalado o detectado.");
        }

        const publicKey = await requestAccess();
        // Handle case where it returns an object { address: "..." }
        if (typeof publicKey === 'object' && publicKey !== null && publicKey.address) {
            return publicKey.address;
        }
        return publicKey;
    } catch (error) {
        console.error("Error retrieving public key from Freighter:", error);
        throw error;
    }
};

/**
 * Sign a transaction XDR using Freighter
 * @param {string} xdr - The transaction XDR
 * @param {string} network - The network passphrase (e.g., "Testnet")
 * @returns {Promise<string>} The signed transaction XDR
 */
export const userSignTransaction = async (xdr, network = "TESTNET") => {
    try {
        console.log("Freighter signing request:", { network, xdrLength: xdr.length });
        const signedTransaction = await signTransaction(xdr, {
            network,
            networkPassphrase: "Test SDF Network ; September 2015", // Explicitly force Testnet passphrase
        });

        if (signedTransaction && typeof signedTransaction === 'object' && 'signedTxXdr' in signedTransaction) {
            return signedTransaction.signedTxXdr;
        }

        return signedTransaction;
    } catch (error) {
        console.error("Error signing transaction with Freighter:", error);
        throw error;
    }
};
