'use client';

import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryState {
	hasError: boolean;
	error?: Error;
}

interface ErrorBoundaryProps {
	children: ReactNode;
	fallback?: React.ComponentType<{ error?: Error; reset: () => void }>;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		return { hasError: true, error };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error('ErrorBoundary caught an error:', error, errorInfo);
	}

	handleReset = () => {
		this.setState({ hasError: false, error: undefined });
	};

	render() {
		if (this.state.hasError) {
			const FallbackComponent = this.props.fallback || DefaultErrorFallback;
			return React.createElement(FallbackComponent, {
				error: this.state.error,
				reset: this.handleReset
			});
		}

		return this.props.children;
	}
}

function DefaultErrorFallback({ error, reset }: { error?: Error; reset: () => void }) {
	return (
		<main className="min-h-screen flex items-center justify-center bg-white">
			<div className="max-w-2xl mx-auto px-6 text-center">
				<h1 className="text-4xl font-bold text-gray-800 mb-4">Đã có lỗi xảy ra</h1>
				<p className="text-xl text-gray-600 mb-8">
					{error?.message || 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.'}
				</p>
				<button
					onClick={reset}
					className="px-8 py-4 bg-gradient-to-r from-brand-cyan to-brand-green text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
				>
					Thử lại
				</button>
			</div>
		</main>
	);
}