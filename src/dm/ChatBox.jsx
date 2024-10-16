import React from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";
import MessageBubble from './MessageBubble';

const ChatBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 1500px;
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



export default function ChatBox({ input, handleInputChange, messages, sendMessage, userId, userProfile, user, handleKeyDown}) {
  // 테스트용
  return (
    <ChatBoxContainer>
      <ChatHeader>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={userProfile} alt="프로필" />
          <span style={{ marginLeft: '10px', fontSize: '1.7rem' }}>{user}</span>
        </div>
        <button style={{ padding: '2px 10px', borderRadius: '5px', fontSize: '1.2rem', color: '#706EF4', cursor: 'pointer' }}>차단</button>
      </ChatHeader>
      <ChatContent>
        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '40px', fontSize: '1rem', color: '#333' }}>
          2024년 10월 23일
        </div>
        <MessageBubble message={input} messages={messages} userId={userId} userProfile={userProfile}>
        </MessageBubble>
      </ChatContent>
      <MessageInputContainer>
        <MessageInput
          type="text"
          placeholder="메시지를 입력하세요"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          maxLength={1000}
          value = {input}
        />
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '2.3rem', marginLeft: '15px' }}>
          <MdInsertPhoto />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontSize: '1.7rem', marginLeft: '15px' }} onClick={sendMessage}>
          <FaPaperPlane />
        </div>
      </MessageInputContainer>
    </ChatBoxContainer>
  );
}
