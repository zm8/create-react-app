import { useEffect, useRef } from 'react';

// 页面卸载调用
export default function useIsUnmount() {
	const isUnmount =  useRef(false);
	useEffect(() => {
		return () => {
			isUnmount.current = true;
		};
	}, []);

	return isUnmount.current;
}
