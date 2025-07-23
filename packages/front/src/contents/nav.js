import {urlPath} from '@nextpr/common/contents';

export const navContent = [
	{
		title: urlPath.label,
		url: urlPath.path,
	},
	{
		title: urlPath.table.label,
		base: urlPath.table.path,
		content: [
			{
				title: urlPath.table.basic.label,
				url: urlPath.table.basic.path,
			},
		],
	},
];
