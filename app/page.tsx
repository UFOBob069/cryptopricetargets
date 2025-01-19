// app/page.tsx
'use client';

import { useState } from 'react';
import TrendingPredictions from "@/components/TrendingPredictions";
import TopPredictors from "@/components/TopPredictors";
import CoinList from "@/components/CoinList";
import TimeframeSelector from "@/components/TimeframeSelector";
import Hero from "@/components/Hero";

type ViewType = 'prices' | 'predictions' | 'predictors';

function ViewSelector({ selectedView, onViewChange }: { 
  selectedView: ViewType, 
  onViewChange: (view: ViewType) => void 
}) {
  const views = [
    { id: 'prices' as ViewType, label: 'Live Prices & Targets' },
    { id: 'predictions' as ViewType, label: 'Trending Predictions' },
    { id: 'predictors' as ViewType, label: 'Top Predictors' }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {views.map((view) => (
        <button
          key={view.id}
          onClick={() => onViewChange(view.id)}
          className={`px-4 py-2 rounded-lg ${
            selectedView === view.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {view.label}
        </button>
      ))}
    </div>
  );
}

export default function Home() {
  const [selectedTimeframe, setSelectedTimeframe] = useState('Q2 2025');
  const [selectedView, setSelectedView] = useState<ViewType>('prices');

  const renderContent = () => {
    switch (selectedView) {
      case 'prices':
        return <CoinList selectedTimeframe={selectedTimeframe} />;
      case 'predictions':
        return <TrendingPredictions timeframe={selectedTimeframe} />;
      case 'predictors':
        return <TopPredictors />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        {/* Selectors Section */}
        <div className="space-y-6">
          <section className="space-y-2">
            <h2 className="text-lg font-medium">Select Timeframe</h2>
            <TimeframeSelector
              selectedTimeframe={selectedTimeframe}
              onTimeframeChange={setSelectedTimeframe}
            />
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-medium">Select View</h2>
            <ViewSelector
              selectedView={selectedView}
              onViewChange={setSelectedView}
            />
          </section>
        </div>

        {/* Dynamic Content Section */}
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4">
            {selectedView === 'prices' && 'Live Prices & Targets'}
            {selectedView === 'predictions' && 'Trending Predictions'}
            {selectedView === 'predictors' && 'Top Predictors'}
          </h2>
          {renderContent()}
        </section>
      </div>
    </div>
  );
}