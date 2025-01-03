import {useRouter} from 'next/router';

const Index = () => {
	const router = useRouter();
	console.log('id', router.query.id, router.pathname);
	return <div>param [id]: {router.query.id}</div>;
};
export default Index;
