const {join} = require('path');
const {NextFederationPlugin} = require('@module-federation/nextjs-mf');
const dotenv = require('dotenv');

dotenv.config({path: join(__dirname, `../../.env.${process.env.NODE_ENV}`)});

console.log('NODE_ENV-webpack', process.env.NODE_ENV);
console.log('NEXT_PUBLIC_HOST_URL--webpack', process.env.NEXT_PUBLIC_HOST_URL);

const config = {
	output: 'standalone',
	reactStrictMode: false,
	swcMinify: true,
	webpack: (config, {isServer}) => {
		if (!isServer) {
			config.resolve.fallback = {
				dns: false,
				net: false,
				tls: false,
			};
			config.plugins.push(
				new NextFederationPlugin({
					name: 'host',
					filename: 'static/chunks/remoteEntry.js',
					shared: {
						'next/navigation': {singleton: true},
						'next/router': {singleton: true},
						recoil: {singleton: true},
						react: {singleton: true},
					},
				}),
			);
		}
		return config;
	},
	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Access-Control-Allow-Methods',
						value: 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
					},
					{key: 'Access-Control-Allow-Credentials', value: 'true'},
					{
						key: 'Access-Control-Allow-Headers',
						value: 'Content-Range, Content-Type, Authorization',
					},
					{
						key: 'Access-Control-Expose-Headers',
						value: 'Content-Range, Content-Type, Authorization',
					},
					{key: 'X-XSS-Protection', value: '1; mode=block'},
					{key: 'X-Content-Type-Options', value: 'nosniff'},
					{key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
				],
			},
		];
	},
	publicRuntimeConfig: {
		remote: process.env.NEXT_PUBLIC_REMOTE_URL,
	},
	images: {domains: ['*'], minimumCacheTTL: 60},
	sassOptions: {includePaths: [join(__dirname, 'styles')]},
	experimental: {
		optimizePackageImports: [],
	},
	transpilePackages: [],
};

module.exports = config;
