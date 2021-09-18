import './index.scss';
import useTabClickScroll from './useTabClickScroll/';
import React, { useEffect, useReducer, useState } from 'react';

export default function TabScrollPage() {
	const [tabCnt, setTabCnt] = useState('本日状态');
	const [cntKey, updateCntKey] = useReducer((v) => v + 1, 0);
	useEffect(() => {
		const t = setTimeout(() => {
			setTabCnt(
				`<div style='height: 800px'><div style='background:yellow;height: 33.333%'>${tabCnt}</div></div>`
			);
			updateCntKey();
		}, 3000);
		return () => {
			clearTimeout(t);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Content tabCnt={tabCnt} key={cntKey} />
		</div>
	);
}

function Content({ tabCnt }) {
	const { isShowLeftShadow, isShowRightShadow } = useTabClickScroll({
		tabBoxClass: '.page-xxxx .tab-box',
		tabItemClass: '.page-xxxx .tab-box .tab-item',
		tabItemClassSelect: 'tab-item-current',
		tabLineClass: '.page-xxxx .tab-box .tab-line',
		tabContentClass: '.page-xxxx .tab-content',
	});
	return (
		<div className="page-xxxx">
			<div className="page-title">健康日报</div>
			<div className="tab-box">
				<div className="tab-list">
					<div className="tab-item">
						<span>本日状态</span>
					</div>
					<div className="tab-item">
						<span>健康总结</span>
					</div>
					<div className="tab-item">
						<span>器官风险</span>
					</div>
					<div className="tab-item">
						<span>器官睡眠</span>
					</div>
					<div className="tab-item">
						<span>健康建议</span>
					</div>
				</div>
				<div className="tab-line"></div>
				{isShowLeftShadow && <div className="shadow-box left-shadow"></div>}
				{isShowRightShadow && <div className="shadow-box right-shadow"></div>}
			</div>
			<div className="tab-content-box">
				<div
					className="tab-content"
					dangerouslySetInnerHTML={{
						__html: tabCnt,
					}}
				></div>
				<div className="tab-content">健康总结</div>
				<div className="tab-content">器官风险</div>
				<div className="tab-content">器官睡眠</div>
				<div className="tab-content">健康建议</div>
			</div>
		</div>
	);
}
