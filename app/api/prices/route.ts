import { NextResponse } from 'next/server';

interface CoinPriceData {
  [key: string]: {
    usd: number;
  }
}

export async function GET() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false'
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch from CoinGecko');
    }

    const data: CoinPriceData = await response.json();
    return NextResponse.json(data.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      current_price: coin.current_price,
      market_cap_rank: coin.market_cap_rank,
    })));
  } catch (error) {
    console.error('Price fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prices' },
      { status: 500 }
    );
  }
} 