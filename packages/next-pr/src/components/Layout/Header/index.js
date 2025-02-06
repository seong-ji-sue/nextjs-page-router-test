import React, {useReducer} from 'react';
import styles from './Header.module.scss';
import {useRouter} from 'next/router';

function Header(props) {
	const router = useRouter();

	return (
		<div className={styles.headerContainer}>
			헤더
			<div
				className={styles.login}
				onClick={() => {
					router.push('login');
				}}
			>
				로그인
			</div>
		</div>
	);
}

export default Header;
