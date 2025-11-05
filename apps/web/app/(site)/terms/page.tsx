import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Điều khoản sử dụng - HanaCare",
	description: "Điều khoản và điều kiện sử dụng ứng dụng HanaCare",
};

export default function TermsPage() {
	return (
		<>
			<Header />
			<main className="pt-20">
				<section
					id="terms-hero-section"
					className="bg-gradient-to-br from-slate-50 to-blue-50 h-[400px] flex items-center"
				>
					<div className="max-w-5xl mx-auto px-6 text-center">
						<div className="w-20 h-20 gradient-hero rounded-3xl flex items-center justify-center mx-auto mb-6">
							<i className="fa-solid fa-file-contract text-white text-3xl"></i>
						</div>
						<h1 className="text-5xl font-bold text-gray-800 mb-6">Điều khoản sử dụng</h1>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto">
							Thỏa thuận pháp lý quy định các điều khoản và điều kiện sử dụng ứng dụng HanaCare
						</p>
						<div className="flex items-center justify-center gap-4 mt-6 text-gray-500">
							<span className="flex items-center gap-2">
								<i className="fa-solid fa-calendar text-brand-cyan"></i>
								Cập nhật lần cuối: 15/11/2024
							</span>
							<span className="flex items-center gap-2">
								<i className="fa-solid fa-clock text-brand-cyan"></i>
								Có hiệu lực từ: 01/01/2024
							</span>
						</div>
					</div>
				</section>

				<section id="terms-content-section" className="py-16">
					<div className="max-w-4xl mx-auto px-6">
						<div className="bg-cyan-50 rounded-2xl p-6 mb-12 border border-cyan-100">
							<h3 className="text-lg font-bold text-cyan-900 mb-4">Mục lục</h3>
							<div className="grid md:grid-cols-2 gap-3">
								<Link
									href="#section-1"
									className="flex items-center gap-3 text-cyan-800 hover:text-brand-cyan transition-colors p-2 rounded-lg hover:bg-cyan-100"
								>
									<i className="fa-solid fa-chevron-right text-xs"></i>
									<span className="font-medium">1. Chấp nhận điều khoản</span>
								</Link>
								<Link
									href="#section-2"
									className="flex items-center gap-3 text-cyan-800 hover:text-brand-cyan transition-colors p-2 rounded-lg hover:bg-cyan-100"
								>
									<i className="fa-solid fa-chevron-right text-xs"></i>
									<span className="font-medium">2. Mô tả dịch vụ</span>
								</Link>
								<Link
									href="#section-3"
									className="flex items-center gap-3 text-cyan-800 hover:text-brand-cyan transition-colors p-2 rounded-lg hover:bg-cyan-100"
								>
									<i className="fa-solid fa-chevron-right text-xs"></i>
									<span className="font-medium">3. Tài khoản người dùng</span>
								</Link>
								<Link
									href="#section-4"
									className="flex items-center gap-3 text-cyan-800 hover:text-brand-cyan transition-colors p-2 rounded-lg hover:bg-cyan-100"
								>
									<i className="fa-solid fa-chevron-right text-xs"></i>
									<span className="font-medium">4. Quyền riêng tư & Bảo mật</span>
								</Link>
								<Link
									href="#section-5"
									className="flex items-center gap-3 text-cyan-800 hover:text-brand-cyan transition-colors p-2 rounded-lg hover:bg-cyan-100"
								>
									<i className="fa-solid fa-chevron-right text-xs"></i>
									<span className="font-medium">5. Sử dụng chấp nhận được</span>
								</Link>
								<Link
									href="#section-6"
									className="flex items-center gap-3 text-cyan-800 hover:text-brand-cyan transition-colors p-2 rounded-lg hover:bg-cyan-100"
								>
									<i className="fa-solid fa-chevron-right text-xs"></i>
									<span className="font-medium">6. Trách nhiệm & Giới hạn</span>
								</Link>
							</div>
						</div>

						<div className="space-y-12">
							<div id="section-1" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
								<div className="flex items-center gap-4 mb-6">
									<div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
										<i className="fa-solid fa-handshake text-brand-cyan text-xl"></i>
									</div>
									<h2 className="text-2xl font-bold text-gray-800">1. Chấp nhận điều khoản</h2>
								</div>
								<div className="prose prose-gray max-w-none">
									<p className="text-gray-700 leading-relaxed mb-4">
										Bằng việc tải xuống, cài đặt, truy cập hoặc sử dụng ứng dụng HanaCare ("Ứng dụng"),
										bạn đồng ý bị ràng buộc bởi các Điều khoản Sử dụng này ("Điều khoản"). Nếu bạn không
										đồng ý với bất kỳ phần nào của các điều khoản này, vui lòng không sử dụng Ứng dụng.
									</p>
									<p className="text-gray-700 leading-relaxed">
										Các Điều khoản này tạo thành một thỏa thuận pháp lý có ràng buộc giữa bạn và HanaCare.
										Chúng tôi có thể cập nhật các Điều khoản này theo thời gian và sẽ thông báo cho bạn về
										những thay đổi quan trọng.
									</p>
								</div>
							</div>

							<div id="section-2" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
								<div className="flex items-center gap-4 mb-6">
									<div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
										<i className="fa-solid fa-heart-pulse text-brand-green text-xl"></i>
									</div>
									<h2 className="text-2xl font-bold text-gray-800">2. Mô tả dịch vụ</h2>
								</div>
								<div className="prose prose-gray max-w-none">
									<p className="text-gray-700 leading-relaxed mb-4">
										HanaCare là một ứng dụng chăm sóc sức khỏe cá nhân sử dụng trí tuệ nhân tạo để theo
										dõi, phân tích và đưa ra lời khuyên về sức khỏe. Dịch vụ bao gồm:
									</p>
									<ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
										<li>Theo dõi các chỉ số sức khỏe từ thiết bị đeo và cảm biến</li>
										<li>Phân tích dữ liệu sức khỏe bằng AI và machine learning</li>
										<li>Đưa ra lời khuyên cá nhân hóa về dinh dưỡng, tập luyện và lối sống</li>
										<li>Kết nối với chuyên gia y tế và dịch vụ tư vấn</li>
										<li>Báo cáo và thống kê chi tiết về tình trạng sức khỏe</li>
									</ul>
									<div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
										<div className="flex items-start gap-3">
											<i className="fa-solid fa-exclamation-triangle text-yellow-600 mt-1"></i>
											<div>
												<p className="font-semibold text-yellow-800 mb-1">Lưu ý quan trọng:</p>
												<p className="text-yellow-700 text-sm">
													HanaCare không thay thế việc tư vấn y tế chuyên nghiệp. Luôn tham khảo ý kiến
													bác sĩ cho các vấn đề sức khỏe nghiêm trọng.
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div id="section-3" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
								<div className="flex items-center gap-4 mb-6">
									<div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
										<i className="fa-solid fa-user-circle text-purple-600 text-xl"></i>
									</div>
									<h2 className="text-2xl font-bold text-gray-800">3. Tài khoản người dùng</h2>
								</div>
								<div className="prose prose-gray max-w-none">
									<h3 className="text-lg font-semibold text-gray-800 mb-3">3.1 Đăng ký tài khoản</h3>
									<p className="text-gray-700 leading-relaxed mb-4">
										Để sử dụng một số tính năng của HanaCare, bạn cần tạo tài khoản. Bạn cam kết cung cấp
										thông tin chính xác, đầy đủ và cập nhật. Bạn có trách nhiệm bảo mật thông tin đăng nhập
										và tất cả hoạt động diễn ra dưới tài khoản của mình.
									</p>
									<h3 className="text-lg font-semibold text-gray-800 mb-3">3.2 Độ tuổi tối thiểu</h3>
									<p className="text-gray-700 leading-relaxed mb-4">
										Bạn phải đủ 13 tuổi trở lên để sử dụng HanaCare. Nếu bạn dưới 18 tuổi, bạn cần có sự
										đồng ý của phụ huynh hoặc người giám hộ hợp pháp.
									</p>
									<h3 className="text-lg font-semibold text-gray-800 mb-3">3.3 Chấm dứt tài khoản</h3>
									<p className="text-gray-700 leading-relaxed">
										Bạn có thể xóa tài khoản bất cứ lúc nào. Chúng tôi có quyền tạm ngừng hoặc chấm dứt tài
										khoản nếu vi phạm Điều khoản này.
									</p>
								</div>
							</div>

							<div id="section-4" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
								<div className="flex items-center gap-4 mb-6">
									<div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
										<i className="fa-solid fa-shield-halved text-blue-600 text-xl"></i>
									</div>
									<h2 className="text-2xl font-bold text-gray-800">4. Quyền riêng tư & Bảo mật</h2>
								</div>
								<div className="prose prose-gray max-w-none">
									<p className="text-gray-700 leading-relaxed mb-4">
										Chúng tôi cam kết bảo vệ quyền riêng tư và dữ liệu sức khỏe của bạn theo các tiêu chuẩn
										bảo mật cao nhất:
									</p>
									<div className="grid md:grid-cols-2 gap-4 mb-6">
										<div className="bg-cyan-50 p-4 rounded-xl border border-cyan-100">
											<h4 className="font-semibold text-cyan-900 mb-2">Mã hóa dữ liệu</h4>
											<p className="text-cyan-800 text-sm">
												Tất cả dữ liệu được mã hóa AES-256 khi lưu trữ và truyền tải
											</p>
										</div>
										<div className="bg-green-50 p-4 rounded-xl border border-green-100">
											<h4 className="font-semibold text-green-900 mb-2">Tuân thủ HIPAA</h4>
											<p className="text-green-800 text-sm">
												Đáp ứng tiêu chuẩn bảo mật y tế quốc tế HIPAA
											</p>
										</div>
										<div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
											<h4 className="font-semibold text-purple-900 mb-2">Kiểm soát dữ liệu</h4>
											<p className="text-purple-800 text-sm">
												Bạn có toàn quyền kiểm soát việc chia sẻ dữ liệu cá nhân
											</p>
										</div>
										<div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
											<h4 className="font-semibold text-orange-900 mb-2">Xóa dữ liệu</h4>
											<p className="text-orange-800 text-sm">
												Quyền yêu cầu xóa hoàn toàn dữ liệu cá nhân
											</p>
										</div>
									</div>
									<p className="text-gray-700 leading-relaxed">
										Chi tiết về cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn được mô tả
										trong Chính sách Quyền riêng tư riêng biệt.
									</p>
								</div>
							</div>

							<div id="section-5" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
								<div className="flex items-center gap-4 mb-6">
									<div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
										<i className="fa-solid fa-ban text-red-600 text-xl"></i>
									</div>
									<h2 className="text-2xl font-bold text-gray-800">5. Sử dụng chấp nhận được</h2>
								</div>
								<div className="prose prose-gray max-w-none">
									<p className="text-gray-700 leading-relaxed mb-4">
										Khi sử dụng HanaCare, bạn đồng ý KHÔNG thực hiện các hành vi sau:
									</p>
									<div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
										<ul className="list-disc list-inside text-red-800 space-y-2">
											<li>Sử dụng ứng dụng cho mục đích bất hợp pháp hoặc trái phép</li>
											<li>Cố gắng truy cập trái phép vào hệ thống hoặc dữ liệu</li>
											<li>Chia sẻ thông tin đăng nhập tài khoản với người khác</li>
											<li>Tải lên nội dung độc hại, virus hoặc mã độc</li>
											<li>Sao chép, phân phối hoặc bán lại dịch vụ</li>
											<li>Sử dụng dữ liệu của người dùng khác mà không có sự đồng ý</li>
										</ul>
									</div>
									<p className="text-gray-700 leading-relaxed">
										Vi phạm các quy định này có thể dẫn đến việc tạm ngừng hoặc chấm dứt tài khoản ngay lập
										tức mà không cần thông báo trước.
									</p>
								</div>
							</div>

							<div id="section-6" className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
								<div className="flex items-center gap-4 mb-6">
									<div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
										<i className="fa-solid fa-balance-scale text-gray-600 text-xl"></i>
									</div>
									<h2 className="text-2xl font-bold text-gray-800">6. Trách nhiệm & Giới hạn</h2>
								</div>
								<div className="prose prose-gray max-w-none">
									<h3 className="text-lg font-semibold text-gray-800 mb-3">6.1 Miễn trừ trách nhiệm</h3>
									<p className="text-gray-700 leading-relaxed mb-4">
										HanaCare được cung cấp "như hiện tại" mà không có bảo đảm nào. Chúng tôi không chịu
										trách nhiệm cho bất kỳ thiệt hại nào phát sinh từ việc sử dụng ứng dụng, bao gồm nhưng
										không giới hạn ở mất dữ liệu, gián đoạn dịch vụ, hoặc quyết định y tế dựa trên thông tin
										từ ứng dụng.
									</p>
									<h3 className="text-lg font-semibold text-gray-800 mb-3">
										6.2 Giới hạn trách nhiệm pháp lý
									</h3>
									<p className="text-gray-700 leading-relaxed mb-4">
										Trong mọi trường hợp, tổng trách nhiệm pháp lý của chúng tôi đối với bạn sẽ không vượt
										quá số tiền bạn đã thanh toán cho dịch vụ trong 12 tháng gần nhất.
									</p>
									<div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
										<p className="text-gray-700 text-sm">
											<strong>Lưu ý:</strong> Một số khu vực pháp lý không cho phép loại trừ hoặc giới hạn
											trách nhiệm pháp lý nhất định, vì vậy các giới hạn trên có thể không áp dụng cho bạn.
										</p>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-gradient-to-r from-cyan-50 to-green-50 rounded-2xl p-8 mt-12 border border-cyan-100">
							<div className="text-center">
								<div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center mx-auto mb-4">
									<i className="fa-solid fa-envelope text-white text-2xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-gray-800 mb-4">Có câu hỏi về Điều khoản?</h3>
								<p className="text-gray-600 mb-6 max-w-2xl mx-auto">
									Nếu bạn có bất kỳ câu hỏi nào về Điều khoản Sử dụng này, vui lòng liên hệ với đội ngũ pháp
									lý của chúng tôi.
								</p>
								<div className="flex flex-col sm:flex-row gap-4 justify-center">
									<a
										href="mailto:legal@hanacare.com"
										className="px-6 py-3 gradient-button text-white font-semibold rounded-xl shadow-brand hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2"
									>
										<i className="fa-solid fa-envelope"></i>
										legal@hanacare.com
									</a>
									<a
										href="tel:+84123456789"
										className="px-6 py-3 bg-white text-brand-cyan font-semibold rounded-xl border-2 border-brand-cyan hover:bg-brand-cyan hover:text-white transition-all flex items-center justify-center gap-2"
									>
										<i className="fa-solid fa-phone"></i>
										+84 123 456 789
									</a>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

