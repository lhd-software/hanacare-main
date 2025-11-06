import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Về chúng tôi - HanaCare",
	description: "Tìm hiểu về HanaCare và sứ mệnh của chúng tôi",
};

// Avatar fallback component
function AvatarWithFallback({ src, alt, initials, className }: { src: string; alt: string; initials: string; className?: string }) {
	return (
		<div className="w-32 h-32 mx-auto mb-6 rounded-2xl overflow-hidden shadow-lg bg-gray-200 flex items-center justify-center relative">
			<Image
				src={src}
				alt={alt}
				width={128}
				height={128}
				className="w-full h-full object-cover"
				onError={(e) => {
					const target = e.target as HTMLImageElement;
					target.style.display = 'none';
				}}
			/>
			<span className="text-gray-500 text-2xl font-bold absolute">{initials}</span>
		</div>
	);
}

export default function AboutPage() {
	return (
		<>
			<Header activeLink="about" />
			<main className="pt-20">
				<section
					id="about-hero-section"
					className="bg-gradient-to-br from-slate-50 to-blue-50 hero-pattern h-[500px] flex items-center"
				>
					<div className="max-w-7xl mx-auto px-6 text-center">
						<h1 className="text-5xl md:text-6xl font-bold mb-6 text-gray-800 leading-tight">
							Về <span className="text-brand-cyan">HanaCare</span>
						</h1>
						<p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
							Chúng tôi tin rằng công nghệ AI có thể thay đổi cách con người chăm sóc sức khỏe. HanaCare ra
							đời với sứ mệnh mang đến giải pháp y tế thông minh, cá nhân hóa cho mọi người.
						</p>
					</div>
				</section>

				<section id="mission-section" className="py-20">
					<div className="max-w-7xl mx-auto px-6">
						<div className="grid md:grid-cols-2 gap-16 items-center">
							<div>
								<h2 className="text-4xl font-bold text-gray-800 mb-6">Sứ mệnh của chúng tôi</h2>
								<p className="text-lg text-gray-600 mb-6 leading-relaxed">
									Tại HanaCare, chúng tôi cam kết tạo ra một thế giới nơi mọi người đều có thể tiếp cận
									dịch vụ chăm sóc sức khỏe chất lượng cao thông qua công nghệ AI tiên tiến.
								</p>
								<p className="text-lg text-gray-600 mb-8 leading-relaxed">
									Chúng tôi tin rằng việc theo dõi và phân tích dữ liệu sức khỏe một cách thông minh sẽ
									giúp phòng ngừa bệnh tật hiệu quả hơn việc điều trị sau khi đã mắc bệnh.
								</p>
								<div className="grid grid-cols-3 gap-6">
									<div className="text-center">
										<h3 className="text-3xl font-bold text-brand-cyan mb-2">5+</h3>
										<p className="text-gray-600 font-medium">Năm phát triển</p>
									</div>
									<div className="text-center">
										<h3 className="text-3xl font-bold text-brand-green mb-2">100K+</h3>
										<p className="text-gray-600 font-medium">Người dùng</p>
									</div>
									<div className="text-center">
										<h3 className="text-3xl font-bold text-orange-600 mb-2">50+</h3>
										<p className="text-gray-600 font-medium">Chuyên gia y tế</p>
									</div>
								</div>
							</div>
							<div className="flex justify-center">
								<div className="w-96 h-96 overflow-hidden rounded-3xl shadow-2xl">
									<Image
										src="https://img.hanacare.vn/small/4b60e5fd2c-368e79ef7aeb91aae099.png"
										alt="modern healthcare technology office with AI screens, medical devices, team working on health innovation, bright and professional atmosphere"
										width={384}
										height={384}
										className="w-full h-full object-cover"
									/>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id="values-section" className="py-20 bg-gray-50">
					<div className="max-w-7xl mx-auto px-6">
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-gray-800 mb-4">Giá trị cốt lõi</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								Những nguyên tắc định hướng mọi hoạt động của chúng tôi trong việc phát triển sản phẩm
							</p>
						</div>
						<div className="grid md:grid-cols-3 gap-8">
							<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
								<div className="w-16 h-16 gradient-hero rounded-2xl flex items-center justify-center mb-6">
									<i className="fa-solid fa-shield-heart text-white text-2xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-gray-800 mb-4">Bảo mật tuyệt đối</h3>
								<p className="text-gray-600 leading-relaxed">
									Dữ liệu sức khỏe là tài sản quý giá nhất. Chúng tôi cam kết bảo vệ thông tin cá nhân
									của bạn với các tiêu chuẩn bảo mật cao nhất.
								</p>
							</div>
							<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
								<div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
									<i className="fa-solid fa-brain text-brand-green text-2xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-gray-800 mb-4">Đổi mới sáng tạo</h3>
								<p className="text-gray-600 leading-relaxed">
									Chúng tôi không ngừng nghiên cứu và áp dụng những công nghệ AI mới nhất để mang đến
									trải nghiệm tốt nhất cho người dùng.
								</p>
							</div>
							<div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all">
								<div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6">
									<i className="fa-solid fa-users text-orange-600 text-2xl"></i>
								</div>
								<h3 className="text-2xl font-bold text-gray-800 mb-4">Tập trung vào người dùng</h3>
								<p className="text-gray-600 leading-relaxed">
									Mọi tính năng được phát triển đều xuất phát từ nhu cầu thực tế của người dùng. Chúng
									tôi lắng nghe và cải thiện liên tục.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section id="team-section" className="py-20">
					<div className="max-w-7xl mx-auto px-6">
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-gray-800 mb-4">Đội ngũ chuyên gia</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								Những con người tài năng đang làm việc không mệt mỏi để biến tầm nhìn của chúng tôi thành
								hiện thực
							</p>
						</div>
						<div className="grid md:grid-cols-4 gap-8">
							<div className="text-center">
								<AvatarWithFallback
									src="https://img.hanacare.vn/small/avatar-2.jpg"
									alt="CEO"
									initials="ND"
								/>
								<h3 className="text-xl font-bold text-gray-800 mb-2">Nguyễn Minh Đức</h3>
								<p className="text-brand-cyan font-semibold mb-2">CEO & Founder</p>
								<p className="text-gray-600 text-sm">15 năm kinh nghiệm trong lĩnh vực công nghệ y tế</p>
							</div>
							<div className="text-center">
								<AvatarWithFallback
									src="https://img.hanacare.vn/small/avatar-1.jpg"
									alt="CTO"
									initials="TL"
								/>
								<h3 className="text-xl font-bold text-gray-800 mb-2">Trần Thị Lan</h3>
								<p className="text-brand-cyan font-semibold mb-2">CTO</p>
								<p className="text-gray-600 text-sm">Chuyên gia AI với hơn 12 năm kinh nghiệm</p>
							</div>
							<div className="text-center">
								<AvatarWithFallback
									src="https://img.hanacare.vn/small/avatar-3.jpg"
									alt="Head of Medical"
									initials="LH"
								/>
								<h3 className="text-xl font-bold text-gray-800 mb-2">Lê Văn Hùng</h3>
								<p className="text-brand-cyan font-semibold mb-2">Head of Medical</p>
								<p className="text-gray-600 text-sm">Bác sĩ tim mạch với 20 năm kinh nghiệm lâm sàng</p>
							</div>
							<div className="text-center">
								<AvatarWithFallback
									src="https://img.hanacare.vn/small/avatar-5.jpg"
									alt="Head of Design"
									initials="PM"
								/>
								<h3 className="text-xl font-bold text-gray-800 mb-2">Phạm Thị Mai</h3>
								<p className="text-brand-cyan font-semibold mb-2">Head of Design</p>
								<p className="text-gray-600 text-sm">Chuyên gia UX/UI với 10 năm kinh nghiệm</p>
							</div>
						</div>
					</div>
				</section>

				<section id="timeline-section" className="py-20 bg-gray-50">
					<div className="max-w-7xl mx-auto px-6">
						<div className="text-center mb-16">
							<h2 className="text-4xl font-bold text-gray-800 mb-4">Hành trình phát triển</h2>
							<p className="text-xl text-gray-600 max-w-3xl mx-auto">
								Từ ý tưởng ban đầu đến ứng dụng được hàng trăm nghìn người tin dùng
							</p>
						</div>
						<div className="relative">
							<div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-brand-cyan"></div>
							<div className="space-y-12">
								<div className="flex items-center">
									<div className="w-1/2 pr-8 text-right">
										<h3 className="text-2xl font-bold text-gray-800 mb-2">2019 - Khởi đầu</h3>
										<p className="text-gray-600">
											Ý tưởng về HanaCare được thai nghén từ nhu cầu cá nhân của founder trong việc
											theo dõi sức khỏe gia đình.
										</p>
									</div>
									<div className="w-12 h-12 bg-brand-cyan rounded-full flex items-center justify-center relative z-10">
										<i className="fa-solid fa-lightbulb text-white"></i>
									</div>
									<div className="w-1/2 pl-8"></div>
								</div>
								<div className="flex items-center">
									<div className="w-1/2 pr-8"></div>
									<div className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center relative z-10">
										<i className="fa-solid fa-code text-white"></i>
									</div>
									<div className="w-1/2 pl-8">
										<h3 className="text-2xl font-bold text-gray-800 mb-2">2020 - Phát triển</h3>
										<p className="text-gray-600">
											Đội ngũ kỹ thuật được thành lập, bắt đầu phát triển các thuật toán AI đầu tiên
											cho việc phân tích dữ liệu sức khỏe.
										</p>
									</div>
								</div>
								<div className="flex items-center">
									<div className="w-1/2 pr-8 text-right">
										<h3 className="text-2xl font-bold text-gray-800 mb-2">2022 - Ra mắt</h3>
										<p className="text-gray-600">
											Phiên bản beta của HanaCare được ra mắt với 1000 người dùng đầu tiên. Nhận được
											phản hồi tích cực từ cộng đồng.
										</p>
									</div>
									<div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center relative z-10">
										<i className="fa-solid fa-rocket text-white"></i>
									</div>
									<div className="w-1/2 pl-8"></div>
								</div>
								<div className="flex items-center">
									<div className="w-1/2 pr-8"></div>
									<div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center relative z-10">
										<i className="fa-solid fa-trophy text-white"></i>
									</div>
									<div className="w-1/2 pl-8">
										<h3 className="text-2xl font-bold text-gray-800 mb-2">2024 - Hiện tại</h3>
										<p className="text-gray-600">
											HanaCare đã có hơn 100,000 người dùng tin tưởng và được đánh giá 4.8/5 sao trên
											các cửa hàng ứng dụng.
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				<section id="contact-cta-section" className="py-20 gradient-hero">
					<div className="max-w-4xl mx-auto px-6 text-center text-white">
						<h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
							Hãy cùng chúng tôi xây dựng tương lai y tế
						</h2>
						<p className="text-xl mb-10 text-white/90">
							Bạn có ý tưởng, góp ý hoặc muốn hợp tác? Chúng tôi luôn sẵn sàng lắng nghe và kết nối.
						</p>
						<div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
							<button className="px-10 py-5 bg-white text-brand-cyan font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 flex items-center gap-3">
								<i className="fa-solid fa-envelope text-xl"></i>
								Liên hệ với chúng tôi
							</button>
							<button className="px-10 py-5 bg-white/20 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/30 hover:bg-white/30 transition-all flex items-center gap-3">
								<i className="fa-solid fa-briefcase text-xl"></i>
								Cơ hội nghề nghiệp
							</button>
						</div>
					</div>
				</section>
			</main>
			<Footer />
		</>
	);
}

