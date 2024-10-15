import DmListBox from './DmListBox';
import ChatBox from './ChatBox';
import { useEffect, useState, useParams } from 'react';
import axios from 'axios';

export default function ChatRoom() {


  useEffect(() => {

    axios.get(`http://localhost:9090/dm/4`)
      .then((response) => {
        // 서버로부터 받은 데이터를 상태로 설정
        setChatList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching the direct message:', error);
      });
  }, []);

  

  const [input, setInput] = useState('');
  const [chatList, setChatList] = useState([]);
  const [messages, setMessages] = useState({
    0: []
  });


  const handleInputChange = (e) => {
    setInput(e.target.value);
  }

  const sendMessage = () => {
    if (input.trim() !== '') {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [0]: [...prevMessages[0], { text: input, isMine: true }],
      }));
      setInput('');
    }

  }

  return (
    <div style={{ display: 'flex' }}>
      <DmListBox chatList={chatList}/>
      <ChatBox input={input} handleInputChange = {handleInputChange} sendMessage={sendMessage}/>
    </div>
  );
}
