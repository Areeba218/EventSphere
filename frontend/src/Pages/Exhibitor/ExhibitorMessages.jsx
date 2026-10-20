import { useState } from "react";

function ExhibitorMessages() {

    const [message, setMessage] = useState("");

    const [messages, setMessages] = useState([
        {
            sender: "Organizer",
            text: "Your booth application has been approved."
        }
    ]);

    const sendMessage = (e) => {
        e.preventDefault();

        if (message === "") {
            return;
        }

        setMessages([
            ...messages,
            {
                sender: "You",
                text: message
            }
        ]);

        setMessage("");
    };

    return (
        <div className="messages-page">

            <h1>Messages</h1>

            <div className="message-box">

                {messages.map((item, index) => (
                    <div className="message" key={index}>
                        <strong>{item.sender}</strong>
                        <p>{item.text}</p>
                    </div>
                ))}

            </div>

            <form onSubmit={sendMessage}>

                <textarea
                    placeholder="Write your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>

                <button type="submit">
                    Send Message
                </button>

            </form>

        </div>
    );
}

export default ExhibitorMessages;