import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log cleanly in development for debugging without throwing uncaught exceptions
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Caught component exception in ErrorBoundary:', error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full max-w-4xl mx-auto my-8 p-6 sm:p-8 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-center shadow-xl backdrop-blur-md">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            {this.props.fallbackTitle || 'Component Encountered an Issue'}
          </h3>
          <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6 leading-relaxed">
            The rest of Smart Convo is functioning normally. You can retry loading this section or continue browsing.
          </p>
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4FF00] hover:bg-[#c6ee00] text-zinc-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Section</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
