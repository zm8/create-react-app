import React, { cloneElement, isValidElement, useContext, useEffect } from 'react';
import FormContext from './FormContext';
import { useFirstMountState, useUpdate } from 'react-use';
import { useMemoizedFn } from 'ahooks';

function FormItem(props) {
	const { children, name, rule, initValue, onSyncErrorMsg } = props;
	const isFirstMount = useFirstMountState();
	const formInstance = useContext(FormContext);
	const update = useUpdate();
	const setValue = useMemoizedFn((value) => {
		formInstance.setValue(name, { value });
	});
	const triggerValid = useMemoizedFn(() => {
		formInstance.triggerValid(name);
	});

	if (isFirstMount) {
		formInstance.registerModel(name, {
			setValue,
			value: initValue,
			rule,
			update,
		});
	}

	const errorMsg = formInstance.getValue(name, 'errorMsg');
	const value = formInstance.getValue(name, 'value');

	useEffect(() => {
		onSyncErrorMsg && onSyncErrorMsg(errorMsg);
	}, [errorMsg]);

	let renderChildren;
	if (isValidElement(children)) {
		renderChildren = cloneElement(children, {
			value,
			errorMsg,
			setValue,
			triggerValid,
		});
	} else {
		renderChildren = children;
	}
	return renderChildren || null;
}

FormItem.displayName = 'formItem';

export default React.memo(FormItem);
