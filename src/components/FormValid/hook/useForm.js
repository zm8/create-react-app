import { useRef, useState } from 'react';

class FormStore {
	constructor({ model, forceUpdate }) {
		this.model = model || {};
		this.forceUpdate = forceUpdate;
	}
	setValue(name, value) {
		// if (!this.model[name]) return;
		this.model[name].value = value;
		this.forceUpdate();
	}
	getValue(name) {
		return this.model[name]?.value;
	}
	valid() {}
}

export default function useForm(para = {}) {
	const [, forceUpdate] = useState({});
	const ref = useRef();
	if (!ref.current) {
		ref.current = new FormStore({
			model: para.model,
			forceUpdate: () => forceUpdate({}),
		});
	}
	return ref;
}
