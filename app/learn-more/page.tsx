'use client';

import Link from 'next/link';

export default function LearnMore() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-6">
            How It Works
          </h1>
          <p className="text-xl text-center text-blue-100 max-w-3xl mx-auto">
            Join our community of crypto analysts and enthusiasts making data-driven predictions 
            and sharing valuable market insights.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-4">Make Predictions</h3>
            <p className="text-gray-600">
              Set price targets for cryptocurrencies across different timeframes - from end of quarter to yearly predictions. Build your track record and establish yourself as a reliable predictor.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-4">Track Performance</h3>
            <p className="text-gray-600">
              Each prediction is tracked and scored for accuracy. Build your reputation as your predictions come true. Follow other successful predictors and learn from their insights.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-xl font-semibold mb-4">Share Insights</h3>
            <p className="text-gray-600">
              Add detailed analysis to your predictions. Help others understand your reasoning and contribute to the community&apos;s collective knowledge.
            </p>
          </div>
        </div>

        {/* Scoring System */}
        <div className="bg-white p-8 rounded-xl shadow-sm mb-16">
          <h2 className="text-2xl font-bold mb-8">Prediction Scoring System</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Accuracy Score</h3>
              <p className="text-gray-600">
                Predictions are scored based on how close they are to the actual price at the target date. 
                The scoring system takes into account:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Percentage difference from target price</li>
                <li>Market volatility during the prediction period</li>
                <li>Timeframe length</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Reputation Points</h3>
              <p className="text-gray-600">
                Build your reputation through:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Accurate predictions</li>
                <li>Helpful analysis and insights</li>
                <li>Community engagement and contributions</li>
                <li>Consistent participation</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Predicting?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community of crypto analysts and start building your prediction track record today. 
            Share your insights and learn from others in the community.
          </p>
          <Link 
            href="/signup" 
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Your Account
          </Link>
        </div>
      </div>
    </div>
  );
} 