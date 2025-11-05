export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="vi">
			<body className="bg-white">
				{children}
			</body>
		</html>
	);
}