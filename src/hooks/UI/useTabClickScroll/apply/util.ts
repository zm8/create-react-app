// 获取元素的属性值
export const getElementProps = (el: HTMLElement, proptyValue: string) => {
	if (!el) return;
	return window.getComputedStyle(el).getPropertyValue(proptyValue);
};

// 增加元素 className
export const addElementClass = (el: HTMLElement, className: string) => {
	el.classList.add(className);
};

// 移除元素 className
export const removeElementClass = (el: HTMLElement, className: string) => {
	el.classList.remove(className);
};

// 移除 element list 的 class
export const removeElementListClass = (nodeList: HTMLElement[], className: string) => {
	nodeList.forEach((item) => {
		removeElementClass(item, className);
	});
};
