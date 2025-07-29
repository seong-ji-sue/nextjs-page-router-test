import Axios from '@nextpr/client-common/axios';
import {DefaultComponent} from '@nextpr/client-common/components';
import {bffReqApi} from '@nextpr/client-common/api';
import FindAll from '@/components/FindAll';

const Index = ({baseUrl}) => {
	if (baseUrl && Axios.defaults.baseURL != baseUrl) {
		console.log(baseUrl);
		Axios.defaults.baseURL = baseUrl;
	}

	const api = bffReqApi.users;

	const props = {
		api: api,
	};

	return (
		<div>
			<FindAll {...props} />
			<DefaultComponent />
		</div>
	);
};

export default Index;

export const getServerSideProps = async () => {
	return {props: {baseUrl: process.env.NEXT_PUBLIC_TABLE_URL}};
};
