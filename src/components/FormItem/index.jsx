import React from 'react';

export default class FormItem extends React.Component {
	constructor() {}
	render(props) {
		return (
			<div style={{ display: 'flex' }}>
				<div>{props.label}</div>
				<div>
					<input />
				</div>
			</div>
		);
	}
}
