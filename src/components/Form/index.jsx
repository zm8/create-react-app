import React from 'react';

export default class Form extends React.Component {
	state = {};
	onChange = (name, value) => {
		this.setState({
			[name]: value,
		});
	};
	submit = () => {
		console.log(this.state);
	};
	reset = () => {
		Object.entries(this.state).forEach(([name]) => {
			this.setState({ [name]: '' });
		});
	};
	render = () => {
		return (
			<div>
				{React.Children.map(this.props.children, (child) => {
					if (child.type.displayName === 'formItem') {
						return React.cloneElement(
							child,
							{
								value: this.state[child.props.name] || '',
								handleChange: this.onChange,
							},
							child.props.children
						);
					}
					return null;
				})}
			</div>
		);
	};
}
