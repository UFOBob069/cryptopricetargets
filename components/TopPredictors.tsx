// components/TrendingPredictions.tsx
'use client';

import { useEffect, useState } from 'react';

interface Predictor {
  id: string;
  name: string;
  score: number;
}

export default function TopPredictors() {
  const [predictors, setPredictors] = useState<Predictor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPredictors = async () => {
      try {
        const response = await fetch('/api/predictors');
        if (!response.ok) {
          throw new Error('Failed to fetch predictors');
        }
        const data = await response.json();
        setPredictors(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch predictors');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictors();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Top Predictors</h2>
      <div>
        {predictors.map((predictor) => (
          <div key={predictor.id}>
            <span>{predictor.name}</span>
            <span>Score: {predictor.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}