import React, { useRef } from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from "react-icons/fa";
import { MdInsertPhoto } from "react-icons/md";
import MessageBubble from './MessageBubble';

const ChatBoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 72vw;
  margin-left: 28vw;
  background-color: #fff;

`;

const ChatHeader = styled.div`
  padding: 10px;
  padding-left: 15px;
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

const BlockButton = styled.button`
  padding: 2px 10px;
  border-radius: 5px;
  font-size: 1.2rem;
  color: #706EF4;
  cursor: pointer;
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
`;

const ProfileName = styled.span`
  margin-left: 10px;
  font-size: 1.7rem;
`;


const ChatContent = styled.div`
  padding-right: 20px;
  overflow-y: scroll;
  flex-grow: 1;
  scrollbar-width: none;

  ::-webkit-scrollbar {
    display: none;
  }
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


const HiddenFileInput = styled.input`
  display: none;
`;

const PhotoContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 2.3rem;
  margin-left: 15px;
`;

const SendMessageContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1.7rem;
  margin-left: 15px;
`;

export default function ChatBox({ input, handleInputChange, handleKeyDown, handleFileChange, sendMessage, userId, messages, otherProfile, otherLoginId, handleBlockUser}) {
  const fileInputRef = useRef(null);

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  return (
    <ChatBoxContainer>
      <ChatHeader>
        <ProfileContainer>
          <ProfileImage src={otherProfile} alt="상대방사진" />
          <ProfileName >{otherLoginId}</ProfileName>
        </ProfileContainer>
        <BlockButton onClick={handleBlockUser}>차단</BlockButton>
      </ChatHeader>
      <ChatContent>
        <MessageBubble otherProfile = {otherProfile} messages={messages}  userId={userId}/>
      </ChatContent>
      <MessageInputContainer>
        <MessageInput
          type="text"
          value={input}
          placeholder="메시지를 입력하세요"
          onChange={handleInputChange}
          onKeyPress={handleKeyDown}
          maxLength={1000}
        />
        <PhotoContainer onClick={handlePhotoClick}>
          <MdInsertPhoto />
        </PhotoContainer>
        <HiddenFileInput
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <SendMessageContainer onClick={sendMessage}>
          <FaPaperPlane />
        </SendMessageContainer>
      </MessageInputContainer>
    </ChatBoxContainer>
  );
}
