import { useReducer } from 'react';

// 强制更新
export default function useForceUpdate() {
	return useReducer((v: number) => v + 1, 0);
}
