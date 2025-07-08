import Nav from '@/components/Layout/Nav';
import Header from '@/components/Layout/Header';

const Layout = ({children}) => {
	return (
		<div>
			<div>{children}</div>
			<Nav />
			<Header />
		</div>
	);
};

export default Layout;
