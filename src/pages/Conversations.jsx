import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiHandler from '../api/apiHandler';

const Conversations = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const id = setInterval(() => {
      apiHandler.getConversations().then((conversations) => setConversations(conversations));
    }, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <h1>Conversations</h1>
      {conversations.map((conversation) => (
        <Link key={conversation._id} to={`/conversations/${conversation._id}`}>
          <h3>{conversation.service.title}</h3>
          <h4>{conversation.participants[0].username}</h4>
        </Link>
      ))}
    </div>
  );
};

export default Conversations;
