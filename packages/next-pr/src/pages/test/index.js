const Index = ({baseUrl}) => {
	return <div>{baseUrl}test</div>;
};
export default Index;

export async function getServerSideProps() {
	return {props: {baseUrl: 'test 페이지 입니다.'}};
}
