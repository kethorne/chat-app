// import { useState } from "react";

const MessagesList = ({ messages, setMessages }) => {
	return (
		<div id="messages">
			{messages.map((message, index) => {
				if (message.received) {
					return <ReceivedMessage
                        key={index}
                        message={message} />;
				} else {
					return (
						<SentMessage
							key={index}
							text={message.content}
							timestamp={message.timestamp}
                            index={index}
                            setMessages={setMessages}
                            databaseID={message.id}
						/>
					);
				}
			})}
		</div>
	);
};

const SentMessage = ({ text, timestamp, index, setMessages, databaseID }) => {
	const editClicked = async () => {
		const newText = window.prompt("What would you like to change the" +
            " message content to?");
        const response = await fetch("http://localhost:3001/message", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newMessageText: newText,
                index,
            }),
        });
        const data = await response.json();
        setMessages(data.messages);
	};

	const deleteClicked = async () => {
		const didConfirm = window.confirm("Are you sure you want to delete" +
            " this message");
        if (didConfirm) {
            const response = await fetch(`http://localhost:3001/message/${databaseID}`, {method: "DELETE"});
            console.log(response);
            const data = await response.json();
            setMessages(data.messages);
        }
	};

	return (
		<div className="row message">
			<div className="col-2"></div>
			<div className="col-10 text-end">
				<div className="buttons">
					<span onClick={editClicked}>edit</span>
					{" | "}
					<span onClick={deleteClicked}>delete</span>
				</div>
				<span className="messageText">{text}</span>
				<div className="timestamp">{timestamp.toString()}</div>
			</div>
		</div>
	);
};

const ReceivedMessage = ({ message }) => {
	return (
		<div className="row message">
			<div className="col-10">
				<span className="messageText userMessageText">
					{message.content}
				</span>
				<div className="timestamp">{message.timestamp.toString()}</div>
			</div>
		</div>
	);
};

export default MessagesList;
