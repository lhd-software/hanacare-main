import type { Metadata } from "next";
import "../../styles/globals.css";

export const metadata: Metadata = {
	title: "HanaCare - Super App",
	description: "HanaCare Super App - Healthcare Platform",
};

export default function SiteLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			{children}
		</>
	);
}