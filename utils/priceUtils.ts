
// utils/priceUtils.ts
export async function getCoinPrices(coinIds: string[]) {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinIds.join(',')}&vs_currencies=usd&include_24hr_change=true`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching prices:', error);
    return null;
  }
}