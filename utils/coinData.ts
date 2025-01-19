// utils/coinData.ts
export interface Coin {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  currentPrice: number;
  priceChange24h: number;
}

export const coinData: { [key: string]: Coin } = {
  'bitcoin': {
    id: 'bitcoin',
    symbol: 'BTC',
    name: 'Bitcoin',
    icon: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
    currentPrice: 62345.78,
    priceChange24h: 2.5,
  },
  'ethereum': {
    id: 'ethereum',
    symbol: 'ETH',
    name: 'Ethereum',
    icon: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    currentPrice: 3245.90,
    priceChange24h: -1.2,
  },
  'solana': {
    id: 'solana',
    symbol: 'SOL',
    name: 'Solana',
    icon: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
    currentPrice: 98.45,
    priceChange24h: 5.3,
  },
  'xrp': {
    id: 'xrp',
    symbol: 'XRP',
    name: 'XRP',
    icon: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
    currentPrice: 0.56,
    priceChange24h: 1.8,
  },
  'cardano': {
    id: 'cardano',
    symbol: 'ADA',
    name: 'Cardano',
    icon: 'https://assets.coingecko.com/coins/images/975/small/cardano.png',
    currentPrice: 0.58,
    priceChange24h: -2.1,
  }
};

// Mock predictions for each coin
export interface CoinPrediction {
  id: string;
  coinId: string;
  targetPrice: number;
  timeframe: string;
  analysis: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  analyst: {
    id: string;
    name: string;
    accuracy: number;
    totalPredictions: number;
    successfulPredictions: number;
    image: string;
  };
}

interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

export const mockPredictions: { [key: string]: CoinPrediction[] } = {
  'bitcoin': [
    {
      id: '1',
      coinId: 'bitcoin',
      targetPrice: 85000,
      timeframe: 'Q2 2025',
      analysis: 'Based on historical patterns and market sentiment, BTC is likely to reach this target due to increased institutional adoption and the upcoming halving event.',
      createdAt: '2024-01-10T15:30:00Z',
      upvotes: 156,
      downvotes: 24,
      comments: [
        {
          id: '1',
          user: 'CryptoTrader',
          text: 'Solid analysis, especially regarding institutional adoption.',
          timestamp: '2024-01-12T10:30:00Z'
        }
      ],
      analyst: {
        id: 'crypto_guru',
        name: 'Crypto Guru',
        accuracy: 85,
        totalPredictions: 124,
        successfulPredictions: 105,
        image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png'
      }
    },
    {
      id: '2',
      coinId: 'bitcoin',
      targetPrice: 95000,
      timeframe: 'Q4 2025',
      analysis: 'Post-halving effects combined with macro trends suggest stronger upside potential.',
      createdAt: '2024-01-15T14:20:00Z',
      upvotes: 98,
      downvotes: 15,
      comments: [],
      analyst: {
        id: 'btc_whale',
        name: 'BTC Whale',
        accuracy: 82,
        totalPredictions: 89,
        successfulPredictions: 73,
        image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png'
      }
    }
  ],
  'ethereum': [
    {
      id: '3',
      coinId: 'ethereum',
      targetPrice: 4500,
      timeframe: 'Q2 2025',
      analysis: 'ETH likely to see significant growth with the continued DeFi expansion and institutional interest in the ecosystem.',
      createdAt: '2024-01-11T14:20:00Z',
      upvotes: 132,
      downvotes: 18,
      comments: [],
      analyst: {
        id: 'eth_analyst',
        name: 'ETH Analyst',
        accuracy: 82,
        totalPredictions: 98,
        successfulPredictions: 80,
        image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
      }
    },
    {
      id: '4',
      coinId: 'ethereum',
      targetPrice: 5200,
      timeframe: 'Q4 2025',
      analysis: 'Layer 2 adoption and staking growth indicate strong fundamentals.',
      createdAt: '2024-01-16T09:30:00Z',
      upvotes: 78,
      downvotes: 12,
      comments: [],
      analyst: {
        id: 'defi_expert',
        name: 'DeFi Expert',
        accuracy: 79,
        totalPredictions: 67,
        successfulPredictions: 53,
        image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png'
      }
    }
  ],
  'solana': [
    {
      id: '5',
      coinId: 'solana',
      targetPrice: 250,
      timeframe: 'Q2 2025',
      analysis: 'Solana network improvements and growing ecosystem suggest strong upside potential.',
      createdAt: '2024-01-12T09:15:00Z',
      upvotes: 89,
      downvotes: 12,
      comments: [],
      analyst: {
        id: 'sol_expert',
        name: 'SOL Expert',
        accuracy: 78,
        totalPredictions: 76,
        successfulPredictions: 59,
        image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png'
      }
    }
  ],
  'cardano': [
    {
      id: '6',
      coinId: 'cardano',
      targetPrice: 1.20,
      timeframe: 'Q2 2025',
      analysis: 'Cardano development milestones and increasing DeFi activity point to growth.',
      createdAt: '2024-01-13T11:45:00Z',
      upvotes: 67,
      downvotes: 15,
      comments: [],
      analyst: {
        id: 'ada_tracker',
        name: 'ADA Tracker',
        accuracy: 75,
        totalPredictions: 58,
        successfulPredictions: 43,
        image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png'
      }
    }
  ],
  'xrp': [
    {
      id: '7',
      coinId: 'xrp',
      targetPrice: 1.50,
      timeframe: 'Q2 2025',
      analysis: 'Regulatory clarity and expanding partnerships support bullish outlook.',
      createdAt: '2024-01-14T10:20:00Z',
      upvotes: 92,
      downvotes: 21,
      comments: [],
      analyst: {
        id: 'xrp_analyst',
        name: 'XRP Analyst',
        accuracy: 77,
        totalPredictions: 82,
        successfulPredictions: 63,
        image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png'
      }
    }
  ]
};