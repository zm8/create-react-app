import { useRef } from 'react';
import { useUpdate } from 'react-use';
import FormStore from '../FormStore';

export default function useForm(para = {}) {
	const updateForm = useUpdate();
	const ref = useRef();
	if (!ref.current) {
		ref.current = new FormStore({
			updateForm,
			model: para.model,
		});
	}
	return ref.current;
}
