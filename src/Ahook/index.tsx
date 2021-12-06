import { useRequest } from 'ahooks';
import Mock from 'mockjs';
import React from 'react';

function getUsername(): Promise<string> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(Mock.mock('@name'));
		}, 1000);
	});
}

export default function Ahook({ num }: { num: number }) {
	const { data, error, loading } = useRequest(getUsername);

	if (error) {
		return <div>failed to load</div>;
	}
	if (loading) {
		return <div>loading...</div>;
	}
	return <div>Username: {data}</div>;
}
