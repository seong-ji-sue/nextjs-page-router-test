import {useRecoilState} from 'recoil';
import {authState} from '@nextpr/common/store';

export default function Home() {
	const [auth] = useRecoilState(authState);

	return (
		<div style={{padding: '40px'}}>
			<h1>메인 페이지</h1>
			<p>
				로그인된 사용자: <b>{auth.id}</b>
			</p>
		</div>
	);
}
