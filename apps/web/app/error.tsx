'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	return (
		<main style={{ padding: 24 }}>
			<h1>Đã có lỗi</h1>
			<p>{error?.message ?? 'Something went wrong.'}</p>
			<button onClick={() => reset()}>Thử lại</button>
		</main>
	);
}

