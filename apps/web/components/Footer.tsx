"use client";

import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-gray-900 text-white py-16">
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid md:grid-cols-4 gap-8">
					<div>
						<Link href="/" className="flex items-center gap-3 mb-6">
							<div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center">
								<i className="fa-solid fa-robot text-white text-xl" aria-hidden="true"></i>
							</div>
							<span className="text-2xl font-bold">HanaCare</span>
						</Link>
						<p className="text-gray-400 mb-6">
							Ứng dụng chăm sóc sức khỏe thông minh với AI, mang đến trải nghiệm y tế tốt nhất cho mọi người.
						</p>
						<div className="flex gap-4">
							<a
								href="#"
								className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-cyan transition-colors"
							>
								<i className="fa-brands fa-facebook"></i>
							</a>
							<a
								href="#"
								className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-cyan transition-colors"
							>
								<i className="fa-brands fa-instagram"></i>
							</a>
							<a
								href="#"
								className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-brand-cyan transition-colors"
							>
								<i className="fa-brands fa-youtube"></i>
							</a>
						</div>
					</div>
					<div>
						<h3 className="text-lg font-bold mb-6">Sản phẩm</h3>
						<ul className="space-y-3 text-gray-400">
							<li>
								<Link href="/features" className="hover:text-white transition-colors">
									Tính năng
								</Link>
							</li>
							<li>
								<Link href="/pricing" className="hover:text-white transition-colors">
									Bảng giá
								</Link>
							</li>
							<li>
								<a href="#" className="hover:text-white transition-colors">
									API
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white transition-colors">
									Tích hợp
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-bold mb-6">Công ty</h3>
						<ul className="space-y-3 text-gray-400">
							<li>
								<Link href="/about" className="hover:text-white transition-colors">
									Về chúng tôi
								</Link>
							</li>
							<li>
								<a href="#" className="hover:text-white transition-colors">
									Tin tức
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-white transition-colors">
									Tuyển dụng
								</a>
							</li>
							<li>
								<Link href="/contact" className="hover:text-white transition-colors">
									Liên hệ
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-lg font-bold mb-6">Hỗ trợ</h3>
						<ul className="space-y-3 text-gray-400">
							<li>
								<Link href="/contact" className="hover:text-white transition-colors">
									Trung tâm trợ giúp
								</Link>
							</li>
							<li>
								<a href="#" className="hover:text-white transition-colors">
									Hướng dẫn
								</a>
							</li>
							<li>
								<Link href="/privacy" className="hover:text-white transition-colors">
									Bảo mật
								</Link>
							</li>
							<li>
								<Link href="/terms" className="hover:text-white transition-colors">
									Điều khoản
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
					<p>© 2024 HanaCare. Tất cả quyền được bảo lưu.</p>
				</div>
			</div>
		</footer>
	);
}

