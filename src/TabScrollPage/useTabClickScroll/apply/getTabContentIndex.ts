import { TabCntList } from '../type';

type GetTabContentIndex = {
	tabCntList: TabCntList;
	scrollTop: number;
	windowInnerHeight: number;
};

// 获取对应的Tab Content index
const getTabContentIndex = ({
	tabCntList,
	scrollTop,
	windowInnerHeight,
}: GetTabContentIndex) => {
	// 获取所有在 window 窗口里的元素
	const getItemsInWindow = () => {
		return tabCntList.filter((item) => {
			const t1 = item.offsetTop - windowInnerHeight;
			const t2 = item.offsetTop;
			return scrollTop > t1 && scrollTop < t2 + item.offsetHeight;
		});
	};
	const listInWindow = getItemsInWindow();

	// 获取所有tag为0, 还没过自身高度的1/3的元素
	const topNotOver = (list: TabCntList) => {
		return list.filter(
			(item) =>
				item.tag === 0 && scrollTop < item.top + item.marginTop + item.offsetHeight / 3
		);
	};

	const notOverList = topNotOver(listInWindow);
	if (notOverList[0]) {
		return notOverList[0].index;
	}

	// 获取所有tag为1, 已经过自己一半的元素( Math.min(window.innerHeight/2, 元素自身高度/2) )
	const bottomOverMiddle = (list: TabCntList) => {
		return list.filter(
			(item) =>
				item.tag === 1 &&
				scrollTop >
					item.offsetTop -
						windowInnerHeight +
						Math.min(windowInnerHeight / 2, item.offsetHeight / 2)
		);
	};
	const overMiddleList = bottomOverMiddle(listInWindow);
	if (overMiddleList[overMiddleList.length - 1]) {
		return overMiddleList[overMiddleList.length - 1].index;
	}

	// 如果都有没有, 则取 getItemsInWindow 的第1个
	if (listInWindow[0]) {
		return listInWindow[0].index;
	}

	// 如果都没有, 则取第0个
	return 0;
};

export default getTabContentIndex;
