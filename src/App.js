import React from 'react';
import { useToggle } from 'react-use';
import './App.css';
import { Provider, createStore } from './components/FormValidate/FormStore';
import Formzustand from './Formzustand';

function App() {
	const [on, toggle] = useToggle(true);

	return (
		<div className="App">
			{on && (
				<Provider createStore={createStore}>
					<Formzustand />
				</Provider>
			)}
			<button onClick={toggle} style={{ position: 'absolute', top: 100 }}>
				切换显示隐藏
			</button>
		</div>
	);
}

export default App;
