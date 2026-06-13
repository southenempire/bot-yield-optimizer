import { useEffect, useState } from 'react';
import { createPublicClient, http, formatEther, formatGwei } from 'viem';
import { botTestnet } from './chains';

const client = createPublicClient({
  chain: botTestnet,
  transport: http(),
});

export interface ChainStats {
  blockNumber: string;
  gasPrice: string;
  networkStatus: 'live' | 'offline' | 'loading';
}

export function useChainStats() {
  const [stats, setStats] = useState<ChainStats>({
    blockNumber: '—',
    gasPrice: '—',
    networkStatus: 'loading',
  });

  useEffect(() => {
    let cancelled = false;

    async function fetchStats() {
      try {
        const [blockNumber, gasPrice] = await Promise.all([
          client.getBlockNumber(),
          client.getGasPrice(),
        ]);

        if (!cancelled) {
          setStats({
            blockNumber: blockNumber.toLocaleString(),
            gasPrice: parseFloat(formatGwei(gasPrice)).toFixed(2) + ' Gwei',
            networkStatus: 'live',
          });
        }
      } catch (err) {
        console.error('Failed to fetch chain stats:', err);
        if (!cancelled) {
          setStats((prev) => ({ ...prev, networkStatus: 'offline' }));
        }
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, 10_000); // refresh every 10s

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return stats;
}

export interface WalletBalance {
  bot: string;
  loading: boolean;
}

export function useWalletBalance(address: string | undefined) {
  const [balance, setBalance] = useState<WalletBalance>({
    bot: '0.00',
    loading: false,
  });

  useEffect(() => {
    if (!address) return;
    let cancelled = false;

    async function fetchBalance() {
      setBalance((prev) => ({ ...prev, loading: true }));
      try {
        const raw = await client.getBalance({
          address: address as `0x${string}`,
        });
        if (!cancelled) {
          setBalance({
            bot: parseFloat(formatEther(raw)).toFixed(4),
            loading: false,
          });
        }
      } catch (err) {
        console.error('Failed to fetch balance:', err);
        if (!cancelled) {
          setBalance({ bot: '0.00', loading: false });
        }
      }
    }

    fetchBalance();
    const interval = setInterval(fetchBalance, 15_000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [address]);

  return balance;
}
