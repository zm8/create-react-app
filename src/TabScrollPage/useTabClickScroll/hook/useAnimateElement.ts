import { useCallback, useEffect, useRef } from 'react';
import { useUnmount } from '.';

type El = HTMLElement | undefined | null;
type AnimateCallback = (el: El, timestamp: number) => void | true;

const requestAnimationFrame =
	window.requestAnimationFrame || (window as any).webkitRequestAnimationFrame;
const cancelAnimationFrame =
	window.cancelAnimationFrame || (window as any).webkitCancelAnimationFrame;

const map = new window.Map();
export default function useAnimateElement() {
	// dom元素 做动画
	const aniMap = useRef<Map<HTMLElement, number>>(map);

	const animateElement = useCallback(
		(el: El, callback: AnimateCallback, { speed = 1.5 } = {}) => {
			if (!el) return;
			const elCur = el;
			cancelAnimation(elCur);
			let start: number;
			function step(timestamp: number) {
				if (!start) {
					start = timestamp;
				}
				const elapsed = (timestamp - start) * speed;
				const res = callback(elCur, elapsed);
				// 如果函数返回了 true, 则停止动画
				if (res) {
					cancelAnimation(elCur);
					return;
				}
				startStep(step);
			}
			const startStep = (step: FrameRequestCallback) => {
				const requestID = requestAnimationFrame(step);
				aniMap.current.set(elCur, requestID);
			};
			startStep(step);
		},
		[]
	);

	const cancelAnimation = useCallback((el: El) => {
		if (!el) return;
		const requestID = aniMap.current.get(el);
		if (!requestID) return;
		cancelAnimationFrame(requestID);
		aniMap.current.delete(el);
	}, []);

	const cancelAllAnimation = useCallback(() => {
		for (const [el] of aniMap.current) {
			cancelAnimation(el);
		}
		aniMap.current.clear();
	}, []);

	// 卸载页面, 取消所有动画
	useUnmount(() => {
		cancelAllAnimation();
	});

	return {
		animateElement,
		cancelAnimation,
		cancelAllAnimation,
	};
}
