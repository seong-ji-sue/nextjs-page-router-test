const Dotenv = require('dotenv-webpack');
const {join} = require('path');

module.exports = {
	output: 'standalone',
	reactStrictMode: true,
	pageExtensions: ['js', 'jsx'],

	webpack: (config) => {
		config.plugins.push(new Dotenv({path: `../../config/.env.development`}));
		return config;
	},
	images: {
		domains: ['localhost', '*'],
		minimumCacheTTL: 60,
	},
	sassOptions: {
		includePaths: [join(__dirname, 'styles')],
	},
};
