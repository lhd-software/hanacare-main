import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Lợi ích - HanaCare",
	description: "Khám phá những lợi ích vượt trội của HanaCare",
};

export default function BenefitsPage() {
	return (
		<>
			<Header activeLink="benefits" />
			<main className="pt-20">
				<section
					id="hero-benefits"
					className="bg-gradient-to-br from-slate-50 to-blue-50 hero-pattern h-[600px] flex items-center"
				>
					<div className="max-w-7xl mx-auto px-6 text-center">
						<h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800 leading-tight">
							Lợi ích vượt trội của
							<span className="block text-brand-cyan">HanaCare</span>
						</h1>
						<p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
							Khám phá những lợi ích đặc biệt mà HanaCare mang lại cho sức khỏe của bạn. Từ lời khuyên
							cá nhân hóa đến theo dõi toàn diện, chúng tôi đồng hành cùng hành trình sức khỏe của bạn.
						</p>
						<div className="flex items-center justify-center gap-8 text-gray-600">
							<div className="flex items-center gap-2">
								<i className="fa-solid fa-users text-brand-cyan text-xl"></i>
								<span className="font-semibold">100K+ người dùng</span>
							</div>
							<div className="flex items-center gap-2">
								<i className="fa-solid fa-star text-yellow-500 text-xl"></i>
								<span className="font-semibold">4.8/5 đánh giá</span>
							</div>
							<div className="flex items-center gap-2">
								<i className="fa-solid fa-shield-heart text-brand-green text-xl"></i>
								<span className="font-semibold">Bảo mật tuyệt đối</span>
							</div>
						</div>
					</div>
				</section>

				<section id="key-benefits-section" className="py-20 bg-white">
					<div className="max-w-7xl mx-auto px-6">
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-gray-800 mb-4">Những lợi ích cốt lõi</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								HanaCare không chỉ là một ứng dụng theo dõi sức khỏe thông thường
							</p>
						</div>
						<div className="grid md:grid-cols-3 gap-8">
							<div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
								<div className="w-20 h-20 gradient-hero rounded-3xl flex items-center justify-center mb-6 shadow-lg">
									<i className="fa-solid fa-brain text-white text-3xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-gray-800 mb-4">AI Cá nhân hóa</h3>
								<p className="text-gray-600 leading-relaxed mb-6">
									Trí tuệ nhân tạo học hỏi từ thói quen và dữ liệu của bạn để đưa ra lời khuyên phù hợp
									nhất cho từng cá nhân.
								</p>
								<ul className="space-y-2 text-gray-600">
									<li className="flex items-center gap-2">
										<i className="fa-solid fa-check text-brand-cyan"></i>
										<span>Phân tích xu hướng sức khỏe</span>
									</li>
									<li className="flex items-center gap-2">
										<i className="fa-solid fa-check text-brand-cyan"></i>
										<span>Dự đoán rủi ro sức khỏe</span>
									</li>
									<li className="flex items-center gap-2">
										<i className="fa-solid fa-check text-brand-cyan"></i>
										<span>Lời khuyên thời gian thực</span>
									</li>
								</ul>
							</div>

							<div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
								<div className="w-20 h-20 bg-gradient-to-br from-brand-green to-green-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
									<i className="fa-solid fa-chart-line text-white text-3xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-gray-800 mb-4">Theo dõi toàn diện</h3>
								<p className="text-gray-600 leading-relaxed mb-6">
									Giám sát mọi khía cạnh sức khỏe từ thể chất đến tinh thần, tạo bức tranh sức khỏe
									hoàn chỉnh.
								</p>
								<ul className="space-y-2 text-gray-600">
									<li className="flex items-center gap-2">
										<i className="fa-solid fa-check text-brand-green"></i>
										<span>15+ chỉ số sức khỏe</span>
									</li>
									<li className="flex items-center gap-2">
										<i className="fa-solid fa-check text-brand-green"></i>
										<span>Theo dõi 24/7 liên tục</span>
									</li>
									<li className="flex items-center gap-2">
										<i className="fa-solid fa-check text-brand-green"></i>
										<span>Báo cáo chi tiết hàng tuần</span>
									</li>
								</ul>
							</div>

							<div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
								<div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center mb-6 shadow-lg">
									<i className="fa-solid fa-users-medical text-white text-3xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-gray-800 mb-4">Tư vấn chuyên gia</h3>
								<p className="text-gray-600 leading-relaxed mb-6">
									Kết nối trực tiếp với đội ngũ bác sĩ, chuyên gia dinh dưỡng và huấn luyện viên chuyên
									nghiệp.
								</p>
								<ul className="space-y-2 text-gray-600">
									<li className="flex items-center gap-2">
										<i className="fa-solid fa-check text-purple-600"></i>
										<span>Tư vấn 24/7</span>
									</li>
									<li className="flex items-center gap-2">
										<i className="fa-solid fa-check text-purple-600"></i>
										<span>Video call với bác sĩ</span>
									</li>
									<li className="flex items-center gap-2">
										<i className="fa-solid fa-check text-purple-600"></i>
										<span>Kế hoạch điều trị cá nhân</span>
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

