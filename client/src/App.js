import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import './App.css';

const App = props => {
  const [messages, setMessages] = useState([]);
  const socket = useRef();

  useEffect(() => {
    socket.current = socketIOClient('localhost:3001');
  }, []);

  useEffect(() => {
    socket.current.on('chat message', msg => {
      const newList = messages.concat(msg);
      setMessages(newList);
    });
  }, [messages]);

  const onSubmitHandler = event => {
    event.preventDefault();

    socket.current.emit('chat message', event.target.newMessage.value);

    event.target.newMessage.value = '';
  };

  return (
    <div>
      <ul id="messages">
        {messages.map(m => (
          <li>{m}</li>
        ))}
      </ul>
      <form onSubmit={onSubmitHandler}>
        <input name="newMessage" autocomplete="off" />
        <button>Send</button>
      </form>
    </div>
  );
};

export default App;
