import type { Metadata } from "next";
import "../styles/globals.css";
import FontAwesomeHead from "@/components/FontAwesomeHead";

export const metadata: Metadata = {
	title: "HanaCare - Super App",
	description: "HanaCare Super App - Healthcare Platform",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="vi">
			<body className="bg-white">
				<FontAwesomeHead />
				{children}
			</body>
		</html>
	);
}
