import { useEffect } from 'react';

// copy from jquery-3.5.1.js dome ready
function readyTimeout(callback: () => void) {
	const timeout = window.setTimeout(callback);
	return () => {
		clearTimeout(timeout);
	};
}

function readyDOMContentLoaded(callback: () => void) {
	const unbind = () => {
		document.removeEventListener('DOMContentLoaded', completed);
		window.removeEventListener('load', completed);
	};
	const completed = () => {
		unbind();
		callback();
	};
	document.addEventListener('DOMContentLoaded', completed);
	window.addEventListener('load', completed);
	return unbind;
}

function docReady(callback: () => void) {
	if (
		document.readyState === 'complete' ||
		(document.readyState !== 'loading' && !document.documentElement.doScroll)
	) {
		return readyTimeout(callback);
	}
	return readyDOMContentLoaded(callback);
}

export default function useDomReady(callback: () => void) {
	useEffect(() => {
		const unmount = docReady(callback);
		return () => {
			unmount();
		};
	}, []);
}
