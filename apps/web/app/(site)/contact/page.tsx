import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Liên hệ hỗ trợ - HanaCare",
	description: "Liên hệ với đội ngũ hỗ trợ HanaCare 24/7",
};

export default function ContactPage() {
	return (
		<>
			<Header activeLink="contact" />
			<main className="pt-20">
				<section
					id="support-hero-section"
					className="gradient-hero h-[400px] flex items-center"
				>
					<div className="max-w-7xl mx-auto px-6 text-center text-white">
						<h1 className="text-5xl font-bold mb-6">Trung tâm hỗ trợ</h1>
						<p className="text-xl mb-8 max-w-3xl mx-auto">
							Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7. Tìm câu trả lời nhanh chóng hoặc liên hệ trực tiếp
							với đội ngũ chuyên gia của chúng tôi.
						</p>
						<div className="max-w-2xl mx-auto">
							<div className="flex items-center bg-white/20 backdrop-blur-sm rounded-2xl p-2">
								<i className="fa-solid fa-search text-white/70 ml-4"></i>
								<input
									type="text"
									placeholder="Tìm kiếm câu hỏi thường gặp..."
									className="flex-1 bg-transparent text-white placeholder-white/70 px-4 py-3 outline-none"
								/>
								<button className="px-6 py-3 bg-white text-brand-cyan font-semibold rounded-xl hover:bg-gray-100 transition-colors">
									Tìm kiếm
								</button>
							</div>
						</div>
					</div>
				</section>

				<section id="contact-options-section" className="py-20">
					<div className="max-w-7xl mx-auto px-6">
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-gray-800 mb-4">Liên hệ với chúng tôi</h2>
							<p className="text-xl text-gray-600">Chọn cách thức liên hệ phù hợp nhất với bạn</p>
						</div>
						<div className="grid md:grid-cols-3 gap-8">
							<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 border-2 border-transparent hover:border-brand-cyan">
								<div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center mb-6 mx-auto">
									<i className="fa-solid fa-comments text-white text-2xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Chat trực tuyến</h3>
								<p className="text-gray-600 mb-6 text-center">
									Nhận hỗ trợ ngay lập tức từ đội ngũ chuyên gia qua chat
								</p>
								<div className="text-center mb-6">
									<span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
										<i className="fa-solid fa-circle text-green-500 text-xs mr-2"></i>
										Đang trực tuyến
									</span>
								</div>
								<button className="w-full px-6 py-3 gradient-button text-white font-semibold rounded-xl shadow-brand hover:shadow-lg transition-all">
									Bắt đầu chat
								</button>
							</div>

							<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
								<div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
									<i className="fa-solid fa-envelope text-blue-600 text-2xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Email hỗ trợ</h3>
								<p className="text-gray-600 mb-6 text-center">
									Gửi email chi tiết và nhận phản hồi trong vòng 2 giờ
								</p>
								<div className="text-center mb-6">
									<span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
										Phản hồi &lt; 2h
									</span>
								</div>
								<button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
									Gửi email
								</button>
							</div>

							<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
								<div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
									<i className="fa-solid fa-phone text-brand-green text-2xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">Hotline 24/7</h3>
								<p className="text-gray-600 mb-6 text-center">
									Gọi điện trực tiếp để được hỗ trợ khẩn cấp
								</p>
								<div className="text-center mb-6">
									<span className="text-2xl font-bold text-brand-green">1900 1234</span>
								</div>
								<button className="w-full px-6 py-3 bg-brand-green text-white font-semibold rounded-xl hover:bg-green-600 transition-colors">
									Gọi ngay
								</button>
							</div>
						</div>
					</div>
				</section>

				<section id="contact-form-section" className="py-20 bg-gray-50">
					<div className="max-w-4xl mx-auto px-6">
						<div className="text-center mb-12">
							<h2 className="text-4xl font-bold text-gray-800 mb-4">Gửi yêu cầu hỗ trợ</h2>
							<p className="text-xl text-gray-600">
								Điền form dưới đây và chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất
							</p>
						</div>
						<div className="bg-white rounded-2xl shadow-xl p-8">
							<form className="space-y-6">
								<div className="grid md:grid-cols-2 gap-6">
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">
											Họ và tên *
										</label>
										<input
											type="text"
											className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
											placeholder="Nhập họ và tên"
										/>
									</div>
									<div>
										<label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
										<input
											type="email"
											className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
											placeholder="Nhập email"
										/>
									</div>
								</div>
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Mô tả chi tiết *
									</label>
									<textarea
										rows={6}
										className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan"
										placeholder="Mô tả chi tiết vấn đề bạn đang gặp phải..."
									></textarea>
								</div>
								<div className="flex gap-4">
									<button
										type="submit"
										className="px-8 py-3 gradient-button text-white font-semibold rounded-xl shadow-brand hover:shadow-lg transition-all transform hover:scale-105"
									>
										Gửi yêu cầu
									</button>
									<button
										type="button"
										className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-300 transition-colors"
									>
										Hủy bỏ
									</button>
								</div>
							</form>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

