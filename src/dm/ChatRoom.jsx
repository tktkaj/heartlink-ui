import DmListBox from './DmListBox';
import ChatBox from './ChatBox';
import { useEffect, useState } from 'react';
import MiniSide from '../sideMenu/MiniSide'
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function ChatRoom() {

  const [dmList, setDmList] = useState([]);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState();
  const [msgRoomId, setMsgRoomId] = useState();
  const [user, setUser] = useState();
  const [userProfile, setUserProfile] = useState();
  const [ws, setWs] = useState(null); // WebSocket 객체를 상태로 관리
  const [receivedMessage, setReceivedMessage] = useState(''); // 수신된

  useEffect(() => {
    // WebSocket 연결을 설정
    const webSocket = new WebSocket('ws://localhost:9090/message');

    // 연결이 열렸을 때 실행
    webSocket.onopen = () => {
    };

    // 서버에서 메시지를 받을 때 실행
    webSocket.onmessage = (event) => {
      setReceivedMessage(event.data);

      const addMsg = {
        senderId: 7,
        content: event.data,
        emoji: '',
        imageUrl: '',
        lastMessageTime: new Date(),
        read: true
      }

      setMessages(prevMessages => [...prevMessages, addMsg]);

    };

    // 연결이 닫혔을 때 실행
    webSocket.onclose = () => {
    };

    // WebSocket 객체 저장
    setWs(webSocket);

    // 컴포넌트가 언마운트될 때 WebSocket 연결 닫기
    return () => {
      webSocket.close();
    };
  }, []);

  // 대화중인 상대방 리스트 불러오는 axios 
  useEffect(() => {
    const token = localStorage.getItem('access');

    axios.get("http://localhost:9090/dm"
      , {
        headers: {
          Authorization: `${token}`
        }
      }
    )
      .then((response) => {
        // 서버로부터 받은 데이터를 상태로 설정
        setDmList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching the direct message:', error);
      });
  }, []);


  // 상대방 클릭시 채팅방이 바뀌도록
  const handleChangeRoom = (chat) => {

    setMsgRoomId(chat.msgRoomId);

    const token = localStorage.getItem('access');
    axios.get(`http://localhost:9090/dm/${chat.msgRoomId}/detail`
      , {
        headers: {
          Authorization: `${token}`
        }
      }
    )
      .then((response) => {
        // 방이 선택되면 메시지를 상태로 설정
        setUserId(response.data.userId);
        setUserProfile(chat.userImg);
        setUser(chat.userName);
        setMessages(response.data.msgList);
      })
      .catch((error) => {
        console.error('Error fetching the direct message:', error);
      });
  }

  const handleInputChange = (e) => {
    setInput(e.target.value);
  }

  const sendMessage = () => {
    const token = localStorage.getItem('access');

    if (ws && input) {
      ws.send(input); // WebSocket을 통해 메시지 전송

      const addMsg = {
        msgRoomId: msgRoomId,
        senderId: userId,
        content: input,
        lastMessageTime: new Date()
      }

      axios.post("http://localhost:9090/dm/messages/text", addMsg
        , {
          headers: {
            Authorization: `${token}`
          }
        }
      ).then((response)=>{
      }
      ).catch((error) => {
        console.error('Error fetching the direct message:', error);
      }
      )


      setMessages(prevMessages => [...prevMessages, addMsg]);
    }
    setInput(''); // 메시지 전송 후 초기화
  }

  // 엔터 누를 시 메세지 보내기
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  const handleFileChange = (event) => {
    
    const file = event.target.files[0];
    const token = localStorage.getItem("access");

    let formData = new FormData();
    formData.append("file", file)
    formData.append("msgRoomId", msgRoomId)
    formData.append("senderId", userId);

    if (file) {

      axios.post("http://localhost:9090/dm/messages/img",formData,
        {
          headers: {
            Authorization: `${token}`
            , "Content-Type" : "multipart/form-data"
          }
        }).then((response)=>{
          console.log(response.data);
          console.log(response.status);
        })
      .catch((error)=>{
        console.log("Error uploading file", error);
      })
      
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <MiniSide />
      <DmListBox dmList={dmList} handleChangeRoom={handleChangeRoom} />
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
          handleFileChange={handleFileChange}
          msgRoomId={msgRoomId}
        />
      ) : ( // messages가 null일 경우 공백을 표시
        <div style={{ display: 'flex', textAlign: 'center', marginLeft: '62vw', marginTop: '50vh' }}>채팅이 없습니다.</div>
      )}
    </div>
  );
}
