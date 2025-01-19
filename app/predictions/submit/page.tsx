'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface PredictionFormData {
  coin: string;
  targetPrice: number;
  timeframe: string;
  analysis: string;
  tags: string[];
}

export default function SubmitPrediction() {
  const { data: session } = useSession();
  const router = useRouter();
  
  const [formData, setFormData] = useState<PredictionFormData>({
    coin: '',
    targetPrice: 0,
    timeframe: '',
    analysis: '',
    tags: [],
  });

  const [availableTags] = useState([
    'Macro Trends',
    'Technical Analysis',
    'News Impact',
    'Fundamental Analysis',
    'Market Sentiment'
  ]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/predictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/predictions');
      } else {
        // Handle error
        console.error('Failed to submit prediction');
      }
    } catch (error) {
      console.error('Error submitting prediction:', error);
    }
  };

  const toggleTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  if (!session) {
    return (
      <div className="text-center py-8">
        <p>Please sign in to submit predictions.</p>
        <button
          onClick={() => router.push('/auth/signin')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Submit New Prediction</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Cryptocurrency</label>
          <select
            value={formData.coin}
            onChange={(e) => setFormData(prev => ({ ...prev, coin: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          >
            <option value="">Select a cryptocurrency</option>
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            {/* Add more options */}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Target Price (USD)</label>
          <input
            type="number"
            value={formData.targetPrice}
            onChange={(e) => setFormData(prev => ({ ...prev, targetPrice: parseFloat(e.target.value) }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Timeframe</label>
          <select
            value={formData.timeframe}
            onChange={(e) => setFormData(prev => ({ ...prev, timeframe: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          >
            <option value="">Select a timeframe</option>
            <option value="Q1_2025">End of Q1 2025</option>
            <option value="Q2_2025">End of Q2 2025</option>
            <option value="Q3_2025">End of Q3 2025</option>
            <option value="Q4_2025">End of Q4 2025</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Analysis</label>
          <textarea
            value={formData.analysis}
            onChange={(e) => setFormData(prev => ({ ...prev, analysis: e.target.value }))}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            rows={4}
            required
            placeholder="Provide your analysis and reasoning..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
          <div className="flex flex-wrap gap-2">
            {availableTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm ${
                  formData.tags.includes(tag)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Submit Prediction
        </button>
      </form>
    </div>
  );
}