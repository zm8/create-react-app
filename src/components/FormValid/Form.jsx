import React, { forwardRef } from 'react';
import FormContext from './FormContext';

function Form(props, formInstance) {
	const { children } = props;
	const RenderChildren = (
		<FormContext.Provider value={formInstance}>{children}</FormContext.Provider>
	);
	return <>{RenderChildren}</>;
}

export default forwardRef(Form);
