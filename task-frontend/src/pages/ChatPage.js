import React, { useState } from 'react';

function ChatPage() {
  const [messages, setMessages] = useState([]);

  function handleMessageSubmit(message) {
    setMessages([...messages, message]);
  }

  return (
    <div>
      <MessageList messages={messages} />
      <MessageInput onMessageSubmit={handleMessageSubmit} />
    </div>
  );
}

function MessageList({ messages }) {
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>{message}</div>
      ))}
    </div>
  );
}

function MessageInput({ onMessageSubmit }) {
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onMessageSubmit(message);
    setMessage('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}/>
      <button type="submit">Send</button>
    </form>
  );
}

export default ChatPage;