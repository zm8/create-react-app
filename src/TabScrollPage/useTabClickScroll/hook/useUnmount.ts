import { useEffect } from 'react';

// 页面卸载调用
export default function useUnmount(fn: () => void) {
	useEffect(() => {
		return () => {
			fn();
		};
	}, []);
}
