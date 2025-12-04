import React from 'react';
import WalletCard from '../components/WalletCard';
import TransactionList from '../components/TransactionList';

const Home = () => {
    return (
        <div className="space-y-6">
            <section>
                <h2 className="text-2xl font-bold text-earth-900 mb-1">Hola, Usuario</h2>
                <p className="text-earth-500">Bienvenido de nuevo a BEANS</p>
            </section>

            <WalletCard />

            <TransactionList />
        </div>
    );
};

export default Home;
