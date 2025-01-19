import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { coinId: string } }
) {
  try {
    const coinId = params.coinId;
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 30 }, // Cache for 30 seconds
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch coin data');
    }

    const priceData = await response.json();
    
    // Get additional coin data
    const coinResponse = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!coinResponse.ok) {
      throw new Error('Failed to fetch coin details');
    }

    const coinData = await coinResponse.json();

    const data = {
      id: coinId,
      name: coinData.name,
      symbol: coinData.symbol,
      price: priceData[coinId]?.usd || 0,
      image: coinData.image?.large
    };

    return NextResponse.json({ data });
  } catch (error) {
    console.error('Error fetching coin:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coin data' },
      { status: 500 }
    );
  }
} 