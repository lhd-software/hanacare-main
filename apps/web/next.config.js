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
			{
				protocol: "https",
				hostname: "img.hanacare.vn",
				pathname: "/**",
			},
		],
		domains: [
			"storage.googleapis.com",
			"assets.hanacare.vn",
			"img.hanacare.vn"
		],
		unoptimized: false,
	},
};

module.exports = nextConfig;