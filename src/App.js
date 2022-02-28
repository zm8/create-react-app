import React, { useRef } from 'react';
import './App.css';
import Form from './components/Form';
import FormItem from './components/Form';

function App() {
	const formRef = useRef();
	return (
		<div className="App">
			<Form ref={formRef}>
				<FormItem label="我是"></FormItem>
				<FormItem label="我想对大家说"></FormItem>
				<div style={{ display: 'flex' }}>
					<button value="提交" />
					<button value="重置" />
				</div>
			</Form>
		</div>
	);
}

export default App;
