import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import apiHandler from '../api/apiHandler';

const OneConversation = () => {
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
        <div style={{ border: '1px solid black', margin: '15px 30px', padding: '5px', borderRadius: '10px' }}>
          <h3>{message.sender.username}</h3>
          <p>{message.content}</p>
        </div>
      ))}
    </>
  );
};

export default OneConversation;
