// import '@eddy-ui/client-common/color';
// import '@eddy-ui/client-common/global-style';

import React, {ReactElement, Suspense} from 'react';
import Head from 'next/head';
import {init} from '@module-federation/runtime';
import getConfig from 'next/config';
const {publicRuntimeConfig} = getConfig();

init({
	name: 'host',
	remotes: [
		{
			name: `remote`,
			entry: `${publicRuntimeConfig.remote}/_next/static/chunks/remoteEntry.js`,
		},
	],
});

function MyApp({Component, pageProps}) {
	return (
		<>
			<Head>
				<meta charSet='UTF-8' />
				<meta name='viewport' content='width=device-width' />
				<title>Fabric</title>
			</Head>

			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
