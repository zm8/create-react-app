/* @refresh reset */
import { useEffect } from 'react';
import { useStore } from 'Src/components/FormValidate/FormStore';
import InputName from './components/InputName';
import InputTel from './components/InputTel';

export default function Formzustand() {
	const register = useStore((state) => state.register);
	useEffect(() => {
		register([
			{
				name: 'username',
				rule: (value) => {
					if (!value) return '请输入用户名';
				},
			},
			{
				name: 'tel',
				rule: (value) => {
					if (!value) return '请输入电话号码';
					if (value.length < 5) {
						return '请至少输入5个数字';
					}
				},
			},
		]);
	}, [register]);
	return (
		<div>
			<InputName />
			<InputTel />
		</div>
	);
}
