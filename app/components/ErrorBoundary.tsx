'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Log additional debugging information
    console.error('Error stack:', error.stack);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Component stack:', errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-300 mb-4">
              We're sorry, but something unexpected happened while loading this page.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="text-left bg-gray-800 p-4 rounded mb-4 max-w-2xl">
                <p className="text-red-400 font-mono text-sm">
                  Error: {this.state.error.message}
                </p>
                <p className="text-gray-400 font-mono text-xs mt-2">
                  {this.state.error.stack}
                </p>
              </div>
            )}
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
