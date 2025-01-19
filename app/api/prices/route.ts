// import { NextResponse } from 'next/server'

interface CoinGeckoResponse {
  [key: string]: {
    usd: number;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const coinId = searchParams.get('coinId');
    
    if (!coinId) {
      return new Response('Missing coinId parameter', { status: 400 });
    }

    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`;
    const response = await fetch(url);
    const data: CoinGeckoResponse = await response.json();
    
    return Response.json(data);
  } catch {
    return new Response('Failed to fetch price', { status: 500 });
  }
} 