'use client';

import React from 'react';

interface ModelErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ModelErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

class ModelErrorBoundary extends React.Component<ModelErrorBoundaryProps, ModelErrorBoundaryState> {
  constructor(props: ModelErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ModelErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('ModelErrorBoundary caught an error:', error.message);
    // Don't log the full error in production to avoid noise
    if (process.env.NODE_ENV === 'development') {
      console.error('Full error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="w-full h-full bg-[#2a3142] flex items-center justify-center">
          <div className="text-center text-white">
            <div className="text-4xl mb-4">🔧</div>
            <p className="text-sm text-gray-300">
              3D Model temporarily unavailable
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ModelErrorBoundary;
