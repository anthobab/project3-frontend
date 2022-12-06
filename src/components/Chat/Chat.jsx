import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiHandler from '../../api/apiHandler';

const Chat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      apiHandler.getMessages(id).then((messages) => setMessages(messages));
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      {messages.map((message) => (
        <div>
          <h3>{message.sender.username}</h3>
          <p>{message.content}</p>
        </div>
      ))}
    </>
  );
};

export default Chat;
