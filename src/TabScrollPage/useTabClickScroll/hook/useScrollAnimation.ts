import { useCallback } from 'react';
import useAnimateElement from './useAnimateElement';

export default function useScrollAnimation() {
	const { animateElement } = useAnimateElement();
	// dom元素 滚动
	const elementScroll = useCallback(
		(
			el: HTMLElement | undefined | null,
			left: number,
			top: number,
			done?: () => void
		) => {
			if (!el) return;
			let leftCur = el.scrollLeft;
			let topCur = el.scrollTop;
			const isToLeft = left - leftCur;
			const isToTop = top - topCur;
			let isNextFrameStop = false;
			const aniCallback = (
				el: HTMLElement | undefined | null,
				timestamp: number
			): void | true => {
				if (!el) return;
				if (isNextFrameStop) {
					done && done();
					return true;
				}
				if (isToLeft !== 0) {
					if (isToLeft < 0) {
						timestamp = -timestamp;
					}
					leftCur += timestamp * 0.1;
					if (isToLeft > 0) {
						leftCur = Math.min(left, leftCur);
					} else {
						leftCur = Math.max(left, leftCur);
					}
				}
				if (isToTop !== 0) {
					if (isToTop < 0) {
						timestamp = -timestamp;
					}
					topCur += timestamp * 0.1;
					if (isToTop > 0) {
						topCur = Math.min(top, topCur);
					} else {
						topCur = Math.max(top, topCur);
					}
				}
				el.scroll(leftCur, topCur);
				if (left === leftCur && top === topCur) {
					isNextFrameStop = true;
				}
			};
			animateElement(el, aniCallback);
		},
		[animateElement]
	);

	return {
		elementScroll,
	};
}
