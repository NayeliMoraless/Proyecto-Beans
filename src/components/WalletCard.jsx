import React from 'react';
import { Eye, EyeOff, LogOut, RefreshCw } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';

const WalletCard = ({ currency = 'XLM' }) => {
    const [showBalance, setShowBalance] = React.useState(true);
    const { balance, loading, fetchBalance, logout } = useWallet();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="bg-gradient-to-br from-leaf-600 to-leaf-800 rounded-2xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-2xl"></div>

            <div className="flex justify-between items-start mb-2">
                <span className="text-leaf-100 text-sm font-medium">Balance Total</span>
                <div className="flex gap-2">
                    <button
                        onClick={fetchBalance}
                        className={`text-leaf-200 hover:text-white transition-colors ${loading ? 'animate-spin' : ''}`}
                        title="Actualizar saldo"
                    >
                        <RefreshCw size={20} />
                    </button>
                    <button
                        onClick={() => setShowBalance(!showBalance)}
                        className="text-leaf-200 hover:text-white transition-colors"
                    >
                        {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
                    </button>
                    <button
                        onClick={handleLogout}
                        className="text-leaf-200 hover:text-red-200 transition-colors ml-2"
                        title="Cerrar sesión"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>

            <div className="flex items-baseline gap-2 mb-6">
                <h2 className="text-4xl font-bold">
                    {showBalance ? parseFloat(balance).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 7 }) : '••••••'}
                </h2>
                <span className="text-xl font-medium text-leaf-200">{currency}</span>
            </div>

            <div className="flex gap-3">
                <button className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm py-2 px-4 rounded-lg text-sm font-semibold transition-colors">
                    Depositar
                </button>
                <button className="flex-1 bg-white text-leaf-700 hover:bg-leaf-50 py-2 px-4 rounded-lg text-sm font-semibold transition-colors shadow-sm">
                    Retirar
                </button>
            </div>
        </div>
    );
};

export default WalletCard;
