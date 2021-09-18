import _ from 'lodash';
import { useEffect } from 'react';

// window Resize 监听
export default function useWindowResize(resizeCallback: () => void, wait: number) {
	useEffect(() => {
		const onResize = _.throttle(() => {
			resizeCallback();
		}, wait);
		window.addEventListener('resize', onResize);
		return () => {
			onResize.cancel();
			window.removeEventListener('resize', onResize);
		};
	}, []);
}
