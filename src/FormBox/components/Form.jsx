import React from 'react';

class Form extends React.Component {
	state = {
		formData: {},
	};
	onChange = (name, value) => {
		this.setState({
			formData: {
				...this.state.formData,
				[name]: value,
			},
		});
	};
	submitForm = (callback) => {
		callback(this.state.formData);
	};
	resetForm = () => {
		this.setState({
			formData: {},
		});
	};
	render() {
		const { props } = this;
		return (
			<div>
				{React.Children.map(props.children, (child) => {
					if (child.type.displayName !== 'formItem') {
						return null;
					}
					// 注意: 这里可以获得子组件的 name
					const name = child.props.name;
					return React.cloneElement(child, {
						value: this.state.formData[name] || '',
						onChange: (value) => {
							this.onChange(name, value);
						},
					});
				})}
			</div>
		);
	}
}

export default Form;
