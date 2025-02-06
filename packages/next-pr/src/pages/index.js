import {useRouter} from 'next/router';
import Link from 'next/link';
import {adds} from '@nextpr/common';

const posts = [
	{id: 1, slug: 1, title: '1페이지'},
	{id: 2, slug: 2, title: '2페이지'},
	{id: 3, slug: 3, title: '3페이지'},
];

export default function Home() {
	const router = useRouter();

	return (
		<div>
			ssr 프로젝트 입니다
			<div>{adds(1, 1)}</div>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<Link
							href={{
								pathname: '/test/[slug]',
								query: {slug: post.slug},
							}}
						>
							{post.title}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
