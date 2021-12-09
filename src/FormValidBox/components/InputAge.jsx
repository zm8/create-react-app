import React from 'react';

export default function InputAge({ value, setValue, triggerValid }) {
	return (
		<div style={{ margin: '10px 0' }}>
			<span>年龄:</span>
			<input
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				onBlur={() => {
					triggerValid();
				}}
			/>
		</div>
	);
}
