import Head from 'next/head';
import Providers from '@/Provider';
import React from 'react';

function MyApp({Component, pageProps}) {
	return (
		<>
			<Head>
				<meta charSet='UTF-8' />
				<meta name='viewport' content='width=device-width' />
				<title>Fabric</title>
			</Head>

			<Providers>
				<Component {...pageProps} />
			</Providers>
		</>
	);
}

export default MyApp;
