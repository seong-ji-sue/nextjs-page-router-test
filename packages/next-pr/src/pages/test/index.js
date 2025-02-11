import {Button, DefaultComponent, TestCompo} from '@morollpack/components';

const Index = ({baseUrl}) => {
	return (
		<div>
			{baseUrl}test
			<Button />
			<DefaultComponent />
			<TestCompo />
		</div>
	);
};
export default Index;

export async function getServerSideProps() {
	return {props: {baseUrl: 'test 페이지 입니다.'}};
}
