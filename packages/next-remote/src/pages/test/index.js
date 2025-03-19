const Index = () => {
	return <div>remote test</div>;
};

export default Index;

export async function getServerSideProps() {
	return {props: {baseUrl: process.env.NEXT_PUBLIC_REMOTE_URL}};
}
