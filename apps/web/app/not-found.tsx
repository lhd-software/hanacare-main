"use client";

import Link from "next/link";
import NotFoundLayout from "@/components/NotFoundLayout";

export default function NotFound() {
	return (
		<NotFoundLayout>
			<main className="pt-20 min-h-screen flex items-center justify-center">
				<div className="max-w-2xl mx-auto px-6 text-center">
					<div className="mb-8">
						<h1 className="text-9xl font-bold text-brand-cyan mb-4">404</h1>
						<h2 className="text-4xl font-bold text-gray-800 mb-4">Trang không tìm thấy</h2>
						<p className="text-xl text-gray-600 mb-8">
							Xin lỗi, chúng tôi không tìm thấy trang bạn đang tìm kiếm. Trang này có thể đã bị di chuyển
							hoặc không tồn tại.
						</p>
					</div>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link
							href="/"
							className="px-8 py-4 gradient-button text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
						>
							Về trang chủ
						</Link>
						<Link
							href="/contact"
							className="px-8 py-4 bg-white text-brand-cyan font-bold rounded-xl border-2 border-brand-cyan hover:bg-brand-cyan hover:text-white transition-all"
						>
							Liên hệ hỗ trợ
						</Link>
					</div>
				</div>
			</main>
		</NotFoundLayout>
	);
}

