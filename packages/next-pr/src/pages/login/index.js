import React, {useState} from 'react';
import styles from './login.module.scss';
import {useRouter} from 'next/router';

function Index(props) {
	const router = useRouter();
	const [loginInfo, setLoginInfo] = useState();

	const onChange = (e) => {
		// setLoginInfo(e.target.value);
	};

	const onSubmit = () => {};

	return (
		<div className={styles.loginContainer}>
			<div className={styles.loginBox}>
				<input type={'text'} />
				<input type={'text'} />
				<button
					onClick={() => {
						router.push('/');
					}}
				>
					로그인
				</button>
			</div>
		</div>
	);
}

export default Index;

Index.getLayout = (page) => {
	return <div>{page}</div>;
};
