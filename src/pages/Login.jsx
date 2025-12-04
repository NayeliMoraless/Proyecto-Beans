import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight, AlertCircle, UserPlus, LogIn, Rocket } from 'lucide-react';
import { registerUser, loginUser, userExists } from '../lib/userAuth';

const Login = () => {
    const [mode, setMode] = useState('login'); // 'login' or 'register'
    const [username, setUsername] = useState('');
    const [pin, setPin] = useState('');
    const [confirmPin, setConfirmPin] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, connectFreighter } = useWallet();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Validate inputs
            if (!username.trim()) {
                throw new Error('Por favor ingresa tu nombre de usuario');
            }

            if (!/^\d{4}$/.test(pin)) {
                throw new Error('El PIN debe ser de 4 dígitos');
            }

            // Login user
            const user = loginUser(username.trim(), pin);

            // Set wallet context
            login(user.publicKey);

            // Navigate to home
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Validate inputs
            if (!username.trim()) {
                throw new Error('Por favor ingresa un nombre de usuario');
            }

            if (username.trim().length < 3) {
                throw new Error('El nombre de usuario debe tener al menos 3 caracteres');
            }

            if (!/^\d{4}$/.test(pin)) {
                throw new Error('El PIN debe ser de 4 dígitos');
            }

            if (pin !== confirmPin) {
                throw new Error('Los PINs no coinciden');
            }

            // Check if user exists
            if (userExists(username.trim())) {
                throw new Error('Este nombre de usuario ya está en uso');
            }

            // Register user
            const user = registerUser(username.trim(), pin);

            // Set wallet context
            login(user.publicKey);

            // Navigate to home
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFreighterConnect = async () => {
        setError('');
        setLoading(true);
        try {
            await connectFreighter();
            navigate('/');
        } catch (err) {
            setError(err.message || 'Error al conectar con Freighter');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-leaf-50 via-earth-50 to-leaf-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-20 h-20 bg-leaf-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                        <span className="text-4xl font-bold text-white">B</span>
                    </div>
                    <h1 className="text-3xl font-bold text-earth-900 mb-2">BEANS</h1>
                    <p className="text-earth-600">Tu billetera digital para agricultores</p>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {/* Mode Tabs */}
                    <div className="flex gap-2 mb-6 bg-earth-50 p-1 rounded-lg">
                        <button
                            onClick={() => {
                                setMode('login');
                                setError('');
                                setPin('');
                                setConfirmPin('');
                            }}
                            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${mode === 'login'
                                    ? 'bg-white text-leaf-600 shadow-sm'
                                    : 'text-earth-600 hover:text-earth-900'
                                }`}
                        >
                            <LogIn className="inline mr-2" size={18} />
                            Iniciar Sesión
                        </button>
                        <button
                            onClick={() => {
                                setMode('register');
                                setError('');
                                setPin('');
                                setConfirmPin('');
                            }}
                            className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${mode === 'register'
                                    ? 'bg-white text-leaf-600 shadow-sm'
                                    : 'text-earth-600 hover:text-earth-900'
                                }`}
                        >
                            <UserPlus className="inline mr-2" size={18} />
                            Registrarse
                        </button>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-sm">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    {/* Login Form */}
                    {mode === 'login' && (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-earth-700 mb-2">
                                    Nombre de Usuario
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-400" size={20} />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-leaf-500 focus:border-leaf-500 outline-none"
                                        placeholder="Tu nombre de usuario"
                                        disabled={loading}
                                        autoComplete="username"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-earth-700 mb-2">
                                    PIN (4 dígitos)
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-400" size={20} />
                                    <input
                                        type="password"
                                        inputMode="numeric"
                                        pattern="\d{4}"
                                        maxLength="4"
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                                        className="w-full pl-10 pr-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-leaf-500 focus:border-leaf-500 outline-none text-center text-2xl tracking-widest"
                                        placeholder="••••"
                                        disabled={loading}
                                        autoComplete="current-password"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-leaf-500 hover:bg-leaf-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                                <ArrowRight size={20} />
                            </button>
                        </form>
                    )}

                    {/* Register Form */}
                    {mode === 'register' && (
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-earth-700 mb-2">
                                    Nombre de Usuario
                                </label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-400" size={20} />
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-leaf-500 focus:border-leaf-500 outline-none"
                                        placeholder="Elige un nombre de usuario"
                                        disabled={loading}
                                        autoComplete="username"
                                    />
                                </div>
                                <p className="text-xs text-earth-500 mt-1">Mínimo 3 caracteres</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-earth-700 mb-2">
                                    PIN (4 dígitos)
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-400" size={20} />
                                    <input
                                        type="password"
                                        inputMode="numeric"
                                        pattern="\d{4}"
                                        maxLength="4"
                                        value={pin}
                                        onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                                        className="w-full pl-10 pr-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-leaf-500 focus:border-leaf-500 outline-none text-center text-2xl tracking-widest"
                                        placeholder="••••"
                                        disabled={loading}
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-earth-700 mb-2">
                                    Confirmar PIN
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-400" size={20} />
                                    <input
                                        type="password"
                                        inputMode="numeric"
                                        pattern="\d{4}"
                                        maxLength="4"
                                        value={confirmPin}
                                        onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                                        className="w-full pl-10 pr-4 py-3 border border-earth-200 rounded-lg focus:ring-2 focus:ring-leaf-500 focus:border-leaf-500 outline-none text-center text-2xl tracking-widest"
                                        placeholder="••••"
                                        disabled={loading}
                                        autoComplete="new-password"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-leaf-500 hover:bg-leaf-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
                                <ArrowRight size={20} />
                            </button>

                            <div className="bg-leaf-50 border border-leaf-200 rounded-lg p-4 text-sm text-earth-700">
                                <p className="font-medium mb-1">📝 Al registrarte:</p>
                                <ul className="text-xs space-y-1 ml-4">
                                    <li>• Se creará automáticamente una cuenta Stellar</li>
                                    <li>• Tu clave privada se guardará de forma segura</li>
                                    <li>• Podrás recibir y enviar XLM</li>
                                </ul>
                            </div>
                        </form>
                    )}

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-earth-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-earth-500">o continúa con</span>
                        </div>
                    </div>

                    {/* Freighter Button */}
                    <button
                        onClick={handleFreighterConnect}
                        disabled={loading}
                        className="w-full bg-white border-2 border-earth-200 hover:border-leaf-500 hover:bg-leaf-50 text-earth-700 font-semibold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Rocket size={20} className="text-leaf-600" />
                        Conectar con Freighter
                    </button>
                </div>

                {/* Footer */}
                <p className="text-center text-sm text-earth-600 mt-6">
                    Billetera segura para la comunidad agrícola
                </p>
            </div>
        </div>
    );
};

export default Login;
