import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Chính sách bảo mật - HanaCare",
	description: "Chính sách bảo mật dữ liệu và quyền riêng tư của HanaCare",
};

export default function PrivacyPage() {
	return (
		<>
			<Header />
			<main className="pt-28">
				<section id="hero-privacy" className="bg-gradient-to-br from-cyan-50 to-blue-50 py-16">
					<div className="max-w-4xl mx-auto px-6 text-center">
						<div className="w-20 h-20 gradient-hero rounded-3xl flex items-center justify-center mx-auto mb-8">
							<i className="fa-solid fa-shield-heart text-white text-3xl"></i>
						</div>
						<h1 className="text-5xl font-bold text-gray-800 mb-6">Chính sách bảo mật dữ liệu</h1>
						<p className="text-xl text-gray-600 mb-8 leading-relaxed">
							HanaCare cam kết bảo vệ thông tin sức khỏe cá nhân của bạn theo tiêu chuẩn HIPAA và các quy
							định bảo mật quốc tế
						</p>
						<div className="flex items-center justify-center gap-6 text-gray-600">
							<div className="flex items-center gap-2">
								<i className="fa-solid fa-calendar text-brand-cyan"></i>
								<span className="font-medium">Cập nhật: 15/11/2024</span>
							</div>
							<div className="flex items-center gap-2">
								<i className="fa-solid fa-certificate text-brand-green"></i>
								<span className="font-medium">HIPAA Compliant</span>
							</div>
						</div>
					</div>
				</section>

				<section id="privacy-overview" className="py-16">
					<div className="max-w-7xl mx-auto px-6">
						<div className="grid md:grid-cols-3 gap-8 mb-16">
							<div className="bg-cyan-50 p-8 rounded-2xl border border-cyan-100">
								<div className="w-16 h-16 bg-brand-cyan rounded-2xl flex items-center justify-center mb-6">
									<i className="fa-solid fa-lock text-white text-2xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-cyan-900 mb-4">Mã hóa End-to-End</h3>
								<p className="text-cyan-800">
									Tất cả dữ liệu được mã hóa AES-256 từ thiết bị đến server, đảm bảo không ai có thể
									truy cập trái phép.
								</p>
							</div>
							<div className="bg-green-50 p-8 rounded-2xl border border-green-100">
								<div className="w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center mb-6">
									<i className="fa-solid fa-user-shield text-white text-2xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-green-900 mb-4">Kiểm soát dữ liệu</h3>
								<p className="text-green-800">
									Bạn có toàn quyền kiểm soát dữ liệu cá nhân, có thể xem, chỉnh sửa hoặc xóa bất cứ
									lúc nào.
								</p>
							</div>
							<div className="bg-purple-50 p-8 rounded-2xl border border-purple-100">
								<div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mb-6">
									<i className="fa-solid fa-eye-slash text-white text-2xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-purple-900 mb-4">Zero Knowledge</h3>
								<p className="text-purple-800">
									Chúng tôi áp dụng nguyên tắc Zero Knowledge - không thể đọc dữ liệu cá nhân của bạn.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section id="hipaa-compliance" className="py-16 bg-gray-50">
					<div className="max-w-6xl mx-auto px-6">
						<div className="text-center mb-12">
							<h2 className="text-4xl font-bold text-gray-800 mb-4">Tuân thủ quy định HIPAA</h2>
							<p className="text-xl text-gray-600">HanaCare đáp ứng đầy đủ các yêu cầu bảo mật theo tiêu chuẩn HIPAA</p>
						</div>
						<div className="grid md:grid-cols-2 gap-12 items-center">
							<div>
								<div className="space-y-6">
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 bg-brand-cyan rounded-xl flex items-center justify-center flex-shrink-0">
											<i className="fa-solid fa-database text-white"></i>
										</div>
										<div>
											<h3 className="text-xl font-bold text-gray-800 mb-2">
												Bảo vệ PHI (Protected Health Information)
											</h3>
											<p className="text-gray-600">
												Tất cả thông tin sức khỏe được bảo vệ theo chuẩn PHI với các biện pháp bảo mật
												vật lý, kỹ thuật và quản trị.
											</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 bg-brand-green rounded-xl flex items-center justify-center flex-shrink-0">
											<i className="fa-solid fa-user-check text-white"></i>
										</div>
										<div>
											<h3 className="text-xl font-bold text-gray-800 mb-2">Kiểm soát truy cập nghiêm ngặt</h3>
											<p className="text-gray-600">
												Chỉ những nhân viên được ủy quyền mới có thể truy cập dữ liệu, với đầy đủ log
												audit và giám sát.
											</p>
										</div>
									</div>
									<div className="flex items-start gap-4">
										<div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
											<i className="fa-solid fa-clipboard-check text-white"></i>
										</div>
										<div>
											<h3 className="text-xl font-bold text-gray-800 mb-2">Đánh giá bảo mật định kỳ</h3>
											<p className="text-gray-600">
												Thực hiện kiểm tra bảo mật hàng quý bởi các công ty bảo mật hàng đầu thế giới.
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-white p-8 rounded-2xl shadow-lg">
								<div className="text-center">
									<div className="w-24 h-24 bg-gradient-to-br from-brand-cyan to-brand-green rounded-full flex items-center justify-center mx-auto mb-6">
										<i className="fa-solid fa-certificate text-white text-3xl"></i>
									</div>
									<h3 className="text-2xl font-bold text-gray-800 mb-4">Chứng nhận HIPAA</h3>
									<p className="text-gray-600 mb-6">
										HanaCare đã được chứng nhận tuân thủ đầy đủ các quy định HIPAA về bảo vệ thông tin
										sức khỏe cá nhân.
									</p>
									<div className="bg-green-50 p-4 rounded-xl border border-green-200">
										<div className="flex items-center justify-center gap-2 text-green-800">
											<i className="fa-solid fa-shield-check text-green-600"></i>
											<span className="font-bold">Chứng nhận hợp lệ đến 2025</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id="user-rights" className="py-16 bg-gray-50">
					<div className="max-w-6xl mx-auto px-6">
						<h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Quyền của người dùng</h2>
						<div className="grid md:grid-cols-2 gap-8">
							<div className="space-y-6">
								<div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-brand-cyan">
									<h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-3">
										<i className="fa-solid fa-eye text-brand-cyan"></i>
										Quyền truy cập
									</h3>
									<p className="text-gray-600">Xem tất cả dữ liệu cá nhân mà chúng tôi lưu trữ về bạn bất cứ lúc nào.</p>
								</div>
								<div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-brand-green">
									<h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-3">
										<i className="fa-solid fa-pen text-brand-green"></i>
										Quyền chỉnh sửa
									</h3>
									<p className="text-gray-600">Cập nhật, sửa đổi hoặc bổ sung thông tin cá nhân của bạn.</p>
								</div>
								<div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-red-500">
									<h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-3">
										<i className="fa-solid fa-trash text-red-500"></i>
										Quyền xóa
									</h3>
									<p className="text-gray-600">Yêu cầu xóa hoàn toàn dữ liệu cá nhân khỏi hệ thống của chúng tôi.</p>
								</div>
								<div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-purple-500">
									<h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-3">
										<i className="fa-solid fa-download text-purple-500"></i>
										Quyền xuất dữ liệu
									</h3>
									<p className="text-gray-600">Tải xuống bản sao dữ liệu cá nhân ở định dạng có thể đọc được.</p>
								</div>
							</div>
							<div className="bg-white p-8 rounded-2xl shadow-lg">
								<h3 className="text-2xl font-bold text-gray-800 mb-6">Liên hệ về bảo mật</h3>
								<p className="text-gray-600 mb-6">Có thắc mắc về quyền riêng tư hoặc cần hỗ trợ về dữ liệu cá nhân?</p>
								<div className="space-y-4">
									<div className="flex items-center gap-3">
										<i className="fa-solid fa-envelope text-brand-cyan"></i>
										<span className="text-gray-700">privacy@hanacare.com</span>
									</div>
									<div className="flex items-center gap-3">
										<i className="fa-solid fa-phone text-brand-green"></i>
										<span className="text-gray-700">1800-1234 (24/7)</span>
									</div>
									<div className="flex items-center gap-3">
										<i className="fa-solid fa-clock text-orange-500"></i>
										<span className="text-gray-700">Phản hồi trong 24h</span>
									</div>
								</div>
								<button className="w-full mt-6 px-6 py-3 gradient-button text-white font-semibold rounded-xl shadow-brand hover:shadow-lg transition-all">
									Gửi yêu cầu bảo mật
								</button>
							</div>
						</div>
					</div>
				</section>

				<section id="security-measures" className="py-16">
					<div className="max-w-6xl mx-auto px-6">
						<h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Biện pháp bảo mật kỹ thuật</h2>
						<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
							<div className="bg-cyan-50 p-6 rounded-2xl text-center border border-cyan-100">
								<div className="w-16 h-16 bg-brand-cyan rounded-2xl flex items-center justify-center mx-auto mb-4">
									<i className="fa-solid fa-shield-halved text-white text-2xl"></i>
								</div>
								<h3 className="text-lg font-bold text-cyan-900 mb-2">Firewall</h3>
								<p className="text-cyan-700 text-sm">Tường lửa đa lớp bảo vệ 24/7</p>
							</div>
							<div className="bg-green-50 p-6 rounded-2xl text-center border border-green-100">
								<div className="w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center mx-auto mb-4">
									<i className="fa-solid fa-key text-white text-2xl"></i>
								</div>
								<h3 className="text-lg font-bold text-green-900 mb-2">2FA</h3>
								<p className="text-green-700 text-sm">Xác thực hai yếu tố bắt buộc</p>
							</div>
							<div className="bg-orange-50 p-6 rounded-2xl text-center border border-orange-100">
								<div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
									<i className="fa-solid fa-bug text-white text-2xl"></i>
								</div>
								<h3 className="text-lg font-bold text-orange-900 mb-2">Penetration Test</h3>
								<p className="text-orange-700 text-sm">Kiểm tra xâm nhập định kỳ</p>
							</div>
							<div className="bg-purple-50 p-6 rounded-2xl text-center border border-purple-100">
								<div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
									<i className="fa-solid fa-search text-white text-2xl"></i>
								</div>
								<h3 className="text-lg font-bold text-purple-900 mb-2">Monitoring</h3>
								<p className="text-purple-700 text-sm">Giám sát bất thường 24/7</p>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

