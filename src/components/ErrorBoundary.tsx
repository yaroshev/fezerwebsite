import React from 'react';

type ErrorBoundaryState = { hasError: boolean; error?: Error };

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="max-w-lg w-full dark:bg-white/[0.07] light:bg-black/[0.07] dark:border-white/10 light:border-black/10 rounded-2xl p-6 text-center">
            <h2 className="text-xl font-semibold dark:text-white light:text-black mb-2">Something went wrong</h2>
            <p className="text-sm dark:text-gray-400 light:text-gray-600">Check the console for details.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

