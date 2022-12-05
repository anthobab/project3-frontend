import React, { useEffect, useState } from 'react';
import apiHandler from '../../api/apiHandler';

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
      {conversations.map((e) => JSON.stringify(conversations))}
    </div>
  );
};

export default Conversations;
