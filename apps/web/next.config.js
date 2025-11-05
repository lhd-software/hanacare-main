/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	transpilePackages: ["@hanacare/shared"],
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "storage.googleapis.com",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "assets.hanacare.vn",
				pathname: "/**",
			},
		],
		domains: [
			"storage.googleapis.com",
			"assets.hanacare.vn"
		],
		unoptimized: false,
	},
};

module.exports = nextConfig;