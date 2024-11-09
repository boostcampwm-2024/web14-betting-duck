import { useState } from "react";
import "./App.css";

function App() {
	const [count, setCount] = useState(0);
	const [isToggle, setIsToggle] = useState(false);

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank"></a>
				<a href="https://react.dev" target="_blank"></a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">
				<button onClick={() => setCount((count) => count + 1)}>
					count is {count}
				</button>
				<button onClick={() => setIsToggle((prev) => !prev)}>
					count is {isToggle}
				</button>
				<p>내용수정테스트</p>
			</div>
			<p className="read-the-docs">
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
