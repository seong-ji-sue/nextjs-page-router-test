import React, {lazy} from 'react';
import {loadRemote} from '@module-federation/runtime';

const Component = process.browser
	? lazy(() => loadRemote('remote/Test'))
	: () => null;

const Index = ({kmsUrl}) => {
	return <Component baseUrl={kmsUrl} />;
};

export default Index;

export async function getServerSideProps() {
	return {props: {remoteUrl: process.env.NEXT_PUBLIC_REMOTE_URL}};
}
