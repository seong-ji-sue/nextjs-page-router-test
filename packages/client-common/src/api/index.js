import {compile} from 'path-to-regexp';

export const regExpToPathConvertor = (path, options) => {
	const compiler = compile(path);

	return compiler(options);
};

export const bffReqApi = Object.freeze({
	users: '/api/users',
});

export const reqApiKeys = Object.freeze({
	users: {key: 'users'},
});
