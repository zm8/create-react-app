import React from 'react';
import { useStore } from 'Src/components/FormValidate/FormStore';

const INPUT_NAME = 'username';
export default function InputName() {
	const { value = '', errorMsg = '' } = useStore(
		(state) => state.getModel(INPUT_NAME) || ({} as any)
	);
	const setValue = useStore((state) => state.setValue);
	const triggerValid = useStore((state) => state.triggerValid);
	return (
		<div style={{ margin: '10px 0' }}>
			<span>用户名:</span>
			<input
				value={value}
				onChange={(e) => {
					setValue(INPUT_NAME, e.target.value);
				}}
				onBlur={() => {
					triggerValid(INPUT_NAME);
				}}
			/>
			{errorMsg && <div style={{ color: 'red' }}>{errorMsg}</div>}
		</div>
	);
}
