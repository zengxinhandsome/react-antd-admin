import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';

const num: number = 111;

console.log('num', num);

const App = () => {
	return (
		<div>
			<h1>Hello!!</h1>
			<h2>Welcome to your First React App..!</h2>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
