import "./App.css";
import Header from "./Header.js";
import MessagesList from "./MessagesList";
import MessageInput from "./MessageInput";
import { useState, useEffect } from "react";

function App() {
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		//PART A: Get the messages
		const getMessagesFromAPI = async () => {
			const response = await fetch("http://localhost:3001/messages"); //#1, #17
			const data = await response.json(); //#5, #21
            console.log(data);
			setMessages(data.messages); //#6, #22
		};
		getMessagesFromAPI();
	}, []);

	return (
		<div className="App container">
			<Header />
			<MessagesList messages={messages} setMessages={setMessages} />
			<MessageInput messages={messages} setMessages={setMessages} />
		</div>
	);
}

export default App;
