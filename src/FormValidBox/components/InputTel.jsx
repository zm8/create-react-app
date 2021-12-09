import React from 'react';

export default function InputTel({ value, setValue, errorMsg, triggerValid }) {
	return (
		<div style={{ margin: '10px 0' }}>
			<span>电话号码:</span>
			<input
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				onBlur={() => {
					triggerValid();
				}}
			/>
			{errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
		</div>
	);
}
