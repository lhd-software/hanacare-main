export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-white">
			<div className="max-w-2xl mx-auto px-6 text-center">
				<img
					src="https://assets.hanacare.vn/images/hanacare-logo-small.jpg"
					alt="HanaCare Logo"
					className="w-20 h-20 mx-auto mb-6 rounded-xl object-contain"
				/>
				<h1 className="text-9xl font-bold text-blue-500 mb-4">404</h1>
				<h2 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
				<p className="text-xl text-gray-600 mb-8">
					Sorry, we couldn't find the page you're looking for.
				</p>
				<a
					href="/"
					className="px-8 py-4 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-600 transition-colors"
				>
					Go Home
				</a>
			</div>
		</div>
	);
}