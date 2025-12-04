import React from 'react';
import { TrendingUp, ShieldCheck, Leaf } from 'lucide-react';

const Savings = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-earth-900">Ahorros y Rendimiento</h2>

            <div className="bg-gradient-to-br from-earth-700 to-earth-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>

                <div className="flex items-center gap-2 mb-4">
                    <Leaf className="text-leaf-400" />
                    <span className="font-medium text-earth-100">Cuenta de Ahorro</span>
                </div>

                <div className="mb-6">
                    <span className="text-3xl font-bold">500.00 USDC</span>
                    <p className="text-earth-300 text-sm mt-1">≈ 10,250.00 MXN</p>
                </div>

                <div className="flex items-center gap-2 text-leaf-300 bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                    <TrendingUp size={20} />
                    <span className="font-semibold">+5.2% APY (Rendimiento Anual)</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-earth-100 flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-leaf-100 text-leaf-600 rounded-full flex items-center justify-center mb-3">
                        <TrendingUp size={20} />
                    </div>
                    <h4 className="font-bold text-earth-800">Ganancias</h4>
                    <p className="text-2xl font-bold text-leaf-600 mt-1">+$2.45</p>
                    <p className="text-xs text-earth-400">Este mes</p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-earth-100 flex flex-col items-center text-center">
                    <div className="w-10 h-10 bg-earth-100 text-earth-600 rounded-full flex items-center justify-center mb-3">
                        <ShieldCheck size={20} />
                    </div>
                    <h4 className="font-bold text-earth-800">Seguridad</h4>
                    <p className="text-sm text-earth-500 mt-2">Tus fondos están protegidos por la red Stellar.</p>
                </div>
            </div>

            <button className="w-full bg-earth-800 hover:bg-earth-900 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-colors">
                Agregar Fondos a Ahorros
            </button>
        </div>
    );
};

export default Savings;
