export type IPara = {
	tabBoxClass: string;
	tabItemClass: string;
	tabLineClass: string;
	tabItemClassSelect: string;
	tabContentClass: string;
};
export type TabItem = Record<
	| 'index'
	| 'width'
	| 'paddingLeft'
	| 'paddingRight'
	| 'marginLeft'
	| 'marginRight'
	| 'offsetWidth'
	| 'offsetLeft'
	| 'center',
	number
>;
export type TabCnt = Record<
	'top' | 'marginTop' | 'offsetHeight' | 'index' | 'tag' | 'offsetTop',
	number
>;
export type TabItemList = TabItem[];
export type TabCntList = TabCnt[];
export type Element = HTMLElement | null | undefined;
export type ElementList = HTMLElement[];
