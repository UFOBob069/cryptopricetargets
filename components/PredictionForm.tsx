'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface PredictionFormProps {
  coinId: string;
  coinName: string;
  onSuccess?: () => void;
}

export default function PredictionForm({ 
  coinId, 
  coinName, 
  onSuccess 
}: PredictionFormProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [targetPrice, setTargetPrice] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      setError('Please sign in to make predictions');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/predictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coinId,
          targetPrice: parseFloat(targetPrice),
          targetDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit prediction');
      }

      setTargetPrice('');
      setTargetDate('');
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit prediction');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold">Make a Prediction for {coinName}</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Target Price (USD)
        </label>
        <input
          id="targetPrice"
          type="number"
          step="0.01"
          required
          value={targetPrice}
          onChange={(e) => setTargetPrice(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Target Date
        </label>
        <input
          id="targetDate"
          type="date"
          required
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {loading ? 'Submitting...' : 'Submit Prediction'}
      </button>
    </form>
  );
} 