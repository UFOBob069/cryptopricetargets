'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUp, ArrowDown, MessageCircle } from 'lucide-react';
import TimeframeSelector from '@/components/TimeframeSelector';
import React from 'react';
import { coinData, mockPredictions } from '@/utils/coinData';
import { getCoinPrices } from '@/utils/priceUtils';
import { useRouter } from 'next/navigation';

interface PageProps {
  params: {
    coinId: string;
  };
}

interface CoinData {
  id: string;
  name: string;
  price: number;
  symbol: string;
  image?: string;
  // add other properties as needed
}

interface ApiResponse {
  data: CoinData;
  error?: string;
}

interface ApiError {
  message: string;
  status: number;
}

export default function CoinPage({ params }: PageProps) {
  const router = useRouter();
  const { coinId } = params;

  const [selectedTimeframe, setSelectedTimeframe] = useState('Q2 2025');
  const [expandedComments, setExpandedComments] = useState<{ [key: string]: boolean }>({});
  const [newComments, setNewComments] = useState<{ [key: string]: string }>({});
  const [price, setPrice] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<CoinData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get coin data from our utility file
  const coin = coinData[coinId];

  // If coin doesn't exist, redirect to home
  if (!coin) {
    router.push('/');
    return null;
  }

  // -- Keep the fetchPrice function --
  const fetchPrice = async () => {
    setIsLoading(true);
    const priceData = await getCoinPrices([coinId]);
    setPrice(priceData?.[coinId] || null);
    setIsLoading(false);
  };
  // Use an effect to call fetchPrice and refresh periodically
  const fetchPriceEffect = useEffect(() => {
    fetchPrice();

    // Refresh price every 30 seconds
    const interval = setInterval(fetchPrice, 30000);
    return () => clearInterval(interval);
  }, [coinId]);

  // Get predictions for this specific coin 
  const coinPredictions = mockPredictions[coinId] || [];

  // -- Keep the toggleComments function --
  const toggleComments = (predictionId: string) => {
    setExpandedComments(prev => ({
      ...prev,
      [predictionId]: !prev[predictionId]
    }));
  };

  const filteredPredictions = coinPredictions
    .filter(p => p.timeframe === selectedTimeframe)
    .sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
  // Fetch additional data from your API route if needed
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/coins/${coinId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch coin data');
        }
        const result: ApiResponse = await response.json();
        
        if (!mounted) return;
        
        if (result.error) {
          setError(result.error);
        } else {
          setData(result.data);
        }
      } catch (error) {
        if (!mounted) return;
        setError('Failed to fetch coin data');
        console.error(error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    const priceInterval = setInterval(fetchData, 30000);

    return () => {
      mounted = false;
      clearInterval(priceInterval);
    };
  }, [coinId]);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  if (!data) {
    return <div className="p-4">No data found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Coin Header */}
      <div className="flex items-center gap-4 mb-8">
        {data.image && (
          <img src={data.image} alt={data.name} className="w-12 h-12" />
        )}
        <div>
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <div className="flex items-center gap-4 text-gray-600">
            <span>{data.symbol}</span>
            {isLoading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              <span>
                $
                {(typeof price === 'number' ? price : 0).toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            )}
            {!isLoading && typeof price?.usd_24h_change === 'number' && (
              <span
                className={
                  price.usd_24h_change >= 0 ? 'text-green-600' : 'text-red-600'
                }
              >
                {price.usd_24h_change >= 0 ? '+' : ''}
                {price.usd_24h_change.toFixed(2)}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-2">Select Timeframe</h2>
        <TimeframeSelector
          selectedTimeframe={selectedTimeframe}
          onTimeframeChange={setSelectedTimeframe}
        />
      </div>

      {/* Predictions */}
      <h2 className="text-xl font-bold mb-4">
        Predictions for {selectedTimeframe}
        {filteredPredictions.length === 0 && ' - No predictions yet'}
      </h2>
      <div className="space-y-6">
        {filteredPredictions.map(prediction => (
          <div key={prediction.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <Link
                href={`/users/${prediction.analyst.id.toLowerCase()}`}
                className="flex items-center gap-4 group"
              >
                <Image
                  src={coin.icon}
                  alt={prediction.analyst.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="font-bold group-hover:text-blue-600">
                    {prediction.analyst.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {prediction.analyst.accuracy}% accuracy
                  </div>
                </div>
              </Link>
              <div className="text-sm text-gray-500">
                {new Date(prediction.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-2xl font-bold mb-2">
                ${prediction.targetPrice.toLocaleString()}
                {!isLoading && price?.usd && (
                  <span className="text-sm text-gray-500 ml-2">
                    (
                    {(
                      ((prediction.targetPrice - price.usd) / price.usd) *
                      100
                    ).toFixed(1)}
                    % from current)
                  </span>
                )}
              </div>
              <p className="text-gray-700">{prediction.analysis}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1 text-gray-600 hover:text-green-600">
                  <ArrowUp size={20} />
                  <span>{prediction.upvotes}</span>
                </button>
                <button className="flex items-center gap-1 text-gray-600 hover:text-red-600">
                  <ArrowDown size={20} />
                  <span>{prediction.downvotes}</span>
                </button>
              </div>
              <button
                onClick={() => toggleComments(prediction.id)}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
              >
                <MessageCircle size={20} />
                <span>{prediction.comments.length} comments</span>
              </button>
            </div>

            {expandedComments[prediction.id] && (
              <div className="mt-4 space-y-4">
                {prediction.comments.map(comment => (
                  <div key={comment.id} className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{comment.user}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-700">{comment.text}</p>
                  </div>
                ))}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newComments[prediction.id] || ''}
                    onChange={e =>
                      setNewComments(prev => ({
                        ...prev,
                        [prediction.id]: e.target.value,
                      }))
                    }
                    placeholder="Add a comment..."
                    className="flex-1 p-2 border rounded"
                  />
                  <button
                    onClick={() => {
                      // Handle adding comment
                      setNewComments(prev => ({ ...prev, [prediction.id]: '' }));
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};