import Head from 'next/head';
import React from 'react';

function MyApp({Component, pageProps}) {
	return (
		<>
			<Head>
				<meta charSet='UTF-8' />
				<meta name='viewport' content='width=device-width' />
				<title>Remote</title>
			</Head>

			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
