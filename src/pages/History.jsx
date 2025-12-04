import React, { useEffect, useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { getTransactionHistory } from '../services/stellar';
import { ArrowUpRight, ArrowDownLeft, Loader, AlertCircle, ExternalLink, Copy, Check } from 'lucide-react';

const History = () => {
    const { publicKey } = useWallet();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [copiedHash, setCopiedHash] = useState(null);

    useEffect(() => {
        fetchTransactions();
    }, [publicKey]);

    const fetchTransactions = async () => {
        if (!publicKey) return;

        setLoading(true);
        setError(null);
        try {
            const records = await getTransactionHistory(publicKey, 50); // Get more transactions

            const formattedTransactions = records.map(record => {
                const isReceived = record.to === publicKey;
                const isSent = record.from === publicKey;

                let type = 'unknown';
                if (isReceived) type = 'received';
                if (isSent) type = 'sent';

                let title = isReceived ? 'Pago Recibido' : 'Pago Enviado';
                if (record.memo && record.memo_type === 'text' && record.memo.trim()) {
                    title = record.memo;
                }

                return {
                    id: record.id,
                    type: type,
                    title: title,
                    amount: record.amount,
                    asset: record.asset_type === 'native' ? 'XLM' : 'Token',
                    date: new Date(record.created_at),
                    hash: record.transaction_hash,
                    from: record.from,
                    to: record.to
                };
            });
            setTransactions(formattedTransactions);
        } catch (err) {
            console.error("Error loading transactions:", err);
            setError("No se pudieron cargar las transacciones.");
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text, hash) => {
        navigator.clipboard.writeText(text);
        setCopiedHash(hash);
        setTimeout(() => setCopiedHash(null), 2000);
    };

    const formatDate = (date) => {
        const now = new Date();
        const diff = now - date;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (days === 0) {
            return `Hoy, ${date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}`;
        } else if (days === 1) {
            return `Ayer, ${date.toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })}`;
        } else if (days < 7) {
            return `Hace ${days} días`;
        } else {
            return date.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader className="animate-spin text-leaf-600" size={40} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-earth-100">
                <div className="flex items-center gap-2 text-red-600">
                    <AlertCircle size={20} />
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="bg-white rounded-xl p-12 shadow-sm border border-earth-100 text-center">
                <div className="w-16 h-16 bg-earth-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ArrowUpRight className="text-earth-400" size={32} />
                </div>
                <h3 className="text-lg font-bold text-earth-800 mb-2">No hay transacciones</h3>
                <p className="text-earth-500 text-sm">Aún no has realizado ninguna transacción.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-earth-900">Historial de Transacciones</h2>
                <button
                    onClick={fetchTransactions}
                    className="text-sm text-leaf-600 hover:text-leaf-700 font-medium"
                >
                    Actualizar
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-earth-100 divide-y divide-earth-100">
                {transactions.map((tx) => (
                    <div key={tx.id} className="p-4 hover:bg-earth-50 transition-colors">
                        <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${tx.type === 'received' ? 'bg-leaf-100 text-leaf-600' : 'bg-earth-100 text-earth-600'
                                }`}>
                                {tx.type === 'received' ? <ArrowDownLeft size={24} /> : <ArrowUpRight size={24} />}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    <div>
                                        <h3 className="font-semibold text-earth-900 mb-1">{tx.title}</h3>
                                        <p className="text-xs text-earth-400">{formatDate(tx.date)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className={`font-bold text-lg ${tx.type === 'received' ? 'text-leaf-600' : 'text-earth-900'
                                            }`}>
                                            {tx.type === 'received' ? '+' : '-'}{parseFloat(tx.amount).toFixed(2)} {tx.asset}
                                        </p>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-2 mt-3">
                                    {tx.from && (
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="text-earth-500 font-medium">De:</span>
                                            <code className="bg-earth-50 px-2 py-1 rounded text-earth-700 font-mono">
                                                {tx.from.substring(0, 4)}...{tx.from.substring(tx.from.length - 4)}
                                            </code>
                                            <button
                                                onClick={() => copyToClipboard(tx.from, `from-${tx.hash}`)}
                                                className="text-earth-400 hover:text-earth-600"
                                            >
                                                {copiedHash === `from-${tx.hash}` ? <Check size={14} /> : <Copy size={14} />}
                                            </button>
                                        </div>
                                    )}

                                    {tx.to && (
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="text-earth-500 font-medium">Para:</span>
                                            <code className="bg-earth-50 px-2 py-1 rounded text-earth-700 font-mono">
                                                {tx.to.substring(0, 4)}...{tx.to.substring(tx.to.length - 4)}
                                            </code>
                                            <button
                                                onClick={() => copyToClipboard(tx.to, `to-${tx.hash}`)}
                                                className="text-earth-400 hover:text-earth-600"
                                            >
                                                {copiedHash === `to-${tx.hash}` ? <Check size={14} /> : <Copy size={14} />}
                                            </button>
                                        </div>
                                    )}

                                    {tx.hash && (
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="text-earth-500 font-medium">Hash:</span>
                                            <code className="bg-earth-50 px-2 py-1 rounded text-earth-700 font-mono">
                                                {tx.hash.substring(0, 8)}...{tx.hash.substring(tx.hash.length - 8)}
                                            </code>
                                            <button
                                                onClick={() => copyToClipboard(tx.hash, tx.hash)}
                                                className="text-earth-400 hover:text-earth-600"
                                            >
                                                {copiedHash === tx.hash ? <Check size={14} /> : <Copy size={14} />}
                                            </button>
                                            <a
                                                href={`https://stellar.expert/explorer/testnet/tx/${tx.hash}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-leaf-600 hover:text-leaf-700 flex items-center gap-1"
                                            >
                                                <ExternalLink size={14} />
                                                <span>Ver en explorador</span>
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {transactions.length >= 50 && (
                <p className="text-center text-sm text-earth-500 py-4">
                    Mostrando las últimas 50 transacciones
                </p>
            )}
        </div>
    );
};

export default History;
