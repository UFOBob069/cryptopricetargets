// components/TimeframeSelector.tsx
'use client';

import React from 'react';

interface TimeframeSelectorProps {
  selectedTimeframe: string;
  onTimeframeChange: (timeframe: string) => void;
}

export default function TimeframeSelector({ selectedTimeframe, onTimeframeChange }: TimeframeSelectorProps) {
  const timeframes = [
    'Q2 2025', 'Q3 2025', 'Q4 2025',
    'Q4 2026', 'Q4 2027', 'Q4 2028', 'Q4 2029', 'Q4 2030',
    '2035', '2040'
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {timeframes.map((timeframe) => (
        <button
          key={timeframe}
          onClick={() => onTimeframeChange(timeframe)}
          className={`px-4 py-2 rounded-lg ${
            selectedTimeframe === timeframe
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          {timeframe}
        </button>
      ))}
    </div>
  );
}