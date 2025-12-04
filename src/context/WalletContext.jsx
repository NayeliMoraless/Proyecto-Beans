import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkBalance } from '../services/stellar';
import { authenticatePasskey, registerPasskey, hasPasskey as checkHasPasskey } from '../lib/passkey';
import { retrievePublicKey, checkConnection } from '../services/freighter';
import { StrKey } from '@stellar/stellar-sdk';

const WalletContext = createContext();

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
    const [publicKey, setPublicKey] = useState(localStorage.getItem('stellar_public_key') || '');
    const [balance, setBalance] = useState('0');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasPasskey, setHasPasskey] = useState(checkHasPasskey());
    const [walletType, setWalletType] = useState(localStorage.getItem('wallet_type') || 'manual');

    useEffect(() => {
        if (publicKey) {
            // Validate public key format to prevent errors
            if (!StrKey.isValidEd25519PublicKey(publicKey)) {
                console.warn("Invalid public key detected, clearing state:", publicKey);
                setPublicKey('');
                localStorage.removeItem('stellar_public_key');
                return;
            }

            localStorage.setItem('stellar_public_key', publicKey);
            localStorage.setItem('wallet_type', walletType);
            fetchBalance();
        } else {
            localStorage.removeItem('stellar_public_key');
            localStorage.removeItem('wallet_type');
            setBalance('0');
        }
    }, [publicKey, walletType]);

    const fetchBalance = async () => {
        if (!publicKey) return;

        setLoading(true);
        setError(null);
        try {
            const bal = await checkBalance(publicKey);
            setBalance(bal);
        } catch (err) {
            console.error('Error fetching balance:', err);
            // If account doesn't exist (404), set balance to 0 instead of showing error
            if (err.message && err.message.includes('no encontrada')) {
                setBalance('0');
                setError('Esta cuenta aún no está fondeada. Necesitas recibir al menos 1 XLM para activarla.');
            } else {
                setError(err.message || 'Error al obtener el balance');
            }
        } finally {
            setLoading(false);
        }
    };

    const login = (key) => {
        setPublicKey(key);
        setWalletType('manual');
    };

    const connectFreighter = async () => {
        setLoading(true);
        setError(null);
        try {
            const isInstalled = await checkConnection();
            if (!isInstalled) {
                throw new Error('Freighter no está instalado. Por favor instálalo para continuar.');
            }
            const key = await retrievePublicKey();
            if (key) {
                setPublicKey(key);
                setWalletType('freighter');
                return true;
            }
            return false;
        } catch (err) {
            setError(err.message || 'Error al conectar con Freighter');
            console.error(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const loginWithPasskey = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await authenticatePasskey();
            const storedKey = localStorage.getItem(`passkey_stellar_${result.username}`);
            if (storedKey) {
                setPublicKey(storedKey);
                setWalletType('manual');
            } else {
                throw new Error('No Stellar account linked to this passkey');
            }
        } catch (err) {
            setError(err.message || 'Error al autenticar con passkey');
            console.error(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const registerPasskeyForUser = async (username, stellarPublicKey) => {
        setLoading(true);
        setError(null);
        try {
            const credential = await registerPasskey(username);
            localStorage.setItem(`passkey_stellar_${username}`, stellarPublicKey);
            setHasPasskey(true);
            setPublicKey(stellarPublicKey);
            setWalletType('manual');
            return credential;
        } catch (err) {
            setError(err.message || 'Error al registrar passkey');
            console.error(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setPublicKey('');
        setBalance('0');
        setWalletType('manual');
    };

    return (
        <WalletContext.Provider value={{
            publicKey,
            balance,
            loading,
            error,
            walletType,
            login,
            connectFreighter,
            loginWithPasskey,
            registerPasskeyForUser,
            logout,
            fetchBalance,
            hasPasskey,
        }}>
            {children}
        </WalletContext.Provider>
    );
};
