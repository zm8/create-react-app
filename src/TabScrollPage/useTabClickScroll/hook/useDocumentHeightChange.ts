// 监听 document height 变化
import { useEffect, useRef } from 'react';
import useDomReady from './useDomReady';
const getDocumentHeight = () => document.documentElement.scrollHeight;

export default function useDocumentHeightChange(fn: () => void) {
	const docHeightPre = useRef<number>();
	useDomReady(() => {
		docHeightPre.current = getDocumentHeight();
	});
	useEffect(() => {
		const preHeight = docHeightPre.current;
		if (!preHeight) return;
		const curHeight = getDocumentHeight();
		docHeightPre.current = curHeight;
		if (preHeight !== curHeight) {
			fn();
		}
	});
}
