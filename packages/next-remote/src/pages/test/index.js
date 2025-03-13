const Index = () => {
	return <div>test</div>;
};

export default Index;

export async function getServerSideProps() {
	return {props: {baseUrl: process.env.NEXT_PUBLIC_REMOTE_URL}};
}
