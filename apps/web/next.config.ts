import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	transpilePackages: ["@hanacare/shared"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "storage.googleapis.com",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
