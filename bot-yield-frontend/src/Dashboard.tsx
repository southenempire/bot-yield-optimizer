import React from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { Wallet, TrendingUp, Activity, Shield, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { login, ready, authenticated, user, logout } = usePrivy();

  return (
    <div className="container animate-fade-in" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      
      {/* Navigation Bar */}
      <nav className="flex-between glass-panel" style={{ padding: '16px 24px', marginBottom: '40px' }}>
        <div className="flex-center" style={{ gap: '12px' }}>
          <div className="status-dot"></div>
          <h2 style={{ fontSize: '20px', margin: 0 }}>BOT Yield Optimizer</h2>
        </div>
        
        <div className="flex-center" style={{ gap: '16px' }}>
          {authenticated && user ? (
            <>
              <div style={{ color: 'var(--text-secondary)', fontSize: '14px', background: 'rgba(255,255,255,0.05)', padding: '8px 16px', borderRadius: '20px' }}>
                {user.wallet?.address ? `${user.wallet.address.slice(0,6)}...${user.wallet.address.slice(-4)}` : user.email?.address}
              </div>
              <button className="btn-secondary" onClick={logout}>Disconnect</button>
            </>
          ) : (
            <button className="btn-primary" disabled={!ready} onClick={login}>
              Connect Wallet
            </button>
          )}
        </div>
      </nav>

      {/* Main Dashboard Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        
        {/* Left Column: Vault Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* TVL Hero Card */}
          <div className="glass-panel" style={{ padding: '40px', background: 'var(--grad-surface)' }}>
            <h3 style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '12px', fontWeight: 500 }}>Total Value Locked (TVL)</h3>
            <h1 className="text-gradient" style={{ fontSize: '48px', marginBottom: '24px' }}>$142,590.00</h1>
            
            <div style={{ display: 'flex', gap: '32px' }}>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '4px' }}>Target APY</p>
                <p style={{ color: 'var(--accent-green)', fontSize: '24px', fontWeight: 600 }}>18.4%</p>
              </div>
              <div>
                <p style={{ color: 'var(--text-muted)', fontSize: '13px', marginBottom: '4px' }}>Risk Score</p>
                <p style={{ color: 'var(--text-primary)', fontSize: '24px', fontWeight: 600 }}>A+</p>
              </div>
            </div>
          </div>

          {/* Deposit Actions */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '20px', marginBottom: '24px' }}>Deposit Assets</h3>
            
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ flex: 1, padding: '16px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)', borderRadius: '12px' }}>
                <div className="flex-between" style={{ marginBottom: '16px' }}>
                  <span style={{ fontWeight: 600 }}>BOT</span>
                  <span style={{ color: 'var(--text-secondary)' }}>Bal: 0.00</span>
                </div>
                <div className="flex-between">
                  <input type="text" placeholder="0.0" style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '20px', width: '100%', outline: 'none' }} />
                  <button className="btn-secondary" style={{ padding: '8px 12px', fontSize: '12px' }}>Max</button>
                </div>
              </div>
            </div>

            <button className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              Deposit to Vault <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Right Column: AI Strategy & Status */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* AI Strategy Widget */}
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div className="flex-center" style={{ gap: '12px', justifyContent: 'flex-start', marginBottom: '24px' }}>
              <Activity color="var(--accent-blue)" />
              <h3 style={{ fontSize: '18px' }}>AI Keeper Strategy</h3>
            </div>
            
            <div style={{ background: 'rgba(0,0,0,0.2)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-glass)', marginBottom: '16px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6' }}>
                Claude AI is actively analyzing liquidity pools on BDex. Current market volatility is low. 
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="flex-between" style={{ fontSize: '14px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Current Strategy</span>
                <span style={{ color: 'var(--accent-green)' }}>USDT/BOT LP</span>
              </div>
              <div className="flex-between" style={{ fontSize: '14px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Last Rebalance</span>
                <span style={{ color: 'var(--text-primary)' }}>2 mins ago</span>
              </div>
            </div>
          </div>

          {/* Security Features */}
          <div className="glass-panel" style={{ padding: '32px' }}>
             <div className="flex-center" style={{ gap: '12px', justifyContent: 'flex-start', marginBottom: '16px' }}>
              <Shield color="var(--text-secondary)" />
              <h3 style={{ fontSize: '18px' }}>Security & Audits</h3>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)', fontSize: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li className="flex-center" style={{ justifyContent: 'flex-start', gap: '8px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-blue)' }}></div>
                Smart Contract Audited
              </li>
              <li className="flex-center" style={{ justifyContent: 'flex-start', gap: '8px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-blue)' }}></div>
                Non-Custodial Architecture
              </li>
              <li className="flex-center" style={{ justifyContent: 'flex-start', gap: '8px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-blue)' }}></div>
                Keeper Role Segregation
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
