import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Send from './pages/Send';
import Savings from './pages/Savings';
import History from './pages/History';
import Login from './pages/Login';
import { WalletProvider, useWallet } from './context/WalletContext';

const ProtectedRoute = ({ children }) => {
  const { publicKey } = useWallet();
  if (!publicKey) return <Navigate to="/login" />;
  return <Layout>{children}</Layout>;
};

function App() {
  return (
    <WalletProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/send" element={<ProtectedRoute><Send /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/savings" element={<ProtectedRoute><Savings /></ProtectedRoute>} />
        </Routes>
      </Router>
    </WalletProvider>
  );
}

export default App;
