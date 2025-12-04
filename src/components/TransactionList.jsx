import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Loader, AlertCircle } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { getTransactionHistory } from '../services/stellar';

const TransactionList = () => {
    const { publicKey } = useWallet();
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!publicKey) return;

            setLoading(true);
            setError(null);
            try {
                const records = await getTransactionHistory(publicKey, 5);

                const formattedTransactions = records.map(record => {
                    // Determine if received or sent
                    const isReceived = record.to === publicKey;
                    const isSent = record.from === publicKey;

                    let type = 'unknown';
                    if (isReceived) type = 'received';
                    if (isSent) type = 'sent';

                    // Use memo as title if available, otherwise use default
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
                        date: new Date(record.created_at).toLocaleString(),
                        hash: record.transaction_hash
                    };
                });
                setTransactions(formattedTransactions);
            } catch (err) {
                console.error("Error loading transactions:", err);
                setError("No se pudieron cargar las transacciones recientes.");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [publicKey]);

    if (loading) {
        return (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-earth-100 flex justify-center">
                <Loader className="animate-spin text-leaf-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-xl p-4 shadow-sm border border-earth-100">
                <h3 className="text-lg font-bold text-earth-800 mb-4">Transacciones Recientes</h3>
                <div className="flex items-center gap-2 text-red-600 text-sm">
                    <AlertCircle size={16} />
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="bg-white rounded-xl p-8 shadow-sm border border-earth-100 text-center">
                <h3 className="text-lg font-bold text-earth-800 mb-2">Transacciones Recientes</h3>
                <p className="text-earth-400 text-sm">No hay transacciones recientes.</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl p-4 shadow-sm border border-earth-100">
            <h3 className="text-lg font-bold text-earth-800 mb-4">Transacciones Recientes</h3>
            <div className="space-y-4">
                {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'received' ? 'bg-leaf-100 text-leaf-600' : 'bg-earth-100 text-earth-600'}`}>
                                {tx.type === 'received' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                            </div>
                            <div>
                                <p className="font-semibold text-earth-900">{tx.title}</p>
                                <p className="text-xs text-earth-400">{tx.date}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className={`font-bold block ${tx.type === 'received' ? 'text-leaf-600' : 'text-earth-900'}`}>
                                {tx.type === 'received' ? '+' : '-'}{parseFloat(tx.amount).toFixed(2)} {tx.asset}
                            </span>
                            <a
                                href={`https://stellar.expert/explorer/testnet/tx/${tx.hash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-leaf-600 hover:underline"
                            >
                                Ver en explorador
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TransactionList;
