'use client';

import {useCallback, useEffect, useState} from 'react';
import Axios from '@nextpr/common/axios';

const TestComponents = ({api}) => {
	const [data, setData] = useState([]);

	const getData = useCallback(async () => {
		try {
			const res = await Axios.get(api);
			console.log(res.data);
			setData(res?.data || []);
		} catch (e) {
			console.error(e);
			setData([]);
		}
	}, [api]);

	useEffect(() => {
		getData();
	}, [getData]);

	return (
		<div>
			{data.map((d) => (
				<ul key={d.name}>
					<li>{d.name}</li>
					<li>{d.description}</li>
				</ul>
			))}
		</div>
	);
};

export default TestComponents;
