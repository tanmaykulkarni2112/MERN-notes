import React from 'react';
import { Shield } from 'lucide-react';

const RateLimitedUI = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-primary/10 border border-primary/30 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center p-6 gap-4 md:gap-6">
          {/* Icon Box */}
          <div className="bg-primary/20 p-4 rounded-full">
            <Shield className="size-10 text-primary" />
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left flex-1">
            <h3 className="text-xl font-bold mb-1">Rate Limit Reached</h3>
            <p className="text-base-content text-sm md:text-base">
              Too many requests in short period. Please wait a moment.
            </p>
            <p className="text-sm text-base-content/70 mt-1">
              Try again in few seconds for better experience!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
