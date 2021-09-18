import { useRef } from 'react';

// 正确的规范应该使用 document.documentElement 进行滚动
const scrollingElement =
	document.scrollingElement === document.body ? document.body : document.documentElement;
export default function useGetDocumentScrollElement() {
	const ref = useRef(scrollingElement);
	return ref.current;
}
