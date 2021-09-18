import { useEffect, useRef } from 'react';

export default function usePreviousValue<T>(value: T): T | undefined {
	const cache = useRef<T | undefined>(undefined);
	useEffect(() => {
		cache.current = value;
	}, [value]);
	return cache.current;
}
