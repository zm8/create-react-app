import { useEffect, useRef, useState } from 'react';
import getTabContentIndex from './apply/getTabContentIndex';
import _ from 'lodash';
import { addElementClass, getElementProps, removeElementListClass } from './apply/util';
import { IPara, TabItem, TabCntList, TabItemList, Element, ElementList } from './type';
import {
	useDocumentHeightChange,
	useElementScroll,
	useForceUpdate,
	useGetWindowProps,
	useScrollAnimation,
} from './hook';
import useScrollDirection from './hook/useScrollDirection';
import usePreviousValue from './hook/usePreviousValue';
import useGetDocumentScrollElement from './hook/useGetDocumentScrollElement';

const useTabClickScroll = ({
	tabBoxClass,
	tabItemClass,
	tabLineClass,
	tabItemClassSelect,
	tabContentClass,
}: IPara) => {
	const $tabBox = useRef<Element>();
	const $tabItemList = useRef<ElementList>([]);
	const $tabLine = useRef<Element>();
	const $tabCntList = useRef<ElementList>([]);
	const tabItemList = useRef<TabItemList>([]);
	const tabCntList = useRef<TabCntList>([]);
	const documentScrollElement = useGetDocumentScrollElement();
	// 调用 useScrollDirection 最好在 useElementScroll 上,
	// 目前由于 useScrollDirection 里有个滚动停止时重置 ScrollDirection 为 undefined,
	// 所以不放在上面也行
	const windowScrollDirection = useScrollDirection(documentScrollElement);
	const {
		scrollTop: windowScrollTop,
		lockScroll: lockWindowScroll,
		unLockScroll: unLockWindowScroll,
	} = useElementScroll(documentScrollElement);
	const { scrollLeft: tabBoxScrollLeft } = useElementScroll(tabBoxClass);
	const { windowInnerHeight, windowInnerWidth } = useGetWindowProps();
	const [contentIndex, setContentIndex] = useState(0);
	const contentIndexPre = usePreviousValue(contentIndex);
	const { elementScroll } = useScrollAnimation();
	const [docHeightKey, updateDocHeightKey] = useForceUpdate();

	// Tab Item List 属性存储
	const setTabItemList = () => {
		tabItemList.current = $tabItemList.current.map((item, index) => {
			const { offsetWidth, offsetLeft } = item;
			const paddingLeft = _.parseInt(getElementProps(item, 'padding-left') ?? '0');
			const paddingRight = _.parseInt(getElementProps(item, 'padding-right') ?? '0');
			const marginLeft = _.parseInt(getElementProps(item, 'margin-left') ?? '0');
			const marginRight = _.parseInt(getElementProps(item, 'margin-right') ?? '0');
			const isBorderBox = getElementProps(item, 'box-sizing') === 'border-box';
			let width = _.parseInt(getElementProps(item, 'width') ?? '0');
			// 如果是 border-box, 则剔除掉 paddingLeft 和 paddingRight
			width = isBorderBox ? width - paddingLeft - paddingRight : width;
			const center = offsetLeft + paddingLeft + width / 2;
			return {
				index,
				width,
				paddingLeft,
				paddingRight,
				marginLeft,
				marginRight,
				offsetWidth, // 包括 padding-left 和 padding-right
				offsetLeft, // (元素 + padding-left) 距离左侧窗口多少, 另外和是否设置 'box-sizing:border-box' 无关
				center,
			};
		});
	};

	// Tab Content List 属性存储
	const setTabCntList = (windowInnerHeight: number) => {
		if (!$tabBox.current) return;
		const tabBoxOffsetTop = $tabBox.current.offsetTop;
		const tabBoxHeight = $tabBox.current.offsetHeight;
		tabCntList.current = $tabCntList.current.map((item, index) => {
			const { offsetTop, offsetHeight } = item;
			const marginTop = _.parseInt(getElementProps(item, 'margin-top') ?? '0');
			const top = offsetTop - tabBoxHeight - tabBoxOffsetTop - marginTop;
			const isScrollFromBottom = offsetTop - windowInnerHeight >= 0;
			const tag = isScrollFromBottom ? 1 : 0; // 1 代表会从窗口底部滚上来, 0 代表在窗口里面
			return {
				index,
				tag,
				top,
				marginTop,
				offsetTop,
				offsetHeight, // 包含上下 padding, 若box-sizing 是 border-box, 则和height一样
			};
		});
	};

	// 设置选中哪个 Tab Item
	const setTabIndex = (index: number) => {
		if ($tabItemList.current) {
			removeElementListClass($tabItemList.current, tabItemClassSelect);
			addElementClass($tabItemList.current[index], tabItemClassSelect);
		}
		if ($tabLine.current) {
			const tabLineWidth = $tabLine.current.offsetWidth;
			const tabItem = tabItemList.current[index];
			if (tabItem) {
				const translateLeft = tabItem.center - tabLineWidth / 2;
				$tabLine.current.style.transform = `translateX(${translateLeft}px)`;
			}
		}
	};

	// 设置 Tab Item 和 Tab Content 的 Index
	const setTabContentIndex = (index: number) => {
		setTabIndex(index);
		setContentIndex(index);
	};

	// 绑定点击 Tab Item
	const onClickTabItem = (index: number) => (_evt: HTMLElementEventMap['click']) => {
		if (tabCntList.current?.[index]) {
			// 注意这里不能 lock tabBox 的滚动
			lockWindowScroll();
			elementScroll(documentScrollElement, 0, tabCntList.current[index].top, () => {
				unLockWindowScroll();
			});
		}
		setTabContentIndex(index);
	};

	// Tab Item 绑定事件
	const bindEventTab = ($tabItemList: HTMLElement[]) => {
		const arrEvents: any[] = [...$tabItemList].map((_item, index) =>
			onClickTabItem(index)
		);
		$tabItemList.forEach((tabItem: HTMLElement, index) => {
			tabItem.addEventListener('click', arrEvents[index]);
		});
		// 返回解除绑定
		return () => {
			$tabItemList.forEach((tabItem: HTMLElement, index) => {
				tabItem.removeEventListener('click', arrEvents[index]);
			});
		};
	};

	// 初始化赋值 dom
	useEffect(() => {
		$tabBox.current = document.querySelector<HTMLElement>(tabBoxClass);
		$tabItemList.current = Array.from(document.querySelectorAll(tabItemClass));
		$tabLine.current = document.querySelector<HTMLElement>(tabLineClass);
		if ($tabLine.current) {
			$tabLine.current.style.display = 'block';
		}
		$tabCntList.current = Array.from(document.querySelectorAll(tabContentClass));
	}, []);

	// Tab Item 绑定事件
	useEffect(() => {
		const unBindEventTab = bindEventTab($tabItemList.current);
		return () => {
			unBindEventTab();
		};
	}, []);

	// 设置存储 Tab Item
	useEffect(() => {
		setTabItemList();
	}, []);

	// 设置存储 Tab Item 和 Tab Content 的相关属性
	useEffect(() => {
		setTabCntList(windowInnerHeight);
	}, [docHeightKey, windowInnerHeight]);

	// 监听页面滚动
	useEffect(() => {
		if (!tabCntList.current.length) return;
		const contentIndex = getTabContentIndex({
			tabCntList: tabCntList.current,
			scrollTop: windowScrollTop,
			windowInnerHeight,
		});
		if (!windowScrollDirection) {
			setTabContentIndex(contentIndex);
			return;
		}
		if (
			!_.isUndefined(contentIndexPre) &&
			((contentIndex > contentIndexPre && windowScrollDirection === 'bottom') ||
				(contentIndex < contentIndexPre && windowScrollDirection === 'top'))
		) {
			setTabContentIndex(contentIndex);
		}
	}, [docHeightKey, windowScrollTop, windowInnerHeight]);

	// 控制 Tab Item Box 滚动
	useEffect(() => {
		if (!$tabBox.current || !tabItemList.current.length) return;
		const tabItem = tabItemList.current[contentIndex];
		const scrollLeft =
			tabItem.offsetLeft - windowInnerWidth / 2 + tabItem.paddingLeft + tabItem.width / 2;
		elementScroll($tabBox.current, scrollLeft, 0);
	}, [contentIndex, windowInnerWidth]);

	useDocumentHeightChange(() => {
		updateDocHeightKey();
	});

	const getTabBoxScrollLeft = (tabItem: TabItem) =>
		tabItem.offsetLeft + tabItem.paddingLeft + tabItem.width / 2;

	const [isShowLeftShadow, setIsShowLeftShadow] = useState(false);
	// 是否显示 左边阴影
	useEffect(() => {
		const tabItem = _.first(tabItemList.current);
		if (!tabItem) return;
		const isShowLeftShadow = tabBoxScrollLeft > getTabBoxScrollLeft(tabItem);
		setIsShowLeftShadow(isShowLeftShadow);
	}, [tabBoxScrollLeft]);

	const [isShowRightShadow, setIsShowRightShadow] = useState(false);
	// 是否显示 右边阴影
	useEffect(() => {
		const tabItem = _.last(tabItemList.current);
		if (!tabItem) return;
		const isShowRightShadow =
			tabBoxScrollLeft < getTabBoxScrollLeft(tabItem) - windowInnerWidth;
		setIsShowRightShadow(isShowRightShadow);
	}, [tabBoxScrollLeft, windowInnerWidth]);

	return {
		isShowLeftShadow,
		isShowRightShadow,
	};
};

export default useTabClickScroll;
