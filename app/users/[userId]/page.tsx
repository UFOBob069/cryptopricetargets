// app/users/[userId]/page.tsx
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TimeframeSelector from '@/components/TimeframeSelector';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { userData } from '@/utils/userData';

interface PageProps {
  params: Promise<{ userId: string }>;
}

export default function UserProfilePage({ params }: PageProps) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const { userId } = resolvedParams;
  
  const [selectedTimeframe, setSelectedTimeframe] = useState('Q2 2025');

  console.log('Looking for user:', userId);
  const user = userData[userId];

  if (!user) {
    console.log('User not found, redirecting...');
    router.push('/');
    return null;
  }

  const filteredPredictions = user.predictions
    .filter(p => p.timeframe === selectedTimeframe)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* User Profile Header */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex items-start gap-6">
          <Image
            src={user.image}
            alt={user.name}
            width={80}
            height={80}
            className="rounded-full"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
            <p className="text-gray-700 mb-4">{user.bio}</p>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600">{user.accuracy}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600">{user.successfulPredictions}</div>
                <div className="text-sm text-gray-600">Successful</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-2xl font-bold text-blue-600">{user.totalPredictions}</div>
                <div className="text-sm text-gray-600">Total Predictions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-2">Filter Predictions by Timeframe</h2>
        <TimeframeSelector
          selectedTimeframe={selectedTimeframe}
          onTimeframeChange={setSelectedTimeframe}
        />
      </div>

      {/* Predictions */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold mb-4">
          Predictions for {selectedTimeframe}
          {filteredPredictions.length === 0 && " - No predictions for this timeframe"}
        </h2>

        {filteredPredictions.map(prediction => (
          <div key={prediction.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <Link 
                href={`/coins/${prediction.coinId}`}
                className="flex items-center gap-2 hover:text-blue-600"
              >
                <h3 className="text-lg font-bold">{prediction.coinName}</h3>
                <span className="text-gray-600">({prediction.coinSymbol})</span>
              </Link>
              <div className="text-sm text-gray-500">
                {new Date(prediction.createdAt).toLocaleDateString()}
              </div>
            </div>

            <div className="mb-4">
              <div className="text-2xl font-bold mb-2">
                ${prediction.targetPrice.toLocaleString()}
              </div>
              <p className="text-gray-700">{prediction.analysis}</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1 text-gray-600">
                  <ArrowUp size={20} />
                  <span>{prediction.upvotes}</span>
                </span>
                <span className="flex items-center gap-1 text-gray-600">
                  <ArrowDown size={20} />
                  <span>{prediction.downvotes}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}