import DmListBox from './DmListBox';
import ChatBox from './ChatBox';
import MainPage from '../main/MainPage'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function ChatRoom() {

  const { id } = useParams();

  const [input, setInput] = useState('');
  const [chatList, setChatList] = useState([]);
  const [messages, setMessages] = useState(null); // 초기값을 null로 설정
  const [userId, setUserId] = useState(id);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    axios.get(`http://localhost:9090/dm/${id}`)
      .then((response) => {
        // 서버로부터 받은 데이터를 상태로 설정
        setChatList(response.data);
      })
      .catch((error) => {
        console.error('Error fetching the direct message:', error);
      });
  }, []);

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
  
  const handleChangeRoom = (msgRoomId, userImg) => {
    axios.get(`http://localhost:9090/dm/${msgRoomId}/detail`)
      .then((response) => {
        // 방이 선택되면 메시지를 상태로 설정
        setUserProfile(userImg);
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
          userId = {userId}
          userProfile = {userProfile}
        />
      ) : ( // messages가 null일 경우 공백을 표시
        <div style={{display: 'flex', textAlign:'center'}}>삐쀼삐</div>
      )}
    </div>
  );
}
