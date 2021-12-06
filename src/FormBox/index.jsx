import { useRef } from 'react';
import Form from './components/Form';
import FormItem from './components/FormItem';
import Input from './components/Input';

export default function FormBox() {
	const form = useRef(null);
	const submit = () => {
		form.current.submitForm((formValue) => {
			console.log(formValue);
		});
	};
	const reset = () => {
		form.current.resetForm();
	};
	return (
		<div className="box">
			<Form ref={form}>
				<FormItem name="name" label="我是">
					<Input />
				</FormItem>
				<FormItem name="mes" label="我想对大家说">
					<Input />
				</FormItem>
				<input placeholder="不需要的input" />
				<input />
			</Form>
			<div className="btns" style={{ margin: '100px 0 0' }}>
				<button className="searchbtn" onClick={submit}>
					提交
				</button>
				<button className="cancelBtn" onClick={reset} style={{ marginLeft: 20 }}>
					重置
				</button>
			</div>
		</div>
	);
}
