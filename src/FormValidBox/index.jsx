import React from 'react';
import Form from 'Src/components/FormValid/Form';
import FormItem from 'Src/components/FormValid/FormItem';
import useForm from 'Src/components/FormValid/hook/useForm';

const model = {
	userName: {
		value: 'hello',
		rule: (value) => {
			if (!value) return '请输入姓名';
		},
	},
	tel: {
		value: '13456789',
		rule: (value) => {
			if (!value) return '请输入电话号码';
			if (value.length < 10) {
				return '请输入10个号码';
			}
		},
	},
};

export default function FormValidBox() {
	const formRef = useForm({
		model,
	});

	console.log('2222', formRef.current.getValue('userName'));
	return (
		<div>
			<div style={{ margin: '10px 0' }}>
				<span>用户名:</span>
				<input
					value={formRef.current.getValue('userName')}
					onChange={(e) => {
						console.log(e.target.value);
						formRef.current.setValue('userName', e.target.value);
					}}
					onBlur={() => {
						formRef.current.valid();
					}}
				/>
			</div>
			<div style={{ margin: '10px 0' }}>
				<span>电话号码:</span>
				<input
					value={formRef.current.getValue('tel')}
					onChange={(e) => {
						formRef.current.setValue('userName', e.target.value);
					}}
				/>
			</div>
			<button>提交</button>
		</div>
	);
}
