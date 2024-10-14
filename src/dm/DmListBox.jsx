import React from 'react';
import styled from 'styled-components';
import profileImg from '../image/testimg/와구리.png';
import { FaPlusCircle } from "react-icons/fa";

const DmListBoxContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 300px;
  border-right: 1px solid #ddd;
  background-color: #F8F8FA;
`;

const DmListHeader = styled.div`
  display: flex;
  padding-top: 15px;
  margin-bottom: 20px;
  margin-right: auto;
  margin-left: 15px;
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
`;

const UserNameLabel = styled.div`
  height: 35px;
  font-size: 1.8rem;
`
const IconButton = styled.button`

  height: 35px;
  background: none;
  position: absolute;
  right: 5px;
  top: 20px;
  border: none;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

`;

export default function DmListBox() {
  return (
    <DmListBoxContainer>
      <DmListHeader>
        <UserNameLabel>moong_52</UserNameLabel>
        <IconButton>
          <FaPlusCircle />
        </IconButton>
      </DmListHeader>
      <DmItem>
        <img src={profileImg} alt="프로필" style={{ width: '50px', borderRadius: '50%' }} />
        <div>Hyuna</div>
      </DmItem>
      <DmItem>
        <img src={profileImg} alt="프로필" style={{ width: '50px', borderRadius: '50%' }} />
        <div>tktkaj</div>
      </DmItem>
    </DmListBoxContainer>
  );
}
