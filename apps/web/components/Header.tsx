"use client";

import Link from "next/link";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

interface HeaderProps {
	activeLink?: string;
}

export default function Header({ activeLink }: HeaderProps) {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	return (
		<header className="bg-white shadow-sm fixed w-full top-0 z-50">
			<nav className="max-w-7xl mx-auto px-6 py-4">
				<div className="flex items-center justify-between">
					<Link href="/" className="flex items-center gap-3">
						<div className="w-10 h-10 gradient-hero rounded-xl flex items-center justify-center">
							{isClient ? (
								<FontAwesomeIcon icon={faRobot} className="text-white text-xl" />
							) : (
								<span className="text-white text-xl font-bold">H</span>
							)}
						</div>
						<span className="text-2xl font-bold text-gray-800">HanaCare</span>
					</Link>
					<div className="hidden md:flex items-center gap-8">
						<Link
							href="/features"
							className={`transition-colors font-medium ${
								activeLink === "features"
									? "text-brand-cyan font-semibold"
									: "text-gray-600 hover:text-brand-cyan"
							}`}
						>
							Tính năng
						</Link>
						<Link
							href="/benefits"
							className={`transition-colors font-medium ${
								activeLink === "benefits"
									? "text-brand-cyan font-semibold"
									: "text-gray-600 hover:text-brand-cyan"
							}`}
						>
							Lợi ích
						</Link>
						<Link
							href="/about"
							className={`transition-colors font-medium ${
								activeLink === "about"
									? "text-brand-cyan font-semibold"
									: "text-gray-600 hover:text-brand-cyan"
							}`}
						>
							Về chúng tôi
						</Link>
						<Link
							href="/contact"
							className={`transition-colors font-medium ${
								activeLink === "contact"
									? "text-brand-cyan font-semibold"
									: "text-gray-600 hover:text-brand-cyan"
							}`}
						>
							Liên hệ
						</Link>
					</div>
					<div className="flex items-center gap-4">
						<button className="px-6 py-3 gradient-button text-white font-semibold rounded-xl shadow-brand hover:shadow-lg transition-all transform hover:scale-105">
							Tải App
						</button>
					</div>
				</div>
			</nav>
		</header>
	);
}

