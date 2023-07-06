import axios from 'axios';
import { useEffect, useState } from 'react';

const Chatpage = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    const { data } = await axios.get('/api/chat');
    setChats(data);
  };

  return (
    <>
      <div>Chatpage</div>
      <ul>
        {chats?.map((chat, idx) => {
          return <li key={idx}>{chat.chatName}</li>;
        })}
      </ul>
    </>
  );
};

export default Chatpage;
