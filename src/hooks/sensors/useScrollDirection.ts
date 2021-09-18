import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useUnmount } from '..';
import useGetDocumentScrollElement from './useGetDocumentScrollElement';
import usePreviousValue from '../state/usePreviousValue';

type ScrollDirection = 'top' | 'bottom' | 'left' | 'right' | undefined;

export default function useScrollDirection(el: Element | string) {
	const documentScrollElement = useGetDocumentScrollElement();
	const [scrollTop, setScrollTop] = useState(0);
	const [scrollLeft, setScrollLeft] = useState(0);
	const scrollDirection = useRef<ScrollDirection>(); // 滚动方向
	const scrollTopPre = usePreviousValue<number>(scrollTop);
	const scrollLeftPre = usePreviousValue<number>(scrollLeft);
	const SCROlll_TIME = 50;
	const SET_UNDEFINED_TIME = SCROlll_TIME * 2;
	const $el = useRef<Element | null | undefined>();

	const setScrollDirection = useCallback((direction: ScrollDirection) => {
		scrollDirection.current = direction;
	}, []);

	const onSetDirectionUndefined = useCallback(
		_.debounce(() => {
			setScrollDirection(undefined);
		}, SET_UNDEFINED_TIME),
		[setScrollDirection]
	);

	const onSetScrollValue = useCallback(
		_.throttle(() => {
			if (!$el.current) return;
			setScrollTop($el.current.scrollTop);
			setScrollLeft($el.current.scrollLeft);
			onSetDirectionUndefined();
		}, SCROlll_TIME),
		[setScrollTop]
	);

	useEffect(() => {
		$el.current = typeof el === 'string' ? document.querySelector(el) : el;
	}, []);

	useEffect(() => {
		if (!$el.current) return;
		const $elEvt = $el.current === documentScrollElement ? window : $el.current;
		const onScroll = () => {
			onSetScrollValue();
		};
		window.addEventListener('resize', onScroll);
		$elEvt.addEventListener('scroll', onScroll);
		return () => {
			if (!$el.current) return;
			window.removeEventListener('resize', onScroll);
			$elEvt.removeEventListener('scroll', onScroll);
		};
	}, []);

	useEffect(() => {
		if (scrollTopPre === undefined) return;
		if (scrollTop - scrollTopPre > 0) {
			setScrollDirection('bottom');
			return;
		}
		if (scrollTop - scrollTopPre < 0) {
			setScrollDirection('top');
			return;
		}
	}, [scrollTop, scrollTopPre]);

	useEffect(() => {
		if (scrollLeftPre === undefined) return;
		if (scrollLeft - scrollLeftPre > 0) {
			setScrollDirection('right');
			return;
		}
		if (scrollLeft - scrollLeftPre < 0) {
			setScrollDirection('left');
			return;
		}
	}, [scrollLeft, scrollLeftPre]);

	useUnmount(() => {
		onSetScrollValue.cancel();
		onSetDirectionUndefined.cancel();
	});

	return scrollDirection.current;
}
