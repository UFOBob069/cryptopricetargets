// utils/userData.ts
export interface UserProfile {
  id: string;
  name: string;
  image: string;
  accuracy: number;
  totalPredictions: number;
  successfulPredictions: number;
  bio: string;
  predictions: UserPrediction[];
}

export interface UserPrediction {
  id: string;
  coinId: string;
  coinName: string;
  coinSymbol: string;
  targetPrice: number;
  timeframe: string;
  analysis: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
}

export const userData: { [key: string]: UserProfile } = {
  'crypto_guru': {
    id: 'crypto_guru',
    name: 'Crypto Guru',
    image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
    accuracy: 85,
    totalPredictions: 124,
    successfulPredictions: 105,
    bio: 'Crypto analyst with 5+ years of experience. Focused on fundamental analysis and market trends.',
    predictions: [
      {
        id: '1',
        coinId: 'bitcoin',
        coinName: 'Bitcoin',
        coinSymbol: 'BTC',
        targetPrice: 85000,
        timeframe: 'Q2 2025',
        analysis: 'Based on historical patterns and market sentiment, BTC is likely to reach this target due to increased institutional adoption and the upcoming halving event.',
        createdAt: '2024-01-10T15:30:00Z',
        upvotes: 156,
        downvotes: 24,
      }
    ]
  },
  'btc_whale': {
    id: 'btc_whale',
    name: 'BTC Whale',
    image: 'https://assets.coingecko.com/coins/images/1/small/bitcoin.png',
    accuracy: 82,
    totalPredictions: 89,
    successfulPredictions: 73,
    bio: 'Bitcoin maximalist and market cycle analyst. Specializing in on-chain metrics and macro analysis.',
    predictions: [
      {
        id: '2',
        coinId: 'bitcoin',
        coinName: 'Bitcoin',
        coinSymbol: 'BTC',
        targetPrice: 95000,
        timeframe: 'Q4 2025',
        analysis: 'Post-halving effects combined with macro trends suggest stronger upside potential.',
        createdAt: '2024-01-15T14:20:00Z',
        upvotes: 98,
        downvotes: 15,
      }
    ]
  },
  'eth_analyst': {
    id: 'eth_analyst',
    name: 'ETH Analyst',
    image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    accuracy: 82,
    totalPredictions: 98,
    successfulPredictions: 80,
    bio: 'DeFi researcher and Ethereum ecosystem specialist. Following Layer 2 developments closely.',
    predictions: [
      {
        id: '3',
        coinId: 'ethereum',
        coinName: 'Ethereum',
        coinSymbol: 'ETH',
        targetPrice: 4500,
        timeframe: 'Q2 2025',
        analysis: 'ETH likely to see significant growth with the continued DeFi expansion and institutional interest in the ecosystem.',
        createdAt: '2024-01-11T14:20:00Z',
        upvotes: 132,
        downvotes: 18,
      }
    ]
  },
  'defi_expert': {
    id: 'defi_expert',
    name: 'DeFi Expert',
    image: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png',
    accuracy: 79,
    totalPredictions: 67,
    successfulPredictions: 53,
    bio: 'Focused on DeFi protocols and tokenomics. Research-driven approach to crypto analysis.',
    predictions: [
      {
        id: '4',
        coinId: 'ethereum',
        coinName: 'Ethereum',
        coinSymbol: 'ETH',
        targetPrice: 5200,
        timeframe: 'Q4 2025',
        analysis: 'Layer 2 adoption and staking growth indicate strong fundamentals.',
        createdAt: '2024-01-16T09:30:00Z',
        upvotes: 78,
        downvotes: 12,
      }
    ]
  },
  'sol_expert': {
    id: 'sol_expert',
    name: 'SOL Expert',
    image: 'https://assets.coingecko.com/coins/images/4128/small/solana.png',
    accuracy: 78,
    totalPredictions: 76,
    successfulPredictions: 59,
    bio: 'Solana ecosystem specialist. Following network developments and adoption trends.',
    predictions: [
      {
        id: '5',
        coinId: 'solana',
        coinName: 'Solana',
        coinSymbol: 'SOL',
        targetPrice: 250,
        timeframe: 'Q2 2025',
        analysis: 'Solana network improvements and growing ecosystem suggest strong upside potential.',
        createdAt: '2024-01-12T09:15:00Z',
        upvotes: 89,
        downvotes: 12,
      }
    ]
  },
  'ada_tracker': {
    id: 'ada_tracker',
    name: 'ADA Tracker',
    image: 'https://assets.coingecko.com/coins/images/975/small/cardano.png',
    accuracy: 75,
    totalPredictions: 58,
    successfulPredictions: 43,
    bio: 'Cardano ecosystem researcher. Tracking development progress and adoption metrics.',
    predictions: [
      {
        id: '6',
        coinId: 'cardano',
        coinName: 'Cardano',
        coinSymbol: 'ADA',
        targetPrice: 1.20,
        timeframe: 'Q2 2025',
        analysis: 'Cardano development milestones and increasing DeFi activity point to growth.',
        createdAt: '2024-01-13T11:45:00Z',
        upvotes: 67,
        downvotes: 15,
      }
    ]
  },
  'xrp_analyst': {
    id: 'xrp_analyst',
    name: 'XRP Analyst',
    image: 'https://assets.coingecko.com/coins/images/44/small/xrp-symbol-white-128.png',
    accuracy: 77,
    totalPredictions: 82,
    successfulPredictions: 63,
    bio: 'XRP market analyst. Specializing in regulatory developments and institutional partnerships.',
    predictions: [
      {
        id: '7',
        coinId: 'xrp',
        coinName: 'XRP',
        coinSymbol: 'XRP',
        targetPrice: 1.50,
        timeframe: 'Q2 2025',
        analysis: 'Regulatory clarity and expanding partnerships support bullish outlook.',
        createdAt: '2024-01-14T10:20:00Z',
        upvotes: 92,
        downvotes: 21,
      }
    ]
  }
};