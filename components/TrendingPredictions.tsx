// components/TrendingPredictions.tsx
'use client';

import React, { useState } from 'react';
import { MessageCircle, ArrowUp, ArrowDown } from 'lucide-react';

interface Comment {
  id: string;
  user: string;
  text: string;
  timestamp: string;
}

interface Prediction {
  id: string;
  coin: string;
  targetPrice: number;
  timeframe: string;
  analysis: string;
  upvotes: number;
  downvotes: number;
  comments: Comment[];
  user: {
    name: string;
    accuracy: number;
  };
}

interface TrendingPredictionsProps {
  timeframe: string;
}

export default function TrendingPredictions({ timeframe }: TrendingPredictionsProps) {
  const [expandedComments, setExpandedComments] = useState<{ [key: string]: boolean }>({});
  const [newComments, setNewComments] = useState<{ [key: string]: string }>({});
  const [predictions, setPredictions] = useState<Prediction[]>([
    {
      id: '1',
      coin: 'Bitcoin',
      targetPrice: 85000,
      timeframe: 'Q2 2025',
      analysis: 'Based on historical patterns and market sentiment, BTC is likely to reach this target due to increased institutional adoption and the upcoming halving event.',
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
      user: {
        name: 'CryptoAnalyst',
        accuracy: 85,
      },
    },
    // Add more predictions...
  ]);

  const toggleComments = (predictionId: string) => {
    setExpandedComments(prev => ({
      ...prev,
      [predictionId]: !prev[predictionId]
    }));
  };

  const handleAddComment = (predictionId: string) => {
    if (!newComments[predictionId]?.trim()) return;

    setPredictions(prevPredictions => prevPredictions.map(prediction => {
      if (prediction.id === predictionId) {
        return {
          ...prediction,
          comments: [
            ...prediction.comments,
            {
              id: Date.now().toString(),
              user: 'CurrentUser', // Replace with actual user
              text: newComments[predictionId],
              timestamp: new Date().toISOString()
            }
          ]
        };
      }
      return prediction;
    }));

    setNewComments(prev => ({ ...prev, [predictionId]: '' }));
  };

  const handleVote = (predictionId: string, isUpvote: boolean) => {
    setPredictions(prevPredictions => prevPredictions.map(prediction => {
      if (prediction.id === predictionId) {
        return {
          ...prediction,
          upvotes: isUpvote ? prediction.upvotes + 1 : prediction.upvotes,
          downvotes: !isUpvote ? prediction.downvotes + 1 : prediction.downvotes,
        };
      }
      return prediction;
    }));
  };

  const filteredPredictions = predictions.filter(p => p.timeframe === timeframe);

  return (
    <div className="space-y-4">
      {filteredPredictions.map((prediction) => (
        <div key={prediction.id} className="border rounded-lg p-4 hover:shadow-lg">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-bold">{prediction.coin}</h3>
              <p className="text-gray-600">Target: ${prediction.targetPrice.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Timeframe: {prediction.timeframe}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">by {prediction.user.name}</p>
              <p className="text-sm text-green-600">{prediction.user.accuracy}% accuracy</p>
            </div>
          </div>
          
          <p className="mt-2 text-gray-700">{prediction.analysis}</p>
          
          <div className="mt-4 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => handleVote(prediction.id, true)}
                className="flex items-center space-x-1 text-gray-600 hover:text-green-600"
              >
                <ArrowUp size={20} />
                <span>{prediction.upvotes}</span>
              </button>
              <button 
                onClick={() => handleVote(prediction.id, false)}
                className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
              >
                <ArrowDown size={20} />
                <span>{prediction.downvotes}</span>
              </button>
            </div>
            
            <button 
              onClick={() => toggleComments(prediction.id)}
              className="flex items-center space-x-1 text-gray-600 hover:text-blue-600"
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
                  onChange={(e) => setNewComments(prev => ({
                    ...prev,
                    [prediction.id]: e.target.value
                  }))}
                  placeholder="Add a comment..."
                  className="flex-1 p-2 border rounded"
                />
                <button
                  onClick={() => handleAddComment(prediction.id)}
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
  );
}