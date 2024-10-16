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
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState();
  const [user, setUser] = useState();
  const [userProfile, setUserProfile] = useState();
  const [ws, setWs] = useState(null); // WebSocket 객체를 상태로 관리
  const [receivedMessage, setReceivedMessage] = useState(''); // 수신된

  useEffect(() => {
    // WebSocket 연결을 설정
    const webSocket = new WebSocket('ws://localhost:9090/message');

    // 연결이 열렸을 때 실행
    webSocket.onopen = () => {
      console.log('WebSocket 연결 성공');
    };

    // 서버에서 메시지를 받을 때 실행
    webSocket.onmessage = (event) => {
      // console.log('메시지 수신:', event.data);
      setReceivedMessage(event.data);

      const addMsg = {
        senderId: 7,
        content: event.data,
        emoji: '',
        imageUrl: '',
        lastMessageTime: new Date(),
        read: true
      }

      const msg = messages;
      console.log(messages);
      msg.push(addMsg);
      console.log(msg);
      setMessages(msg);


    };

    // 연결이 닫혔을 때 실행
    webSocket.onclose = () => {
      console.log('WebSocket 연결 닫힘');
    };

    // WebSocket 객체 저장
    setWs(webSocket);

    // 컴포넌트가 언마운트될 때 WebSocket 연결 닫기
    return () => {
      webSocket.close();
    };
  }, []);

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
    if (ws && input) {
      ws.send(input); // WebSocket을 통해 메시지 전송

      const addMsg = {
        senderId: userId,
        content: input,
        emoji: '',
        imageUrl: '',
        lastMessageTime: new Date(),
        read: true
      }

      const msg = messages;
      msg.push(addMsg);
      console.log(msg);
      setMessages(msg);

    }
    setInput(''); // 메시지 전송 후 초기화
  }

  // 엔터 누를 시 메세지 보내기
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const handleChangeRoom = (msgRoomId, userImg, userName) => {
    axios.get(`http://localhost:9090/dm/${msgRoomId}/detail`)
      .then((response) => {
        // 방이 선택되면 메시지를 상태로 설정
        setUserProfile(userImg);
        setUser(userName);
        setMessages(response.data);
        setUserId(id);
      })
      .catch((error) => {
        console.error('Error fetching the direct message:', error);
      });
  }

  return (
    <div style={{ display: 'flex' }}>
      <DmListBox chatList={chatList} handleChangeRoom={handleChangeRoom} />
      {user ? ( // messages가 존재하면 ChatBox를 보여줌
        <ChatBox
          input={input}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          sendMessage={sendMessage}
          messages={messages}
          userId={userId}
          userProfile={userProfile}
          user={user}
    
        />
      ) : ( // messages가 null일 경우 공백을 표시
        <div style={{ display: 'flex', textAlign: 'center' }}>챗내용이 없으요 힛.</div>
      )}
    </div>
  );
}
