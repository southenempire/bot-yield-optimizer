import React from 'react';
import { PrivyProvider } from '@privy-io/react-auth';

interface Props {
  children: React.ReactNode;
}

const PrivyWrapper: React.FC<Props> = ({ children }) => {
  return (
    <PrivyProvider
      appId={import.meta.env.VITE_PRIVY_APP_ID}
      config={{
        loginMethods: ['email', 'wallet', 'google', 'twitter'],
        appearance: {
          theme: 'dark',
          accentColor: '#3B82F6',
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
};

export default PrivyWrapper;
