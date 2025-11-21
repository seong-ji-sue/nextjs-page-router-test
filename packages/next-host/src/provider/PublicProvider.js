import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import {authState} from '@nextpr/common/store'; // 본인 경로에 맞게 수정

const PublicProvider = ({children}) => {
	const router = useRouter();
	const auth = useRecoilValue(authState);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		if (auth?.id) {
			router.replace('/');
		} else {
			setIsReady(true);
		}
	}, [auth, router]);

	if (!isReady) {
		return null;
	}

	return <>{children}</>;
};

export default PublicProvider;
