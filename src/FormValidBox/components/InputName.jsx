import React from 'react';

export default function InputName({ value, setValue, errorMsg, triggerValid }) {
	return (
		<div style={{ margin: '10px 0' }}>
			<span>用户名:</span>
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
