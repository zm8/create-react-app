import React, { useRef } from 'react';
import './App.css';
import Form from './components/Form';
import FormItem from './components/FormItem';
import Input from './components/Input';

function App() {
	const formRef = useRef();
	const submit = () => {
		formRef.current.submit();
	};
	const reset = () => {
		formRef.current.reset();
	};
	return (
		<div className="App">
			<Form ref={formRef}>
				<FormItem label="我是" name="name">
					<Input />
				</FormItem>
				<FormItem label="我想对大家说" name="res">
					<Input />
				</FormItem>
			</Form>
			<div style={{ display: 'flex' }}>
				<button type="button" onClick={submit}>
					提交
				</button>
				<button type="button" onClick={reset}>
					重置
				</button>
			</div>
		</div>
	);
}

export default App;
