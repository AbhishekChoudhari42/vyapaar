/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, 
    images:{
        remotePatterns: [
			{
				hostname: "lh3.googleusercontent.com",
				protocol: "https",
			}
		]
    }
}

module.exports = nextConfig
