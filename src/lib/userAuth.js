import { Keypair } from '@stellar/stellar-sdk';

/**
 * Storage keys
 */
const USERS_KEY = 'beans_users';
const CURRENT_USER_KEY = 'beans_current_user';

/**
 * Get all users from localStorage
 */
const getUsers = () => {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : {};
};

/**
 * Save users to localStorage
 */
const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

/**
 * Hash a PIN for storage (simple hash for demo - in production use proper encryption)
 */
const hashPin = (pin) => {
    // Simple hash - in production, use a proper hashing library
    let hash = 0;
    for (let i = 0; i < pin.length; i++) {
        const char = pin.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString();
};

/**
 * Register a new user with username and PIN
 * @param {string} username - Username
 * @param {string} pin - 4-digit PIN
 * @returns {Object} User data with Stellar keypair
 */
export const registerUser = (username, pin) => {
    const users = getUsers();

    // Check if username already exists
    if (users[username]) {
        throw new Error('Este nombre de usuario ya está en uso');
    }

    // Validate PIN
    if (!/^\d{4}$/.test(pin)) {
        throw new Error('El PIN debe ser de 4 dígitos');
    }

    // Generate new Stellar keypair
    const keypair = Keypair.random();

    // Create user object
    const user = {
        username,
        pinHash: hashPin(pin),
        publicKey: keypair.publicKey(),
        secretKey: keypair.secret(),
        createdAt: new Date().toISOString()
    };

    // Save user
    users[username] = user;
    saveUsers(users);

    // Set as current user
    localStorage.setItem(CURRENT_USER_KEY, username);

    return {
        username: user.username,
        publicKey: user.publicKey,
        secretKey: user.secretKey
    };
};

/**
 * Login with username and PIN
 * @param {string} username - Username
 * @param {string} pin - 4-digit PIN
 * @returns {Object} User data
 */
export const loginUser = (username, pin) => {
    const users = getUsers();
    const user = users[username];

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    // Verify PIN
    if (user.pinHash !== hashPin(pin)) {
        throw new Error('PIN incorrecto');
    }

    // Set as current user
    localStorage.setItem(CURRENT_USER_KEY, username);

    return {
        username: user.username,
        publicKey: user.publicKey,
        secretKey: user.secretKey
    };
};

/**
 * Check if username exists
 * @param {string} username - Username to check
 * @returns {boolean}
 */
export const userExists = (username) => {
    const users = getUsers();
    return !!users[username];
};

/**
 * Get current logged in user
 * @returns {Object|null} User data or null
 */
export const getCurrentUser = () => {
    const username = localStorage.getItem(CURRENT_USER_KEY);
    if (!username) return null;

    const users = getUsers();
    const user = users[username];

    if (!user) return null;

    return {
        username: user.username,
        publicKey: user.publicKey,
        secretKey: user.secretKey
    };
};

/**
 * Logout current user
 */
export const logoutUser = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
};

/**
 * Get user's secret key (for transactions)
 * @param {string} username - Username
 * @returns {string} Secret key
 */
export const getUserSecretKey = (username) => {
    const users = getUsers();
    const user = users[username];

    if (!user) {
        throw new Error('Usuario no encontrado');
    }

    return user.secretKey;
};
