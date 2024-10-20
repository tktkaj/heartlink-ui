import React from 'react';
import styled from 'styled-components';
import { FaPlusCircle } from "react-icons/fa";

const DmListBoxContainer = styled.div`
  width: 350px;
    height: 100vh;
    background-color: white;
    border-radius: 0 10px 10px 0;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 4.7vw;
    @keyframes slideIn {
    from {
        transform: translateX(-80%);
    }
    to {
        transform: translateX(0);
    }
}
    animation: slideIn 0.4s forwards;
    padding-top: 5vh;
`;

const DmListHeader = styled.div`
  display: flex;
  margin-left: 2vw;
  font-size: 1.8rem;
  color: #333;
`;

const DmItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-right: auto;
  gap: 10px;
  padding: 10px;
  cursor: pointer;
  &[data-selected="true"] {
    background-color: rgba(112, 110, 244, 0.07);
    color: #333;
  }
  &:hover{
        background-color: #e6e6ff;
    }
`;

const UserNameLabel = styled.div`
  height: 35px;
  font-size: 1.6rem;
`
const IconButton = styled.button`

  height: 35px;
  background: none;
  position: absolute;
  right: 10px;
  top: 35px;
  border: none;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

`;

export default function DmListBox({ chatList = [], handleChangeRoom }) {

  return (
    <DmListBoxContainer>
      <DmListHeader>
        <UserNameLabel>moong_52</UserNameLabel>
        <IconButton>
          <FaPlusCircle />
        </IconButton>
      </DmListHeader>
      {chatList.map((chat, index) => (
        <DmItem onClick={() => handleChangeRoom(chat.msgRoomId, chat.userImg, chat.userName)}>
          <img src={chat.userImg} alt="프로필" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
          <div>
            <div style={{ marginBottom: '1px' }}>{chat.userName}</div>
            <div style={{ fontSize: '0.8rem' }}>{chat.lastMessage}</div>
          </div>
        </DmItem>
      ))}


    </DmListBoxContainer>
  );
}
