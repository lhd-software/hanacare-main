'use client';

import Image from "next/image";

export default function AvatarWithFallback({ src, alt, initials, className }: { src: string; alt: string; initials: string; className?: string }) {
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