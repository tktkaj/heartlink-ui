import DmListBox from './DmListBox';
import ChatBox from './ChatBox';
import { useEffect, useState } from 'react';
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
  const [messages, setMessages] = useState(null); // 초기값을 null로 설정
  const [userId, setUserId] = useState(4);

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
  
  const handleChangeRoom = (msgRoomId) => {
    axios.get(`http://localhost:9090/dm/${msgRoomId}/detail`)
      .then((response) => {
        // 방이 선택되면 메시지를 상태로 설정
        setMessages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching the direct message:', error);
      });
  }

  return (
    <div style={{ display: 'flex' }}>
      <DmListBox chatList={chatList} handleChangeRoom={handleChangeRoom} />
      {messages ? ( // messages가 존재하면 ChatBox를 보여줌
        <ChatBox 
          input={input} 
          handleInputChange={handleInputChange} 
          sendMessage={sendMessage} 
          messages={messages} 
          userId={userId} 
        />
      ) : ( // messages가 null일 경우 공백을 표시
        <div style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
          삐쀼삐
        </div>
      )}
    </div>
  );
}
