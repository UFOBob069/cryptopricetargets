// components/TrendingPredictions.tsx
'use client';

import React from 'react';

interface Prediction {
  id: string;
  coin: string;
  targetPrice: number;
  timeframe: string;
  analysis: string;
  votes: number;
  user: {
    name: string;
    accuracy: number;
  };
}

export default function TopPredictors() {
  // Mock data - will be replaced with API calls
  const predictors: Predictor[] = [
    {
      id: '1',
      name: 'CryptoAnalyst',
      accuracy: 85,
      totalPredictions: 124,
      successfulPredictions: 105,
    },
    // Add more mock predictors...
  ];

  return (
    <div className="space-y-4">
      {predictors.map((predictor) => (
        <div key={predictor.id} className="border rounded-lg p-4 hover:shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold">{predictor.name}</h3>
              <p className="text-sm text-gray-600">
                {predictor.successfulPredictions} / {predictor.totalPredictions} successful predictions
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-green-600">{predictor.accuracy}%</p>
              <p className="text-sm text-gray-500">accuracy</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}