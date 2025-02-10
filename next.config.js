/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["imgnike-a.akamaihd.net"],
		remotePatterns: [
			{
				protocol: "https",
				hostname: "files.stripe.com",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;
