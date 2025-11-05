import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Bảng giá - HanaCare",
	description: "Chọn gói dịch vụ phù hợp với nhu cầu của bạn",
};

export default function PricingPage() {
	return (
		<>
			<Header />
			<main className="pt-20">
				<section
					id="pricing-hero-section"
					className="bg-gradient-to-br from-slate-50 to-blue-50 h-[400px] flex items-center"
				>
					<div className="max-w-7xl mx-auto px-6 text-center">
						<h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800">
							Chọn gói phù hợp
							<span className="block text-brand-cyan">với nhu cầu của bạn</span>
						</h1>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Trải nghiệm chăm sóc sức khỏe thông minh với các gói dịch vụ linh hoạt, từ cơ bản đến cao
							cấp với AI và tư vấn chuyên gia
						</p>
					</div>
				</section>

				<section id="pricing-plans-section" className="py-20 bg-gray-50">
					<div className="max-w-7xl mx-auto px-6">
						<div className="text-center mb-16">
							<div className="inline-flex items-center bg-white rounded-full p-2 mb-8 shadow-lg">
								<button className="px-6 py-3 bg-brand-cyan text-white rounded-full font-semibold transition-all">
									Thanh toán hàng tháng
								</button>
								<button className="px-6 py-3 text-gray-600 hover:text-brand-cyan transition-all font-semibold">
									Thanh toán hàng năm (Tiết kiệm 20%)
								</button>
							</div>
						</div>

						<div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
							<div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
								<div className="text-center mb-8">
									<div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
										<i className="fa-solid fa-heart text-gray-600 text-2xl"></i>
									</div>
									<h3 className="text-2xl font-bold text-gray-800 mb-2">Gói Cơ Bản</h3>
									<p className="text-gray-600 mb-6">Phù hợp cho người mới bắt đầu</p>
									<div className="mb-6">
										<span className="text-5xl font-bold text-gray-800">Miễn phí</span>
									</div>
								</div>
								<ul className="space-y-4 mb-8">
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										<span className="text-gray-700">Theo dõi 3 chỉ số cơ bản</span>
									</li>
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										<span className="text-gray-700">Kết nối 1 thiết bị</span>
									</li>
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										<span className="text-gray-700">Báo cáo tuần</span>
									</li>
								</ul>
								<button className="w-full py-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all">
									Bắt đầu miễn phí
								</button>
							</div>

							<div className="bg-white rounded-3xl p-8 shadow-lg relative transform scale-105">
								<div className="absolute -top-4 left-1/2 -translate-x-1/2">
									<span className="bg-gradient-to-r from-brand-cyan to-brand-green text-white px-6 py-2 rounded-full text-sm font-bold">
										Phổ biến nhất
									</span>
								</div>
								<div className="text-center mb-8">
									<div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4">
										<i className="fa-solid fa-robot text-white text-2xl"></i>
									</div>
									<h3 className="text-2xl font-bold text-gray-800 mb-2">Gói Premium</h3>
									<p className="text-gray-600 mb-6">Tích hợp AI thông minh</p>
									<div className="mb-6">
										<span className="text-5xl font-bold text-brand-cyan">299K</span>
										<span className="text-gray-600">/tháng</span>
									</div>
								</div>
								<ul className="space-y-4 mb-8">
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										<span className="text-gray-700">Theo dõi không giới hạn chỉ số</span>
									</li>
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										<span className="text-gray-700">Kết nối 5 thiết bị</span>
									</li>
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										<span className="text-gray-700">AI phân tích và dự đoán</span>
									</li>
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										<span className="text-gray-700">Chat với HanaCare AI</span>
									</li>
								</ul>
								<button className="w-full py-4 gradient-button text-white font-bold rounded-xl shadow-brand hover:shadow-lg transition-all transform hover:scale-105">
									Chọn gói Premium
								</button>
							</div>

							<div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
								<div className="text-center mb-8">
									<div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
										<i className="fa-solid fa-user-doctor text-purple-600 text-2xl"></i>
									</div>
									<h3 className="text-2xl font-bold text-gray-800 mb-2">Gói Chuyên Nghiệp</h3>
									<p className="text-gray-600 mb-6">Tư vấn từ chuyên gia y tế</p>
									<div className="mb-6">
										<span className="text-5xl font-bold text-purple-600">599K</span>
										<span className="text-gray-600">/tháng</span>
									</div>
								</div>
								<ul className="space-y-4 mb-8">
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										<span className="text-gray-700">Tất cả tính năng Premium</span>
									</li>
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										<span className="text-gray-700">Kết nối không giới hạn thiết bị</span>
									</li>
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										<span className="text-gray-700">Tư vấn trực tiếp bác sĩ</span>
									</li>
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										<span className="text-gray-700">Hỗ trợ 24/7</span>
									</li>
								</ul>
								<button className="w-full py-4 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all">
									Chọn gói Chuyên nghiệp
								</button>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

