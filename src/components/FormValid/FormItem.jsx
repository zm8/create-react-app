import React, { useContext, useEffect } from 'react';
import FormContext from './FormContext';

export default function FormItem(props) {
	const { children, name, rule } = props;
	const formInstance = useContext(FormContext);
	useEffect(() => {
		const form = formInstance.current;
		form.registerModel(name, { rule });
		return () => {
			form.unregisterModel(name);
		};
	}, []);
	return (
		<>
			<children {...formInstance.current.getModel(name)} />
		</>
	);
}
