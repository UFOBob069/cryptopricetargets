// app/page.tsx
'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import CoinList from '@/components/CoinList';
import TimeframeSelector from '@/components/TimeframeSelector';
import Link from 'next/link';

export default function Home() {
  const { data: session, status } = useSession();
  const [timeframe, setTimeframe] = useState('current');

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Crypto Price Targets
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Make your cryptocurrency price predictions and track their accuracy
          </p>
          <div className="space-x-4">
            {!session && (
              <Link
                href="/signup"
                className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Sign Up to Start Predicting
              </Link>
            )}
            <Link 
              href="/about" 
              className="inline-block border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {session ? `Welcome, ${session.user?.name}` : 'Popular Cryptocurrencies'}
          </h2>
          
          <TimeframeSelector 
            value={timeframe}
            onChange={setTimeframe}
          />
        </div>
        
        <CoinList timeframe={timeframe} />
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} Crypto Predictions. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="/about"
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                About
              </a>
              <a
                href="/privacy"
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}