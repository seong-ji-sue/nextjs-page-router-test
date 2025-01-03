import {Html, Head, Main, NextScript} from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>{/* 여기에 웹폰트나 메타 태그를 추가할 수 있습니다 */}</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
