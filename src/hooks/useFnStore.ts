import { useMemoizedFn } from 'ahooks';
import { useEffect, useRef } from 'react';

export default function useFnStore(callback: any) {
	const ref = useRef<any>([]);
	const fnMemo = useMemoizedFn(callback);
	useEffect(() => {
		ref.current.push(fnMemo);
	}, []);
	ref.current.forEach((fn: any) => fn());
}
