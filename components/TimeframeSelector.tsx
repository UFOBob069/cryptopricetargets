// components/TimeframeSelector.tsx
'use client';

import React from 'react';

interface TimeframeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TimeframeSelector({ value, onChange }: TimeframeSelectorProps) {
  // Generate next 8 quarters
  const generateQuarters = () => {
    const quarters = [];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentQuarter = Math.floor(currentDate.getMonth() / 3) + 1;

    for (let i = 0; i < 8; i++) {
      const quarterOffset = (currentQuarter + i);
      const yearOffset = Math.floor(quarterOffset / 4);
      const quarter = ((quarterOffset - 1) % 4) + 1;
      const year = currentYear + yearOffset;
      quarters.push({
        value: `Q${quarter}-${year}`,
        label: `Q${quarter} ${year}`
      });
    }
    return quarters;
  };

  // Generate next 3 years (end of year)
  const generateYears = () => {
    const years = [];
    const currentYear = new Date().getFullYear();
    for (let i = 1; i <= 3; i++) {
      const year = currentYear + i;
      years.push({
        value: `EOY-${year}`,
        label: `End of ${year}`
      });
    }
    return years;
  };

  const timeframes = [
    { value: 'current', label: 'Current Price' },
    ...generateQuarters(),
    ...generateYears()
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-gray-600">Price Target For:</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {timeframes.map((timeframe) => (
          <option key={timeframe.value} value={timeframe.value}>
            {timeframe.label}
          </option>
        ))}
      </select>
    </div>
  );
}