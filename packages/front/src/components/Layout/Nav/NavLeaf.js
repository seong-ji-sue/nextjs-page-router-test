'use client';

import React from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';

const exceptions = [];

const NavLeaf = ({title, url, deep}) => {
	// const nav = useRecoilValue(navState);
	const pathname = usePathname();
	const isSelected = exceptions.includes(url);
	const onClickNav = (e) => {
		if (pathname === url) e.preventDefault();
	};

	return (
		<div>
			<Link key={title} href={{pathname: url}} onClick={onClickNav}>
				<div>{title}</div>
			</Link>
		</div>
	);
};

export default NavLeaf;
