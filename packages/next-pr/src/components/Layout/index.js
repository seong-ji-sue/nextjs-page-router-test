import styles from './Layout.module.scss';
import Header from '@components/Layout/Header';
import Nav from '@components/Layout/Nav';

const Layout = ({children}) => {
	return (
		<div className={styles.gridContainer}>
			<Header>헤더</Header>
			<Nav>메뉴</Nav>
			<main className={styles.contentContainer}>{children}</main>
		</div>
	);
};

export default Layout;
