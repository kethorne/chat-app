import { useState } from "react";

const MessageInput = ({ setMessages, messages }) => {
	const [messageText, setMessageText] = useState(""); //#10
	//PART B: SEND A NEW MESSAGE
	//#7
	const formSubmitted = async (evt, received=false) => {
		evt.preventDefault(); //prevent page from refreshing when form is submitted

		//#8
		const response = await fetch(`http://localhost:3001/message`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			//#9
			body: JSON.stringify({
				text: messageText,
                received
			}),
		});
		const data = await response.json(); //#15
        console.log(data);
		setMessages(data.messages); //#16

        setMessageText("");

        const messagesDiv = document.getElementById("messages");
        messagesDiv.scrollTo(0, messagesDiv.scrollHeight);

	};

    const receivedMessage = async (evt) => {
        await formSubmitted(evt, true)
    }

	return (
		<form className="row inputBar" onSubmit={formSubmitted}>
            <div className="col-2">
                <button className="btn btn-primary" onClick={receivedMessage}>
                    Received
                </button>
            </div>
			<div className="col-8">
				<input
					className="form-control"
					type="text"
					value={messageText}
					onChange={(evt) => {
						setMessageText(evt.target.value);
					}}
				/>
			</div>
			<div className="col-2">
				<button className="btn btn-success" type="submit">
					Send
				</button>
			</div>
		</form>
	);
};

export default MessageInput;
