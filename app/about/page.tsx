export default function About() {
  return (
    <main className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            About Crypto Price Targets
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">How It Works</h2>
          
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Make Predictions</h3>
              <p className="text-gray-600 text-lg">
                Choose any cryptocurrency and set your price target along with a timeframe. 
                Our platform allows you to make informed predictions based on market data 
                and your analysis.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Track Progress</h3>
              <p className="text-gray-600 text-lg">
                Monitor how your predictions perform against actual market prices in real-time. 
                Get insights into your prediction accuracy and learn from your past predictions.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-semibold mb-4">Earn Points</h3>
              <p className="text-gray-600 text-lg">
                Get points for accurate predictions and compete with other users on our 
                leaderboard. Build your reputation as a skilled crypto price predictor.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
            <p className="text-gray-600 text-lg">
              We aim to create a community where cryptocurrency enthusiasts can share 
              their market insights and learn from each other. Our platform provides 
              tools to track and verify prediction accuracy, helping users improve 
              their analysis skills.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
} 