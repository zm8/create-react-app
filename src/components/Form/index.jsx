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
				{React.Children.map(this.props.children, (item) => {
					if (
						React.isValidElement(item) &&
						item.type.displayName === 'formItem'
					) {
						return React.cloneElement(
							item,
							{
								value: this.state[item.props.name] || '',
								handleChange: this.onChange,
							},
							item.props.children
						);
					}
					return null;
				})}
			</div>
		);
	};
}
