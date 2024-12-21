import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	images: {
		domains: [
			'fakestoreapi.com',
			'thispersondoesnotexist.com',
			'this-person-does-not-exist.com'
		]
	}
}

export default nextConfig
