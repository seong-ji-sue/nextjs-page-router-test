const {join} = require('path');
const {NextFederationPlugin} = require('@module-federation/nextjs-mf');
const dotenv = require('dotenv');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

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
