'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error('Error caught by error boundary:', error);
	}, [error]);

	return (
		<main className="min-h-screen flex items-center justify-center bg-white">
			<div className="max-w-2xl mx-auto px-6 text-center">
				<h1 className="text-4xl font-bold text-gray-800 mb-4">Đã có lỗi xảy ra</h1>
				<p className="text-xl text-gray-600 mb-8">
					{error?.message || 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.'}
				</p>
				<button
					onClick={() => reset()}
					className="px-8 py-4 bg-gradient-to-r from-brand-cyan to-brand-green text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
				>
					Thử lại
				</button>
			</div>
		</main>
	);
}

