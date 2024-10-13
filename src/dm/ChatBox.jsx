import React from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";
import MessageBubble from './MessageBubble';
import profileImg from '../image/testimg/와구리.png';

const ChatBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 1000px;
  background-color: #fff;
`;

const ChatHeader = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
  color: #333;
  border-bottom: 1px solid #ddd;
  img {
    display: block;
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
`;

const ChatContent = styled.div`
  padding: 10px;
  padding-left: 60px;
  padding-right: 20px;
  overflow-y: scroll;
  flex-grow: 1;
`;

const MessageInputContainer = styled.div`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
`;

const MessageInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;



export default function ChatBox() {

  // 테스트용
  const message = '혹시 내일 청년다방 옥수수 먹을 의향 있는 사람?'

  return (
    <ChatBoxContainer>
      <ChatHeader>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={profileImg} alt="프로필" />
          <span style={{ marginLeft: '10px', fontSize: '1.7rem' }}>Hyuna</span>
        </div>
        <button style={{ padding: '2px 10px', borderRadius: '5px', fontSize: '1rem', color: '#706EF4', cursor: 'pointer' }}>차단</button>
      </ChatHeader>
      <div style={{ alignSelf: 'center', marginTop: '20px', marginBottom: '40px', fontSize: '0.8rem', color: '#333' }}>
        2024년 10월 23일
      </div>
      <ChatContent>
          <MessageBubble message={message}>
          </MessageBubble>
      </ChatContent>
      <MessageInputContainer>
        <MessageInput
          type="text"
          placeholder="메시지를 입력하세요"
        />
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '2.3rem', marginLeft: '15px' }}>
          <MdInsertPhoto />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '1.7rem', marginLeft: '15px' }}>
          <FaPaperPlane />
        </div>
      </MessageInputContainer>
    </ChatBoxContainer>
  );
}
