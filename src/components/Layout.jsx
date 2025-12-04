import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, Send, PiggyBank, Menu, LogOut, X, Clock } from 'lucide-react';
import { useWallet } from '../context/WalletContext';

const Layout = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useWallet();
    const [showMenu, setShowMenu] = useState(false);

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-earth-50 flex flex-col">
            {/* Header */}
            <header className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-10">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-leaf-500 rounded-full flex items-center justify-center text-white font-bold">
                        B
                    </div>
                    <h1 className="text-xl font-bold text-earth-800">BEANS</h1>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-2 text-earth-600 hover:bg-earth-100 rounded-full"
                    >
                        {showMenu ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Dropdown Menu */}
                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-earth-200 overflow-hidden">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center gap-2 px-4 py-3 text-left text-earth-700 hover:bg-earth-50 transition-colors"
                            >
                                <LogOut size={18} />
                                <span>Cerrar sesión</span>
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 p-4 pb-20 max-w-md mx-auto w-full">
                {children}
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-earth-200 pb-safe">
                <div className="flex justify-around items-center p-2 max-w-md mx-auto">
                    <Link to="/" className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive('/') ? 'text-leaf-600' : 'text-earth-400 hover:text-earth-600'}`}>
                        <Home size={24} />
                        <span className="text-xs mt-1 font-medium">Inicio</span>
                    </Link>
                    <Link to="/send" className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive('/send') ? 'text-leaf-600' : 'text-earth-400 hover:text-earth-600'}`}>
                        <Send size={24} />
                        <span className="text-xs mt-1 font-medium">Enviar</span>
                    </Link>
                    <Link to="/history" className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive('/history') ? 'text-leaf-600' : 'text-earth-400 hover:text-earth-600'}`}>
                        <Clock size={24} />
                        <span className="text-xs mt-1 font-medium">Historial</span>
                    </Link>
                    <Link to="/savings" className={`flex flex-col items-center p-2 rounded-lg transition-colors ${isActive('/savings') ? 'text-leaf-600' : 'text-earth-400 hover:text-earth-600'}`}>
                        <PiggyBank size={24} />
                        <span className="text-xs mt-1 font-medium">Ahorros</span>
                    </Link>
                </div>
            </nav>
        </div>
    );
};

export default Layout;
