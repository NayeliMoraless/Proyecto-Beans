import { startRegistration, startAuthentication } from '@simplewebauthn/browser';

/**
 * Check if WebAuthn is available in the current browser
 */
export const isPasskeyAvailable = () => {
    return window?.PublicKeyCredential !== undefined &&
        typeof window.PublicKeyCredential === 'function';
};

/**
 * Generate a random challenge for WebAuthn
 */
const generateChallenge = () => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return array;
};

/**
 * Convert ArrayBuffer to Base64URL
 */
const arrayBufferToBase64Url = (buffer) => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

/**
 * Register a new passkey for the user
 * @param {string} username - User identifier
 * @returns {Promise<{credentialId: string, publicKey: string}>}
 */
export const registerPasskey = async (username) => {
    if (!isPasskeyAvailable()) {
        throw new Error('Passkeys are not supported in this browser');
    }

    try {
        const challenge = generateChallenge();

        const registrationOptions = {
            challenge,
            rp: {
                name: 'BEANS Wallet',
                id: window.location.hostname,
            },
            user: {
                id: new TextEncoder().encode(username),
                name: username,
                displayName: username,
            },
            pubKeyCredParams: [
                { type: 'public-key', alg: -7 }, // ES256 (secp256r1)
                { type: 'public-key', alg: -257 }, // RS256 (fallback)
            ],
            authenticatorSelection: {
                authenticatorAttachment: 'platform', // Use platform authenticator (fingerprint, face)
                userVerification: 'required',
                requireResidentKey: true,
            },
            timeout: 60000,
            attestation: 'none',
        };

        const credential = await startRegistration(registrationOptions);

        // Store credential info
        const credentialData = {
            credentialId: credential.id,
            publicKey: credential.response.publicKey,
            username,
            createdAt: new Date().toISOString(),
        };

        // Save to localStorage
        localStorage.setItem('passkey_credential', JSON.stringify(credentialData));

        return credentialData;
    } catch (error) {
        console.error('Passkey registration failed:', error);
        throw error;
    }
};

/**
 * Authenticate using an existing passkey
 * @returns {Promise<{username: string, credentialId: string}>}
 */
export const authenticatePasskey = async () => {
    if (!isPasskeyAvailable()) {
        throw new Error('Passkeys are not supported in this browser');
    }

    try {
        const storedCredential = localStorage.getItem('passkey_credential');
        if (!storedCredential) {
            throw new Error('No passkey found. Please register first.');
        }

        const { credentialId, username } = JSON.parse(storedCredential);
        const challenge = generateChallenge();

        const authenticationOptions = {
            challenge,
            rpId: window.location.hostname,
            allowCredentials: [
                {
                    id: credentialId,
                    type: 'public-key',
                    transports: ['internal'],
                },
            ],
            userVerification: 'required',
            timeout: 60000,
        };

        const assertion = await startAuthentication(authenticationOptions);

        return {
            username,
            credentialId: assertion.id,
            authenticatorData: assertion.response.authenticatorData,
            signature: assertion.response.signature,
        };
    } catch (error) {
        console.error('Passkey authentication failed:', error);
        throw error;
    }
};

/**
 * Check if a passkey is already registered
 */
export const hasPasskey = () => {
    return localStorage.getItem('passkey_credential') !== null;
};

/**
 * Remove stored passkey
 */
export const removePasskey = () => {
    localStorage.removeItem('passkey_credential');
};
