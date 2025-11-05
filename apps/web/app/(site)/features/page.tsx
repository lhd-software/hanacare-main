import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Tính năng - HanaCare",
	description: "Khám phá các tính năng toàn diện của HanaCare",
};

export default function FeaturesPage() {
	return (
		<>
			<Header activeLink="features" />
			<main className="pt-20">
				<section
					id="features-hero-section"
					className="bg-gradient-to-br from-slate-50 to-blue-50 hero-pattern h-[500px] flex items-center"
				>
					<div className="max-w-7xl mx-auto px-6 text-center">
						<div className="max-w-4xl mx-auto">
							<h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-gray-800">
								Tính năng
								<span className="block text-brand-cyan">toàn diện</span>
							</h1>
							<p className="text-xl mb-8 text-gray-600 leading-relaxed max-w-3xl mx-auto">
								Khám phá những tính năng tiên tiến của HanaCare - từ AI thông minh đến kết nối đa thiết
								bị, tất cả được thiết kế để chăm sóc sức khỏe của bạn một cách tối ưu nhất.
							</p>
							<div className="flex justify-center items-center gap-6 text-gray-600">
								<div className="flex items-center gap-2">
									<i className="fa-solid fa-star text-yellow-500"></i>
									<span className="font-semibold">15+ tính năng chính</span>
								</div>
								<div className="flex items-center gap-2">
									<i className="fa-solid fa-shield-heart text-brand-cyan"></i>
									<span className="font-semibold">100% bảo mật</span>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id="ai-features-section" className="py-20 bg-white">
					<div className="max-w-7xl mx-auto px-6">
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-gray-800 mb-4">Trí tuệ nhân tạo tiên tiến</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								HanaCare AI được phát triển với công nghệ machine learning hàng đầu
							</p>
						</div>
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<div>
								<div className="space-y-8">
									<div className="flex items-start gap-6">
										<div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center flex-shrink-0">
											<i className="fa-solid fa-brain text-white text-2xl"></i>
										</div>
										<div>
											<h3 className="text-2xl font-bold text-gray-800 mb-3">Phân tích thông minh</h3>
											<p className="text-gray-600 leading-relaxed">
												AI phân tích hàng nghìn điểm dữ liệu mỗi ngày từ các thiết bị của bạn, nhận
												diện xu hướng và đưa ra cảnh báo sớm về các vấn đề sức khỏe tiềm ẩn.
											</p>
										</div>
									</div>
									<div className="flex items-start gap-6">
										<div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
											<i className="fa-solid fa-user-doctor text-brand-green text-2xl"></i>
										</div>
										<div>
											<h3 className="text-2xl font-bold text-gray-800 mb-3">Lời khuyên cá nhân hóa</h3>
											<p className="text-gray-600 leading-relaxed">
												Dựa trên hồ sơ sức khỏe cá nhân, AI đưa ra những lời khuyên phù hợp về chế độ
												ăn, tập luyện và lối sống để cải thiện sức khỏe tổng thể.
											</p>
										</div>
									</div>
									<div className="flex items-start gap-6">
										<div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
											<i className="fa-solid fa-chart-line text-purple-600 text-2xl"></i>
										</div>
										<div>
											<h3 className="text-2xl font-bold text-gray-800 mb-3">Dự đoán xu hướng</h3>
											<p className="text-gray-600 leading-relaxed">
												Công nghệ predictive analytics giúp dự báo các chỉ số sức khỏe trong tương
												lai, hỗ trợ bạn có kế hoạch chăm sóc sức khỏe proactive.
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="flex justify-center">
								<div className="relative">
									<Image
										src="https://storage.googleapis.com/uxpilot-auth.appspot.com/1966ddcb4f-879b075cf4c109a6060f.png"
										alt="futuristic AI brain interface with health data visualization"
										width={384}
										height={384}
										className="w-96 h-96 rounded-3xl shadow-2xl object-cover"
									/>
									<div className="absolute -top-4 -right-4 w-20 h-20 bg-brand-cyan/20 rounded-full animate-pulse"></div>
									<div
										className="absolute -bottom-4 -left-4 w-16 h-16 bg-brand-green/20 rounded-full animate-pulse"
										style={{ animationDelay: "1s" }}
									></div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id="monitoring-features-section" className="py-20 bg-gray-50">
					<div className="max-w-7xl mx-auto px-6">
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-gray-800 mb-4">Theo dõi sức khỏe toàn diện</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								Giám sát mọi khía cạnh của sức khỏe với độ chính xác cao
							</p>
						</div>
						<div className="grid md:grid-cols-3 gap-8">
							<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
								<div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
									<i className="fa-solid fa-heart-pulse text-red-500 text-2xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-gray-800 mb-4">Tim mạch</h3>
								<ul className="space-y-3 text-gray-600">
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										Nhịp tim liên tục 24/7
									</li>
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										Huyết áp tự động
									</li>
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										ECG chuyên nghiệp
									</li>
								</ul>
							</div>
							<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
								<div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mb-6">
									<i className="fa-solid fa-lungs text-brand-cyan text-2xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-gray-800 mb-4">Hô hấp</h3>
								<ul className="space-y-3 text-gray-600">
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										SpO2 liên tục
									</li>
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										Tần số thở
									</li>
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										Cảnh báo ngạt thở
									</li>
								</ul>
							</div>
							<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
								<div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
									<i className="fa-solid fa-bed text-brand-green text-2xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-gray-800 mb-4">Giấc ngủ</h3>
								<ul className="space-y-3 text-gray-600">
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										Chu kỳ ngủ sâu/nông
									</li>
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										Chất lượng giấc ngủ
									</li>
									<li className="flex items-center gap-3">
										<i className="fa-solid fa-check text-brand-green"></i>
										Smart alarm
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

