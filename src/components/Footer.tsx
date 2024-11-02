import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center text-sm text-gray-600">
          <p className="mb-4">
            Disclaimer: This app provides financial education and tracking for informational purposes only and does not provide investment advice.
          </p>
          <p>
            © {new Date().getFullYear()} Investment Advisor & Tracker. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}