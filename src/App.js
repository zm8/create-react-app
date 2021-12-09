import React from 'react';
import { useToggle } from 'react-use';
// import FormBox from './FormBox';
import './App.css';
// import LearnProps from './LearnProps';
import FormValidBox from './FormValidBox';

function App() {
	const [on, toggle] = useToggle(true);
	return (
		<div className="App">
			{on && <FormValidBox />}
			<button onClick={toggle} style={{ margin: '100px 0' }}>
				切换显示隐藏
			</button>
			{/* <LearnProps /> */}
		</div>
	);
}

export default App;
