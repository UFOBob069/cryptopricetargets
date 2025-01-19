// components/Hero.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text Content */}
          <div className="text-center md:text-left space-y-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-white">
              Crypto Price Predictions
              <span className="block text-blue-200 mt-2">Made Simple</span>
            </h1>
            <p className="text-xl text-blue-100">
              Track, analyze, and predict cryptocurrency prices with our community of expert predictors.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link 
                href="/signup"
                className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Get Started
              </Link>
              <Link 
                href="/learn-more"
                className="px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Right Column - Visual Element */}
          <div className="relative h-64 sm:h-80 md:h-96">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src="/hero-crypto-illustration.svg"
                  alt="Crypto Trading Illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}