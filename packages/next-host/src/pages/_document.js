import {Html, Main, NextScript} from 'next/document';
import Head from 'next/head';

export default function Document() {
	return (
		<Html lang='en'>
			<Head />

			<body className={'main_area'}>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
