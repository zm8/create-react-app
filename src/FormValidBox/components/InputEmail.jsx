import React from 'react';

export default function InputEmail({ value, setValue, triggerValid }) {
	return (
		<div style={{ margin: '10px 0' }}>
			<span>邮箱:</span>
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
