'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function GetStarted() {
  const features = [
    {
      title: "Make Price Predictions",
      description: "Set your price targets for cryptocurrencies across different timeframes - from end of quarter to yearly predictions.",
      icon: "🎯"
    },
    {
      title: "Build Your Track Record",
      description: "Each prediction is tracked and scored for accuracy. Build your reputation as your predictions come true.",
      icon: "📈"
    },
    {
      title: "Share Your Insights",
      description: "Add detailed analysis to your predictions. Explain your reasoning and help others understand the market.",
      icon: "💡"
    },
    {
      title: "Community Voting",
      description: "Vote on the most insightful analyses. Help surface the highest quality predictions and commentary.",
      icon: "⭐"
    },
    {
      title: "Timeframe Flexibility",
      description: "Make predictions for multiple timeframes - Q2 2024, EOY 2024, Q2 2025, and more. Track both short and long-term accuracy.",
      icon: "⏱️"
    },
    {
      title: "Learn From Others",
      description: "Follow top predictors, read their analyses, and improve your own prediction skills.",
      icon: "🎓"
    }
  ];

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white p-8 rounded-xl shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Ready to Start Predicting?</h2>
          <p className="text-gray-600 mb-6">
            Join our community and start building your prediction track record today.
          </p>
          <Link 
            href="/signup" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Your Account
          </Link>
        </div>

        {/* Scoring System */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Prediction Scoring System</h2>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <span className="text-green-600 text-xl">✓</span>
                </div>
                <div>
                  <h3 className="font-semibold">Accuracy Score</h3>
                  <p className="text-gray-600">
                    Predictions are scored based on how close they are to the actual price at the target date.
                    The closer you are, the higher your accuracy score.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <span className="text-blue-600 text-xl">↗</span>
                </div>
                <div>
                  <h3 className="font-semibold">Reputation Points</h3>
                  <p className="text-gray-600">
                    Earn points for accurate predictions and helpful analyses. Your reputation score helps
                    others identify reliable predictors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 