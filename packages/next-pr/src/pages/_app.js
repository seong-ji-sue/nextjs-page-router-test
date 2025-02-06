import Layout from '@components/Layout';
import '../styles/index.scss';

const App = ({Component, pageProps}) => {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<>
			{Component.getLayout ? (
				getLayout(<Component {...pageProps} />)
			) : (
				<Layout>
					<Component {...pageProps} />
				</Layout>
			)}
		</>
	);
};

export default App;
