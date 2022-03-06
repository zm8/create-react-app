import React from 'react';

export default function FormItem(props) {
	const { children, label, value, name, handleChange } = props;
	const onChange = (value) => {
		handleChange(name, value);
	};
	return (
		<div style={{ display: 'flex' }}>
			<div>{label}</div>
			{React.isValidElement(children) &&
			children.type.displayName === 'input'
				? React.cloneElement(children, {
						value,
						onChange: onChange,
				  })
				: null}
		</div>
	);
}

FormItem.displayName = 'formItem';
