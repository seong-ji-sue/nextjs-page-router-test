module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'next',
		'next/core-web-vitals',
		'prettier',
	],
	settings: {
		react: {
			version: 'detect',
		},
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		ecmaFeatures: {jsx: true},
	},
	plugins: ['react', 'prettier'],
	overrides: [
		{
			files: ['*.js', '*.jsx'],
			rules: {
				// JSX를 .js 파일에서도 사용할 수 있도록 허용
				'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],
				// prop-types 사용하지 않는다면 해당 규칙을 비활성화
				'react/prop-types': 'off',
			},
		},
		{
			env: {node: true},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {sourceType: 'script'},
		},
	],
	rules: {
		'prettier/prettier': 'error',
	},
};
