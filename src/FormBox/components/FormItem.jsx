import React from 'react';

export default function FormItem({ value, label, children, onChange }) {
	return (
		<div>
			{label}:{' '}
			{React.isValidElement(children) && children.type.displayName === 'input'
				? React.cloneElement(children, {
						value,
						onChange,
				  })
				: null}
		</div>
	);
}

FormItem.displayName = 'formItem';
