/* @refresh reset */
import { useState } from 'react';
import Form from 'Src/components/FormValid/Form';
import FormItem from 'Src/components/FormValid/FormItem';
import useForm from 'Src/components/FormValid/hook/useForm';
import InputAge from './components/InputAge';
import InputEmail from './components/InputEmail';
import InputName from './components/InputName';
import InputTel from './components/InputTel';

export default function FormValidBox() {
	const formInstance = useForm();
	return (
		<div>
			<Form ref={formInstance}>
				<FormItem
					initValue="Hello"
					name="userName"
					rule={(value) => {
						if (!value) return '请输入用户名';
					}}
				>
					<InputName />
				</FormItem>
				<FormItem
					name="tel"
					rule={(value) => {
						if (!value) return '请输入电话号码';
						if (value.length < 5) {
							return '请至少输入5个数字';
						}
					}}
				>
					<InputTel />
				</FormItem>

				<FormItemSync />

				<button
					style={{ marginTop: 10 }}
					onClick={() => {
						formInstance.onSubmit((err, data) => {
							if (err) {
								alert(err);
								return;
							}
							console.log(data);
						});
					}}
				>
					提交
				</button>
			</Form>
		</div>
	);
}

function FormItemSync() {
	const [errMsgEmail, setErrMsgEmail] = useState('');
	const [errMsgTel, setErrMsgTel] = useState('');
	const isErr = errMsgEmail || errMsgTel;
	return (
		<div>
			<div style={isErr ? { border: '1px solid red' } : { border: '1px solid blue' }}>
				<FormItem
					name="email"
					rule={(value) => {
						if (!value) return '请输入邮件';
					}}
					onSyncErrorMsg={(errorMsg) => setErrMsgEmail(errorMsg)}
				>
					<InputEmail />
				</FormItem>
				<FormItem
					name="age"
					rule={(value) => {
						if (!value) return '请输入年龄';
					}}
					onSyncErrorMsg={(errorMsg) => setErrMsgTel(errorMsg)}
				>
					<InputAge />
				</FormItem>
			</div>
			<div>{isErr && <div style={{ color: 'red' }}>{isErr}</div>}</div>
		</div>
	);
}
