import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';
import { ArrowRight, Activity, Shield, TrendingUp, Wallet, LogOut, Blocks, Fuel, Zap, BarChart3 } from 'lucide-react';
import { useChainStats, useWalletBalance } from './hooks';

const Dashboard: React.FC = () => {
  const { login, logout, ready, authenticated, user } = usePrivy();
  const chainStats = useChainStats();
  const walletAddress = user?.wallet?.address;
  const walletBalance = useWalletBalance(walletAddress);
  const [depositAmount, setDepositAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'bot' | 'usdt'>('bot');

  const displayAddress = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : user?.email?.address || 'Connected';

  return (
    <div className="app-wrapper">
      <div className="bg-grid"></div>
      <div className="ambient-glow ambient-glow-1"></div>
      <div className="ambient-glow ambient-glow-2"></div>
      <div className="ambient-glow ambient-glow-3"></div>

      <div className="container animate-fade-in">

        {/* Navigation */}
        <nav className="nav-bar glass-panel">
          <div className="nav-brand">
            <div className="brand-icon">
              <TrendingUp size={18} color="#3B82F6" />
            </div>
            <span className="brand-name">BOT Yield</span>
          </div>

          <div className="nav-links">
            <a href="#" className="nav-link active">Dashboard</a>
            <a href="#" className="nav-link">Strategies</a>
            <a href="#" className="nav-link">Analytics</a>
          </div>

          {authenticated ? (
            <div className="wallet-connected">
              <span className="wallet-address">{displayAddress}</span>
              <button className="btn-disconnect" onClick={logout}>
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <button className="btn-primary connect-btn" disabled={!ready} onClick={login}>
              <Wallet size={16} />
              Connect Wallet
            </button>
          )}
        </nav>

        {/* Hero */}
        <div className="hero-section">
          <p className="hero-greeting">BOT Chain Testnet (ID: 968)</p>
          <h1 className="hero-title">
            {authenticated
              ? `Welcome back`
              : 'Yield Optimizer'}
          </h1>
          <p className="hero-subtitle">
            {authenticated
              ? `Your BOT balance: ${walletBalance.loading ? 'Loading...' : walletBalance.bot + ' BOT'}`
              : 'Connect your wallet to start earning optimized yields on BOT Chain.'}
          </p>
        </div>

        {/* Stats Row — Live from Testnet */}
        <div className="stats-row">
          <div className="stat-card glass-panel">
            <div className="stat-icon blue"><Blocks size={18} color="#3B82F6" /></div>
            <span className="stat-label">Block Height</span>
            <span className="stat-value text-gradient">{chainStats.blockNumber}</span>
            <span className={`stat-change ${chainStats.networkStatus === 'live' ? 'positive' : 'neutral'}`}>
              {chainStats.networkStatus === 'live' && <><span className="status-dot" style={{ width: 6, height: 6, marginRight: 4 }}></span>Live</>}
              {chainStats.networkStatus === 'loading' && 'Connecting...'}
              {chainStats.networkStatus === 'offline' && 'Offline'}
            </span>
          </div>
          <div className="stat-card glass-panel">
            <div className="stat-icon green"><Fuel size={18} color="#10B981" /></div>
            <span className="stat-label">Gas Price</span>
            <span className="stat-value" style={{ color: 'var(--accent-green)' }}>{chainStats.gasPrice}</span>
            <span className="stat-change positive">Near-zero fees</span>
          </div>
          <div className="stat-card glass-panel">
            <div className="stat-icon amber"><Zap size={18} color="#F59E0B" /></div>
            <span className="stat-label">Block Time</span>
            <span className="stat-value" style={{ color: 'var(--accent-amber)' }}>0.75s</span>
            <span className="stat-change neutral">Sub-second finality</span>
          </div>
          <div className="stat-card glass-panel">
            <div className="stat-icon purple"><BarChart3 size={18} color="#8B5CF6" /></div>
            <span className="stat-label">Target APY</span>
            <span className="stat-value" style={{ color: '#8B5CF6' }}>18.4%</span>
            <span className="stat-change positive">Outperforming market</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="main-grid">

          {/* Left: Deposit */}
          <div className="deposit-section glass-panel">
            <h3 className="section-title">Deposit Assets</h3>

            <div className="token-tabs">
              <button className={`token-tab ${activeTab === 'bot' ? 'active' : ''}`} onClick={() => setActiveTab('bot')}>BOT</button>
              <button className={`token-tab ${activeTab === 'usdt' ? 'active' : ''}`} onClick={() => setActiveTab('usdt')}>USDT</button>
            </div>

            <div className="deposit-input-wrapper">
              <div className="deposit-input-row">
                <input
                  type="text"
                  className="deposit-input"
                  placeholder="0.00"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
                <div className="deposit-input-suffix">
                  <button className="max-btn" onClick={() => {
                    if (activeTab === 'bot' && authenticated) {
                      setDepositAmount(walletBalance.bot);
                    }
                  }}>MAX</button>
                  <span className="token-label">{activeTab.toUpperCase()}</span>
                </div>
              </div>
              <div className="balance-row">
                <span>Available Balance</span>
                <span>
                  {authenticated
                    ? (activeTab === 'bot' ? `${walletBalance.bot} BOT` : '0.00 USDT')
                    : `0.00 ${activeTab.toUpperCase()}`}
                </span>
              </div>
            </div>

            <button className="btn-primary deposit-btn" onClick={() => { if (!authenticated) login(); }}>
              {authenticated ? 'Deposit to Vault' : 'Connect Wallet to Deposit'}
              <ArrowRight size={18} />
            </button>

            <div className="deposit-info">
              <div className="info-row">
                <span>Estimated APY</span>
                <span className="info-value">18.4%</span>
              </div>
              <div className="info-row">
                <span>Withdrawal Fee</span>
                <span className="info-value">0.1%</span>
              </div>
              <div className="info-row">
                <span>Lock Period</span>
                <span className="info-value">None</span>
              </div>
              <div className="info-row">
                <span>Network</span>
                <span className="info-value">BOT Testnet (968)</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">

            {/* Strategy Card */}
            <div className="strategy-card glass-panel">
              <div className="section-header">
                <Activity size={18} color="var(--accent-blue)" />
                <h3 className="section-title" style={{ margin: 0 }}>Active Strategy</h3>
              </div>

              <div className="strategy-status">
                <div className="status-dot"></div>
                <span className="strategy-status-text">Live — Optimizing</span>
              </div>

              <div className="strategy-details">
                <div className="detail-row">
                  <span className="detail-label">Current Pool</span>
                  <span className="detail-value">USDT/BOT LP</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Last Rebalance</span>
                  <span className="detail-value">2 min ago</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">24h Volume</span>
                  <span className="detail-value">$48,210</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Keeper Cycles</span>
                  <span className="detail-value">127</span>
                </div>
              </div>
            </div>

            {/* Security Card */}
            <div className="security-card glass-panel">
              <div className="section-header">
                <Shield size={18} color="var(--text-secondary)" />
                <h3 className="section-title" style={{ margin: 0 }}>Security</h3>
              </div>
              <ul className="security-list">
                <li className="security-item">
                  <div className="check-icon">✓</div>
                  <span>Non-Custodial Architecture</span>
                </li>
                <li className="security-item">
                  <div className="check-icon">✓</div>
                  <span>Keeper Role Segregation</span>
                </li>
                <li className="security-item">
                  <div className="check-icon">✓</div>
                  <span>On-chain Transparency</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="footer">
          <span className="footer-text">© 2025 BOT Yield Optimizer. Built on BOT Chain.</span>
          <div className="footer-links">
            <a href="https://dev-docs.botchain.ai" target="_blank" rel="noopener noreferrer" className="footer-link">Docs</a>
            <a href="https://scan.bohr.life" target="_blank" rel="noopener noreferrer" className="footer-link">Explorer</a>
            <a href="https://dex.bohr.life" target="_blank" rel="noopener noreferrer" className="footer-link">B DEX</a>
            <a href="https://www.botchain.ai" target="_blank" rel="noopener noreferrer" className="footer-link">BOT Chain</a>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Dashboard;
