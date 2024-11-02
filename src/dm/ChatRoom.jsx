import DmListBox from './DmListBox';
import ChatBox from './ChatBox';
import { useEffect, useState } from 'react';
import MiniSide from '../sideMenu/MiniSide'
import axios from 'axios';
import styled from 'styled-components'

const NoChatContainer = styled.div`
  display: flex;
  text-align: center;
  margin-left: 62vw;
  margin-top: 50vh;
`;

export default function ChatRoom() {

  const [ws, setWs] = useState(null); // WebSocket 객체를 상태로 관리
  const [dmList, setDmList] = useState([]); // dmList
  const [input, setInput] = useState(''); // 입력된 값
  const [messages, setMessages] = useState([]); // 보여질 메세지들
  const [chatRoom, setChatRoom] = useState(); // 메세지방 하나의 정보가 들어있는 변수
  const [userId, setUserId] = useState(); // 나의 LoginId
  const [lastMessage, setLastMessage] = useState();
  const [msgRoomId, setMsgRoomId] = useState(); //
  const [user, setUser] = useState();
  const [userProfile, setUserProfile] = useState();


  // 웹 소켓 연결
  useEffect(() => {

    // WebSocket 연결을 설정
    const webSocket = new WebSocket('ws://localhost:9090/message');

    // 연결이 열렸을 때 실행
    webSocket.onopen = () => {
    };

    // 서버에서 메시지를 받을 때 실행
    webSocket.onmessage = (event) => {

      let type = event.data.split(':');

      let newMessage = null;
      if (type[0] === 'txt') {
        console.log("텍스트")
        newMessage = {  
          senderId: userId + 1,
          content: type[1],
          lastMessageTime: new Date()
        }
      }

      else if (type[0] === 'img') {
        newMessage = {
          senderId: userId + 1,
          imageUrl: `http:${type[2]}:${type[3]}`,
          lastMessageTime: new Date()
        }
      }

      setMessages(prevMessages => [...prevMessages, newMessage]);

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
        setMessages(response.data.chatList[0].messages);
      })
      .catch((error) => {
        console.error('Error fetching the direct message:', error);
      });
  }, []);


  // 상대방 클릭시 채팅방이 바뀌도록
  const handleChangeRoom = (chat) => {
    setChatRoom(chat);
  }

  // 메세지 입력을 받아서 input에 저장하는 함수
  const handleInputChange = (e) => {
    setInput(e.target.value);
  }

  // 메세지를 웹소켓으로 보내는 함수
  const sendMessage = () => {
    const token = localStorage.getItem('access');

    if (ws && input) {
      ws.send(`txt:${input}`); // WebSocket을 통해 메시지 전송

      let newMessage = {
        msgRoomId: msgRoomId,
        senderId: userId,
        content: input,
        lastMessageTime: new Date()
      }

      axios.post("http://localhost:9090/dm/messages/text", newMessage, {
        headers: {
          Authorization: `${token}`
        }
      })
        .then((response) => {
        })
        .catch((error) => {
          console.error('Error sending the message:', error);
        });

      // 새로운 메시지를 이전 messages 배열에 추가하여 상태 업데이트
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }

    setInput(''); // 메시지 전송 후 초기화
  };

  // 엔터 누를 시 메세지 보내기
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  // 파일을 전송하는 함수
  const handleFileChange = (event) => {

    const file = event.target.files[0];
    const token = localStorage.getItem("access");
    let image = window.URL.createObjectURL(file);

    let formData = new FormData();
    formData.append("file", file)
    formData.append("msgRoomId", msgRoomId)
    formData.append("senderId", userId);

    // api를 통해 db에 저장
    if (file) {


      axios.post("http://localhost:9090/dm/messages/img", formData,
        {
          headers: {
            Authorization: `${token}`
            , "Content-Type": "multipart/form-data"
          }
        }).then((response) => {
          ws.send(`img:${response.data}`);
          console.log("이건",image);

          const newMessage = {
            msgRoomId: msgRoomId,
            senderId: userId,
            imageUrl: image,
            lastMessageTime: new Date()
          }

      // 이거는 내 화면에 출력되게 message에 저장
          setMessages(prevMessages => [...prevMessages, newMessage]);

        })
        .catch((error) => {
          console.log("Error uploading file", error);
        })

    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <MiniSide/>
      <DmListBox dmList={dmList} handleChangeRoom={handleChangeRoom} setUserId={setUserId} />
      {chatRoom ? ( // messages가 존재하면 ChatBox를 보여줌
        <ChatBox
          input={input}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          sendMessage={sendMessage}
          setMessages={setMessages}
          setMsgRoomId={setMsgRoomId}
          chatRoom={chatRoom}
          userProfile={userProfile}
          messages={messages}
          user={user}
          handleFileChange={handleFileChange}
          msgRoomId={msgRoomId}
          userId={userId}
        />
      ) : ( // messages가 null일 경우 공백을 표시
        <NoChatContainer>채팅이 없습니다.</NoChatContainer>
      )}
    </div>
  );
}
