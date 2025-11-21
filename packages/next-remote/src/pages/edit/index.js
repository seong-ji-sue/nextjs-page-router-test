import Axios from '@nextpr/common/axios';
import {bffReqApi} from '@nextpr/common/api';
import {DefaultComponent} from '@nextpr/common/components';
import Editor from '@/components/edit/Editor';

const Index = ({baseUrl}) => {
	if (baseUrl && Axios.defaults.baseURL != baseUrl) {
		console.log(baseUrl);
		Axios.defaults.baseURL = baseUrl;
	}

	const api = bffReqApi.test;

	const props = {
		api: api,
	};

	return (
		<div>
			<Editor {...props} />
			<DefaultComponent />
		</div>
	);
};

export default Index;

export const getServerSideProps = async () => {
	return {props: {baseUrl: process.env.NEXT_PUBLIC_REMOTE_URL}};
};
