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
		],
	},
};

module.exports = nextConfig;