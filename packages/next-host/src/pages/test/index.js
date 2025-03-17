import React, {lazy} from 'react';
import {loadRemote} from '@module-federation/runtime';

const Component =
	typeof window !== 'undefined'
		? lazy(() => loadRemote('remote/Test'))
		: () => null;

const Index = ({kmsUrl}) => {
	return <Component baseUrl={kmsUrl} />;
};

export default Index;

export async function getServerSideProps() {
	console.log('NODE_ENV-test', process.env.NODE_ENV);
	console.log('NEXT_PUBLIC_HOST_URL--test', process.env.NEXT_PUBLIC_HOST_URL);
	return {props: {remoteUrl: process.env.NEXT_PUBLIC_REMOTE_URL}};
}
