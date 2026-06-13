import React from 'react';
import { PrivyProvider } from '@privy-io/react-auth';
import Dashboard from './Dashboard';
import './index.css';

function App() {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID || "insert-privy-app-id-here"}
      config={{
        loginMethods: ['email', 'wallet', 'google', 'twitter'],
        appearance: {
          theme: 'dark',
          accentColor: '#3B82F6',
          logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png', // Placeholder
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <Dashboard />
    </PrivyProvider>
  );
}

export default App;
