'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error('Error:', error);
	}, [error]);

	return (
		<div className="min-h-screen flex items-center justify-center bg-white">
			<div className="max-w-2xl mx-auto px-6 text-center">
				<h1 className="text-4xl font-bold text-gray-800 mb-4">Something went wrong</h1>
				<p className="text-xl text-gray-600 mb-8">
					An error occurred. Please try again.
				</p>
				<button
					onClick={reset}
					className="px-8 py-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors"
				>
					Try Again
				</button>
			</div>
		</div>
	);
}