import Nav from '@/components/Layout/Nav';
import Header from '@/components/Layout/Header';
import PrivateProvider from '@/provider/PrivateProvider';

const Layout = ({children}) => {
	return (
		<div>
			<div>{children}</div>
			<Nav />
			<Header />
		</div>
	);
};

export default PrivateProvider(Layout);
