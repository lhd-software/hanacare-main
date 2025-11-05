import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faStar,
	faDownload,
	faSun,
	faBell,
	faRobot,
	faHeart,
	faLungs,
	faLink,
	faChartLine,
	faShieldHeart,
	faHouseMedical,
	faMobileScreen
} from '@fortawesome/free-solid-svg-icons';
import { faApple, faGooglePlay } from '@fortawesome/free-brands-svg-icons';

export default function Home() {
	return (
		<>
			<Header />
			<main className="pt-20">
				<section
					id="hero-section"
					className="bg-gradient-to-br from-slate-50 to-blue-50 hero-pattern h-[700px] flex items-center"
				>
					<div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
						<div className="text-gray-800">
							<h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
								Quản lý sức khỏe
								<span className="block text-brand-cyan">thông minh với AI</span>
							</h1>
							<p className="text-xl mb-8 text-gray-600 leading-relaxed">
								HanaCare - Ứng dụng chăm sóc sức khỏe cá nhân hóa với trí tuệ nhân tạo. Theo dõi,
								phân tích và đưa ra lời khuyên sức khỏe phù hợp với bạn.
							</p>
							<div className="flex flex-col sm:flex-row gap-4 mb-8">
								<button className="px-8 py-4 gradient-button text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 flex items-center justify-center gap-3">
									<FontAwesomeIcon icon={faApple} className="text-2xl" />
									Tải trên App Store
								</button>
								<button className="px-8 py-4 bg-white text-brand-cyan font-bold rounded-xl border-2 border-brand-cyan hover:bg-brand-cyan hover:text-white transition-all flex items-center justify-center gap-3 shadow-lg">
									<FontAwesomeIcon icon={faGooglePlay} className="text-2xl" />
									Tải trên Google Play
								</button>
							</div>
							<div className="flex items-center gap-6 text-gray-600">
								<div className="flex items-center gap-2">
									<FontAwesomeIcon icon={faStar} className="text-yellow-500" />
									<span className="font-semibold">4.8/5</span>
								</div>
								<div className="flex items-center gap-2">
									<FontAwesomeIcon icon={faDownload} className="text-brand-cyan" />
									<span className="font-semibold">100K+ tải xuống</span>
								</div>
							</div>
						</div>
						<div className="flex justify-center">
							<div className="relative">
								<div className="w-80 h-[600px] bg-white rounded-3xl shadow-2xl overflow-hidden">
									<div className="gradient-hero p-5 pb-6">
										<div className="flex justify-between items-center mb-5">
											<div className="flex items-center gap-3">
												<Image
													src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
													alt="User Avatar"
													width={44}
													height={44}
													className="rounded-full border-2 border-white/80 shadow-md"
												/>
												<div>
													<h3 className="text-lg font-bold text-white">Chào buổi sáng, Jane!</h3>
													<div className="flex items-center gap-2">
														<FontAwesomeIcon icon={faSun} className="text-yellow-300 text-xs" />
														<p className="text-xs text-white/90">Nắng, 24°C</p>
													</div>
												</div>
											</div>
											<div className="flex items-center gap-2">
												<div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white">
													<FontAwesomeIcon icon={faBell} className="text-sm" />
												</div>
											</div>
										</div>
										<div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
											<div className="flex items-center gap-3 mb-3">
												<div className="w-10 h-10 bg-white/30 rounded-xl flex items-center justify-center">
													<FontAwesomeIcon icon={faRobot} className="text-white" />
												</div>
												<div>
													<h4 className="text-base font-bold text-white">HanaCare AI</h4>
													<p className="text-xs text-white/80">Trợ lý sức khỏe thông minh</p>
												</div>
											</div>
											<p className="text-sm text-white/90 mb-3">
												Tôi đã phân tích dữ liệu từ 2 thiết bị trong 24h qua. Tất cả chỉ số đều trong mức bình
												thường!
											</p>
											<div className="grid grid-cols-2 gap-2">
												<button className="px-3 py-2 bg-white text-brand-cyan rounded-xl text-sm font-bold">
													Chat
												</button>
												<button className="px-3 py-2 bg-white/20 text-white rounded-xl text-sm font-bold border border-white/30">
													Báo cáo
												</button>
											</div>
										</div>
									</div>
									<div className="p-4 space-y-4">
										<div className="grid grid-cols-2 gap-3">
											<div className="bg-red-50 p-3 rounded-xl">
												<div className="flex items-center justify-between mb-2">
													<span className="text-sm font-medium text-red-800">Nhịp tim</span>
													<FontAwesomeIcon icon={faHeart} className="text-red-500" />
												</div>
												<p className="text-2xl font-bold text-red-600">72</p>
											</div>
											<div className="bg-cyan-50 p-3 rounded-xl">
												<div className="flex items-center justify-between mb-2">
													<span className="text-sm font-medium text-cyan-800">SpO2</span>
													<FontAwesomeIcon icon={faLungs} className="text-brand-cyan" />
												</div>
												<p className="text-2xl font-bold text-brand-cyan">98%</p>
											</div>
										</div>
									</div>
								</div>
								<div className="absolute -top-6 -right-6 w-20 h-20 bg-yellow-300 rounded-full opacity-20 animate-pulse"></div>
								<div
									className="absolute -bottom-6 -left-6 w-16 h-16 bg-green-300 rounded-full opacity-20 animate-pulse"
									style={{ animationDelay: "1s" }}
								></div>
							</div>
						</div>
					</div>
				</section>

				<section id="features-section" className="py-20 bg-gray-50">
					<div className="max-w-7xl mx-auto px-6">
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-gray-800 mb-4">Tính năng nổi bật</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								HanaCare mang đến những tính năng tiên tiến nhất để chăm sóc sức khỏe của bạn một cách
								toàn diện
							</p>
						</div>
						<div className="grid md:grid-cols-3 gap-8">
							<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
								<div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center mb-6">
									<FontAwesomeIcon icon={faRobot} className="text-white text-2xl" />
								</div>
								<h3 className="text-2xl font-bold text-gray-800 mb-4">AI Thông minh</h3>
								<p className="text-gray-600 leading-relaxed">
									Trí tuệ nhân tạo phân tích dữ liệu sức khỏe 24/7, đưa ra lời khuyên cá nhân hóa và dự
									đoán xu hướng sức khỏe.
								</p>
							</div>
							<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
								<div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
									<FontAwesomeIcon icon={faLink} className="text-brand-green text-2xl" />
								</div>
								<h3 className="text-2xl font-bold text-gray-800 mb-4">Kết nối đa thiết bị</h3>
								<p className="text-gray-600 leading-relaxed">
									Tương thích với hơn 100+ thiết bị y tế thông minh như Apple Watch, Xiaomi, Samsung và
									nhiều thương hiệu khác.
								</p>
							</div>
							<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
								<div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6">
									<FontAwesomeIcon icon={faChartLine} className="text-red-500 text-2xl" />
								</div>
								<h3 className="text-2xl font-bold text-gray-800 mb-4">Theo dõi toàn diện</h3>
								<p className="text-gray-600 leading-relaxed">
									Giám sát nhịp tim, huyết áp, đường huyết, giấc ngủ, vận động và nhiều chỉ số sức khỏe
									quan trọng khác.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section id="benefits-section" className="py-20">
					<div className="max-w-7xl mx-auto px-6">
						<div className="grid md:grid-cols-2 gap-16 items-center">
							<div>
								<h2 className="text-4xl font-bold text-gray-800 mb-6">Tại sao chọn HanaCare?</h2>
								<div className="space-y-6">
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 gradient-hero rounded-xl flex items-center justify-center flex-shrink-0">
											<FontAwesomeIcon icon={faShieldHeart} className="text-white" />
										</div>
										<div>
											<h3 className="text-xl font-bold text-gray-800 mb-2">Bảo mật tuyệt đối</h3>
											<p className="text-gray-600">
												Dữ liệu sức khỏe được mã hóa và bảo vệ theo tiêu chuẩn quốc tế HIPAA.
											</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
											<FontAwesomeIcon icon={faHouseMedical} className="text-brand-green" />
										</div>
										<div>
											<h3 className="text-xl font-bold text-gray-800 mb-2">Tư vấn từ chuyên gia</h3>
											<p className="text-gray-600">
												Kết nối trực tiếp với đội ngũ bác sĩ và chuyên gia dinh dưỡng 24/7.
											</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
											<FontAwesomeIcon icon={faMobileScreen} className="text-purple-600" />
										</div>
										<div>
											<h3 className="text-xl font-bold text-gray-800 mb-2">Giao diện thân thiện</h3>
											<p className="text-gray-600">
												Thiết kế đơn giản, dễ sử dụng cho mọi lứa tuổi từ người cao tuổi đến trẻ em.
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="grid grid-cols-2 gap-6">
								<div className="bg-cyan-50 p-6 rounded-2xl text-center">
									<h3 className="text-3xl font-bold text-brand-cyan mb-2">100K+</h3>
									<p className="text-cyan-800 font-medium">Người dùng tin tưởng</p>
								</div>
								<div className="bg-green-50 p-6 rounded-2xl text-center">
									<h3 className="text-3xl font-bold text-brand-green mb-2">99.9%</h3>
									<p className="text-green-800 font-medium">Độ chính xác</p>
								</div>
								<div className="bg-orange-50 p-6 rounded-2xl text-center">
									<h3 className="text-3xl font-bold text-orange-600 mb-2">24/7</h3>
									<p className="text-orange-800 font-medium">Hỗ trợ liên tục</p>
								</div>
								<div className="bg-purple-50 p-6 rounded-2xl text-center">
									<h3 className="text-3xl font-bold text-purple-600 mb-2">4.8★</h3>
									<p className="text-purple-800 font-medium">Đánh giá cao</p>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id="download-section" className="py-20 gradient-hero">
					<div className="max-w-4xl mx-auto px-6 text-center text-white">
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
							Bắt đầu hành trình sức khỏe của bạn
						</h2>
						<p className="text-xl mb-10 text-white/90">
							Tải HanaCare ngay hôm nay và trải nghiệm cách chăm sóc sức khỏe thông minh nhất
						</p>
						<div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
							<button className="px-10 py-5 bg-white text-brand-cyan font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-4">
								<FontAwesomeIcon icon={faApple} className="text-3xl" />
								<div className="text-left">
									<p className="text-sm">Tải xuống trên</p>
									<p className="text-xl font-bold">App Store</p>
								</div>
							</button>
							<button className="px-10 py-5 bg-white text-brand-cyan font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-4">
								<FontAwesomeIcon icon={faGooglePlay} className="text-3xl" />
								<div className="text-left">
									<p className="text-sm">Tải xuống trên</p>
									<p className="text-xl font-bold">Google Play</p>
								</div>
							</button>
						</div>
						<p className="text-white/80 mt-8">Miễn phí tải xuống • Không quảng cáo • Bảo mật tuyệt đối</p>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}
