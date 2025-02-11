const {join} = require('path');
const {NextFederationPlugin} = require('@module-federation/nextjs-mf');
const dotenv = require('dotenv');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true', // ANALYZE 환경변수 활성화 시 동작
});

dotenv.config({path: join(__dirname, `../../.env.${process.env.NODE_ENV}`)});

const config = withBundleAnalyzer({
	output: 'standalone',
	reactStrictMode: false,
	swcMinify: true,
	optimization: {
		runtimeChunks: true,
		splitChunks: {
			chunks: 'all',
		},
	},
	images: {domains: ['*'], minimumCacheTTL: 60},
	sassOptions: {includePaths: [join(__dirname, 'styles')]},
	webpack: (config, {isServer}) => {
		if (!isServer) {
			config.plugins.push(
				new NextFederationPlugin({
					name: 'client',
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
	publicRuntimeConfig: {},
	experimental: {
		optimizePackageImports: [],
	},
	transpilePackages: [],
});

module.exports = config;
