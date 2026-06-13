# BOT Yield Optimizer 🤖📈

An AI-Powered DeFi Strategy Engine built for the **BOT Chain**. 

## Overview
BOT Yield Optimizer is a decentralized application (dApp) that allows users to deposit native BOT or ERC20 USDT into a secure smart contract vault. An off-chain AI Keeper (powered by Claude via Anything CLI) continuously analyzes on-chain yield opportunities across the BOT Chain ecosystem (BDex, staking, liquidity pools) and automatically rebalances the vault's funds to the highest-yielding strategies.

Users earn optimized, passive returns without needing to manage complex DeFi strategies themselves.

---

## Architecture

This project uses a "Web 2.5" hybrid architecture:

### 1. On-Chain Smart Contracts (`/bot-yield-contracts`)
Built using Hardhat and deployed to the BOT Chain.
- **`BotYieldVault.sol`**: The core vault. It securely escrows user deposits (BOT and USDT) and tracks individual balances. It exposes an `executeStrategy` function protected by an `onlyKeeper` modifier, allowing the AI to move funds to yield sources.
- **`MockUSDT.sol`**: A standard ERC20 token for testnet simulations.

**Network Configurations (BOT Chain):**
- **Mainnet**: Chain ID `677`, RPC `https://rpc.botchain.ai`
- **Testnet**: Chain ID `968`, RPC `https://rpc.bohr.life`

### 2. Off-Chain AI Backend & Dashboard (`/bot-yield-app`)
Built and hosted using the **Anything CLI**.
- **Frontend Dashboard**: An Expo-based Web app providing a clean, dark-mode user interface for deposits and APY tracking.
- **AI Keeper Backend**: A serverless function that uses Claude API to read on-chain data, evaluate risk scores, and execute `BotYieldVault.executeStrategy` transactions.

---

## Setup & Local Development

### Smart Contracts
1. Navigate to the contracts directory:
   ```bash
   cd bot-yield-contracts
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Compile the contracts:
   ```bash
   npx hardhat compile
   ```
4. Deploy to testnet:
   *Ensure you have set `PRIVATE_KEY` in your `.env` file with a wallet funded via the [BOT Testnet Faucet](https://faucet.botchain.ai/basic).*
   ```bash
   npx hardhat run scripts/deploy.js --network botTestnet
   ```

### AI Dashboard (Anything CLI)
The application was generated and published via the Anything CLI.
- **Live URL**: [https://bot-yield-optimizer.created.app](https://bot-yield-optimizer.created.app)
- To pull and edit the source code locally:
  ```bash
  cd bot-yield-app
  anything link <your-project-id>
  anything pull
  ```

---

## Phase 2: Privy Integration (Pending)
To upgrade the placeholder authentication to production-ready Web3 onboarding, integrate **Privy**.

1. **Install Privy**:
   ```bash
   npm install @privy-io/react-auth
   ```
2. **Wrap your App**:
   In your root component, wrap the app with `<PrivyProvider appId="YOUR_PRIVY_APP_ID">`.
3. **Connect to Vault**:
   Use `wagmi` and `viem` to connect the authenticated Privy wallet directly to the `BotYieldVault` ABI to execute `depositBOT()` and `depositUSDT()` transactions.

---

## License
MIT
