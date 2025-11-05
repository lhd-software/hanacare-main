"use client";

import { useEffect } from "react";

export default function FontAwesomeHead() {
	useEffect(() => {
		// Check if Font Awesome is already loaded
		if (document.querySelector('link[href*="font-awesome"]')) {
			return;
		}

		// Create and inject Font Awesome CSS link
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
		link.crossOrigin = "anonymous";
		link.referrerPolicy = "no-referrer";
		link.media = "all";
		document.head.appendChild(link);
	}, []);

	return null;
}

