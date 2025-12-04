import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { User, ArrowRight, Key, AlertCircle, CheckCircle, Loader } from 'lucide-react';
import { StrKey } from '@stellar/stellar-sdk';
import { sendPayment } from '../services/stellar';
import { userSignTransaction } from '../services/freighter';
import { getCurrentUser, getUserSecretKey } from '../lib/userAuth';

const Send = () => {
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [memo, setMemo] = useState('');
    const [secretKey, setSecretKey] = useState('');
    const [showSecretInput, setShowSecretInput] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const { balance, fetchBalance, walletType, publicKey } = useWallet();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate recipient
        if (!StrKey.isValidEd25519PublicKey(recipient)) {
            setError('Dirección de destino inválida');
            return;
        }

        // Validate amount
        const amountNum = parseFloat(amount);
        if (isNaN(amountNum) || amountNum <= 0) {
            setError('Monto inválido');
            return;
        }

        if (amountNum > parseFloat(balance)) {
            setError('Saldo insuficiente');
            return;
        }

        // Check if user is registered with PIN
        const currentUser = getCurrentUser();

        if (walletType === 'manual' && !currentUser) {
            // Only require secret key input for non-registered manual users
            if (!secretKey) {
                setShowSecretInput(true);
                return;
            }

            // Validate secret key
            if (!StrKey.isValidEd25519SecretSeed(secretKey)) {
                setError('Clave secreta inválida');
                return;
            }
        }

        // Send transaction
        setLoading(true);
        try {
            let signer;

            // Check if user is registered with PIN
            const currentUser = getCurrentUser();

            if (walletType === 'freighter') {
                // If Freighter, we pass a custom signer function
                signer = async (xdr) => {
                    return await userSignTransaction(xdr, "TESTNET");
                };
            } else if (currentUser) {
                // If registered user, use their stored secret key
                signer = getUserSecretKey(currentUser.username);
            } else {
                // Otherwise, use manually entered secret key
                signer = secretKey;
            }

            const result = await sendPayment(signer, recipient, amount, memo, publicKey);
            setSuccess(`✅ Transacción exitosa! Hash: ${result.hash.substring(0, 8)}...`);

            // Clear form
            setAmount('');
            setRecipient('');
            setMemo('');
            setSecretKey('');
            setShowSecretInput(false);

            // Update balance
            setTimeout(() => {
                fetchBalance();
            }, 2000);
        } catch (err) {
            setError(err.message || 'Error al enviar la transacción');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setShowSecretInput(false);
        setSecretKey('');
        setError('');
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-earth-900">Enviar Dinero</h2>

            {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                </div>
            )}

            {success && (
                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
                    <CheckCircle size={16} />
                    <span>{success}</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-earth-100 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-earth-600 mb-2">Destinatario</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-earth-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-3 border border-earth-200 rounded-lg focus:ring-leaf-500 focus:border-leaf-500 outline-none transition-colors font-mono text-sm"
                                placeholder="G..."
                                value={recipient}
                                onChange={(e) => setRecipient(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-earth-600 mb-2">Monto (XLM)</label>
                        <div className="relative">
                            <input
                                type="number"
                                className="block w-full pl-3 pr-3 py-3 text-2xl font-bold text-earth-900 border border-earth-200 rounded-lg focus:ring-leaf-500 focus:border-leaf-500 outline-none transition-colors"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                min="0"
                                step="0.0000001"
                                disabled={loading}
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-earth-400 font-medium">XLM</span>
                            </div>
                        </div>
                        <p className="text-xs text-earth-400 mt-2 text-right">
                            Balance disponible: {parseFloat(balance).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 7 })} XLM
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-earth-600 mb-2">Concepto (opcional)</label>
                        <input
                            type="text"
                            className="block w-full pl-3 pr-3 py-3 border border-earth-200 rounded-lg focus:ring-leaf-500 focus:border-leaf-500 outline-none transition-colors"
                            placeholder="Ej: Pago de semillas, Venta de cosecha..."
                            value={memo}
                            onChange={(e) => setMemo(e.target.value)}
                            maxLength={28}
                            disabled={loading}
                        />
                        <p className="text-xs text-earth-400 mt-1">
                            {memo.length}/28 caracteres
                        </p>
                    </div>

                    {showSecretInput && walletType === 'manual' && (
                        <div className="border-t border-earth-200 pt-4">
                            <label className="block text-sm font-medium text-earth-600 mb-2">
                                🔐 Clave Secreta (Secret Key)
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Key className="h-5 w-5 text-earth-400" />
                                </div>
                                <input
                                    type="password"
                                    className="block w-full pl-10 pr-3 py-3 border border-earth-200 rounded-lg focus:ring-leaf-500 focus:border-leaf-500 outline-none transition-colors font-mono text-sm"
                                    placeholder="S..."
                                    value={secretKey}
                                    onChange={(e) => setSecretKey(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <p className="text-xs text-earth-500 mt-2">
                                ⚠️ Tu clave secreta no se guardará. Solo se usa para firmar esta transacción.
                            </p>
                        </div>
                    )}
                </div>

                <div className="flex gap-3">
                    {showSecretInput && walletType === 'manual' && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                            className="flex-1 bg-earth-200 hover:bg-earth-300 text-earth-800 font-bold py-4 px-6 rounded-xl transition-all disabled:opacity-50"
                        >
                            Cancelar
                        </button>
                    )}
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-leaf-600 hover:bg-leaf-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader size={20} className="animate-spin" />
                                Enviando...
                            </>
                        ) : (
                            <>
                                {showSecretInput && walletType === 'manual' ? 'Confirmar Envío' : 'Continuar'}
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Send;
