// components/CoinList.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Coin {
  id: string;
  name: string;
  price: number;
  symbol: string;
  image?: string;
  priceChange?: number;
}

interface CoinListProps {
  timeframe: string;
}

// Example mock predictions if your API doesn't provide them yet.
// Adjust as needed or remove if you're fetching from an actual endpoint.
const mockPredictions: Record<
  string,
  Array<{ timeframe: string; targetPrice: number }>
> = {
  bitcoin: [
    { timeframe: '1m', targetPrice: 35000 },
    { timeframe: '3m', targetPrice: 42000 },
  ],
  ethereum: [
    { timeframe: '1m', targetPrice: 2000 },
    { timeframe: '3m', targetPrice: 2500 },
  ],
};

export default function CoinList({ timeframe }: CoinListProps) {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    const fetchCoins = async () => {
      try {
        // Add timeframe to the API request
        const response = await fetch(`/api/coins?timeframe=${timeframe}`);
        if (!response.ok) {
          throw new Error('Failed to fetch coins');
        }
        const data = await response.json();
        
        if (mounted) {
          setCoins(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch coins');
          console.error('Failed to fetch coins:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };
    
    fetchCoins();

    // Set up an interval to refresh prices every minute
    const interval = setInterval(fetchCoins, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [timeframe]);

  const getDefaultIcon = () => {
    return '/generic-crypto-icon.svg';
  };

  const getCoinIcon = (coin: Coin) => {
    // Map of special cases
    const specialCases: Record<string, string> = {
      bitcoin: '1/large/bitcoin',
      ethereum: '279/large/ethereum',
      tether: '325/large/tether',
      binancecoin: '825/large/bnb',
      ripple: '44/large/xrp',
      'usd-coin': '6319/large/usdc',
      'staked-ether': '13442/large/steth',
      cardano: '975/large/cardano',
      dogecoin: '5/large/dogecoin',
      solana: '4128/large/solana',
      tron: '1094/large/tron',
      polkadot: '12171/large/polkadot',
      chainlink: '1975/large/chainlink',
      'matic-network': '4713/large/matic-network',
      'wrapped-bitcoin': '7598/large/wrapped-bitcoin',
      'avalanche-2': '12559/large/avalanche-2',
      dai: '4943/large/dai',
      'shiba-inu': '5994/large/shiba-inu',
      litecoin: '2/large/litecoin',
      'bitcoin-cash': '1831/large/bitcoin-cash',
      stellar: '512/large/stellar',
      monero: '328/large/monero',
      cosmos: '1481/large/cosmos',
      'ethereum-classic': '1321/large/ethereum-classic',
      'hedera-hashgraph': '4642/large/hedera-hashgraph',
      filecoin: '12817/large/filecoin',
      'lido-dao': '14702/large/lido-dao',
      'crypto-com-chain': '7310/large/crypto-com-chain',
      near: '10365/large/near',
      vechain: '3077/large/vechain',
      sui: '54747/large/sui',
      stacks: '4847/large/stacks',
      'injective-protocol': '7226/large/injective-protocol',
      'render-token': '5690/large/render-token',
      thorchain: '4157/large/thorchain',
      optimism: '25244/large/optimism',
      arbitrum: '16547/large/arbitrum',
      'the-graph': '6719/large/the-graph',
      'immutable-x': '17081/large/immutable-x',
      wsteth: '18834/large/wsteth',
      trx: '1094/large/tron',
      link: '1975/large/chainlink',
      avax: '12559/large/avalanche-2',
      xlm: '512/large/stellar',
      hbar: '4642/large/hedera-hashgraph',
      shib: '5994/large/shiba-inu',
      ton: '11419/large/ton',
    };

    const imageInfo = specialCases[coin.id];
    if (!imageInfo) {
      return getDefaultIcon();
    }
    return `https://assets.coingecko.com/coins/images/${imageInfo}.png`;
  };

  const handleImageError = (coinId: string) => {
    setFailedImages((prev) => new Set(prev).add(coinId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!coins.length) {
    return (
      <div className="text-center py-8 text-gray-600">
        No coins found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 font-semibold rounded-lg">
        <div className="col-span-3">Coin</div>
        <div className="col-span-2 text-right">Current Price</div>
        <div className="col-span-2 text-right">24h Change</div>
        <div className="col-span-3 text-right">
          Avg Target ({timeframe})
        </div>
        <div className="col-span-2 text-right">Predictions</div>
      </div>

      {coins.map((coin) => {
        const currentPrice = coin.price;
        // For now, you have 24h change set to 0. Adjust to real data if you have it:
        const priceChange24h = 0;

        // Example usage of mockPredictions:
        const predictions = mockPredictions[coin.id] || [];
        const timeframePredictions = predictions.filter(
          (p) => p.timeframe === timeframe
        );

        // Calculate average target price for the selected timeframe
        const avgTarget =
          timeframePredictions.length > 0
            ? timeframePredictions.reduce(
                (acc, curr) => acc + curr.targetPrice,
                0
              ) / timeframePredictions.length
            : null;

        // Use default icon if the coin is in failedImages
        const iconUrl = failedImages.has(coin.id)
          ? getDefaultIcon() // Remove coin.id argument since getDefaultIcon expects 0 args
          : getCoinIcon(coin);

        return (
          <Link href={`/coins/${coin.id}`} key={coin.id} className="block">
            <div className="grid grid-cols-12 gap-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-200">
              <div className="col-span-3 flex items-center gap-3">
                <div className="w-8 h-8 relative bg-gray-50 rounded-full overflow-hidden">
                  <Image
                    src={iconUrl}
                    alt={`${coin.name} icon`}
                    width={32}
                    height={32}
                    className="object-cover"
                    onError={() => handleImageError(coin.id)}
                    priority={coin.price <= 5} // Prioritize top 5 coins
                  />
                </div>
                <div>
                  <span className="font-semibold group-hover:text-blue-600">
                    {coin.symbol.toUpperCase()}
                  </span>
                  <span className="ml-2 text-gray-500 text-sm">
                    {coin.name}
                  </span>
                </div>
              </div>

              <div className="col-span-2 text-right">
                $
                {currentPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>

              <div
                className={`col-span-2 text-right ${
                  priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {priceChange24h >= 0 ? '+' : ''}
                {priceChange24h.toFixed(2)}%
              </div>

              <div className="col-span-3 text-right">
                {avgTarget ? (
                  <>
                    ${avgTarget.toLocaleString()}
                    <div className="text-sm text-gray-500">
                      {(
                        ((avgTarget - currentPrice) / currentPrice) *
                        100
                      ).toFixed(1)}
                      % from current
                    </div>
                  </>
                ) : (
                  <span className="text-gray-400">No predictions</span>
                )}
              </div>

              <div className="col-span-2 text-right">
                {timeframePredictions.length} predictions
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
