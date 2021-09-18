import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';

// dom 元素Scroll 控制
export default function useElementScroll(el: Element | string) {
	const [scrollTop, setScrollTop] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const isLock = useRef<boolean>(false);
	const THROTTLE_TIME = 50;
	const $el = useRef<Element | null | undefined>();

	const setScrollValue = () => {
		if (!$el.current) return;
		setScrollTop($el.current.scrollTop);
		setScrollLeft($el.current.scrollLeft);
	};

	const onScroll = useCallback(
		_.throttle(() => {
			if (isLock.current) return;
			setScrollValue();
		}, THROTTLE_TIME),
		[setScrollTop]
	);

	useEffect(() => {
		$el.current = typeof el === 'string' ? document.querySelector(el) : el;
		setScrollValue();
	}, []);

	useEffect(() => {
		if (!$el.current) return;
		const $elEvt = $el.current === document.documentElement ? window : $el.current;
		window.addEventListener('resize', onScroll);
		$elEvt.addEventListener('scroll', onScroll);
		return () => {
			if (!$el.current) return;
			onScroll.cancel();
			window.removeEventListener('resize', onScroll);
			$elEvt.removeEventListener('scroll', onScroll);
		};
	}, []);

	// 滚动锁定
	const lockScroll = () => {
		onScroll.cancel();
		isLock.current = true;
	};

	// 滚动解锁
	const unLockScroll = () => {
		onScroll.cancel();
		isLock.current = false;
	};

	return {
		scrollTop,
		scrollLeft,
		lockScroll,
		unLockScroll,
	};
}
