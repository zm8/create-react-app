import { useState } from 'react';
import useOnWindowResize from '../listen/useOnWindowResize';

// 获取 window 相关属性
export default function useGetWindowProps() {
	const getWinProps = () => {
		return {
			windowInnerWidth: window.innerWidth,
			windowInnerHeight: window.innerHeight,
		};
	};
	const [obj, setObj] = useState(getWinProps);
	useOnWindowResize(() => {
		setObj(getWinProps);
	}, 100);
	return obj;
}
