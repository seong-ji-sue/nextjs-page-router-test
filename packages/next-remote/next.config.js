const {join} = require('path');
const {NextFederationPlugin} = require('@module-federation/nextjs-mf');
const dotenv = require('dotenv');

dotenv.config({path: join(__dirname, `../../.env.${process.env.NODE_ENV}`)});

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
					name: 'remote',
					filename: 'static/chunks/remoteEntry.js',
					exposes: {
						'./Test': './src/pages/test/index.js',
					},
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
						key: 'Access-Control-Allow-Origin',
						value: process.env.NEXT_PUBLIC_HOST_URL,
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
				],
			},
		];
	},
	publicRuntimeConfig: {},
	images: {domains: ['*'], minimumCacheTTL: 60},
	sassOptions: {includePaths: [join(__dirname, 'styles')]},
	experimental: {
		optimizePackageImports: [],
	},
	transpilePackages: [],
};

module.exports = config;
