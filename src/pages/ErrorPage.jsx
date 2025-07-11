import React from 'react';
import { SectionContainer } from '../components/SectionContainer';
import { useNavigate } from 'react-router';

export const ErrorPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <SectionContainer classProps="min-h-screen flex items-center justify-center">
      <div className="text-center px-4">
        {/* Error Code */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-gradient mb-4">
            404
          </h1>
          <div className="h-1 w-24 bg-gradient mx-auto mb-8 rounded-full"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-0 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-neutral-20 mb-2">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <p className="text-neutral-30">
            Don't worry, let's get you back on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={handleGoHome}
            className="btn btn-primary bg-primary-50 hover:bg-primary-60 border-none text-neutral-0 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Go to Home
          </button>
          <button
            onClick={handleGoBack}
            className="btn btn-outline border-neutral-40 text-neutral-20 hover:bg-neutral-70 hover:border-neutral-30 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
          >
            Go Back
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="mt-12 opacity-20">
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-primary-50 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-secondary-50 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-3 h-3 bg-primary-50 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
