import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Price Targets",
  description: "Crowd-sourced cryptocurrency price predictions and analysis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Crypto Price Targets</h1>
            <div className="space-x-4">
              <a href="/" className="hover:text-gray-300">Home</a>
              <a href="/predictions" className="hover:text-gray-300">Predictions</a>
              <a href="/profile" className="hover:text-gray-300">Profile</a>
            </div>
          </div>
        </nav>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}