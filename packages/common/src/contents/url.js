import {titles} from './title';

export const urlPath = Object.freeze({
	path: '/',
	label: titles.home,
	table: {
		path: '/table',
		label: titles.table,
		basic: {
			path: '/table/basic',
			label: titles.table.basic,
		},
	},
});
