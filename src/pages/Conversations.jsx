import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import apiHandler from '../api/apiHandler';

const Conversations = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    apiHandler.getConversations().then((conversations) => setConversations(conversations));
    const id = setInterval(() => {
      apiHandler.getConversations().then((conversations) => setConversations(conversations));
    }, 10000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <h1>Conversations</h1>
      {conversations.map((conversation) => (
        <Link key={conversation.conversationId} to={`/conversations/${conversation.conversationId}`}>
          <h3>{conversation.service.title}</h3>
          <h4>{conversation.penfriend}</h4>
        </Link>
      ))}
    </div>
  );
};

export default Conversations;
