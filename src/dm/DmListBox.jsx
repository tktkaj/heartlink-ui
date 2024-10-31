import styled from 'styled-components';
import { FaPlusCircle } from "react-icons/fa";

const DmListBoxContainer = styled.div`
    width: 380px;
    height: 100vh;
    margin-left: 80px;
    background-color: white;
    border-radius: 0 10px 10px 0;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
    position: fixed;
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
  margin-left: 1vw;
  font-size: 1.8rem;
  color: #333;
`;

const DmItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  padding-left: 1vw;
  cursor: pointer;
  &[data-selected="true"] {
    background-color: rgba(112, 110, 244, 0.07);
    color: #333;
  }
  &:hover{
        width: 100%;
        margin-left: auto;
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

export default function DmListBox({dmList, handleChangeRoom, setUserId}) {

  const { username, chatList } = dmList; 
  setUserId(dmList.MyUserId);

  return (
    <DmListBoxContainer>
      <DmListHeader>
        <UserNameLabel>{dmList.MyLoginId}</UserNameLabel>
        <IconButton>
          <FaPlusCircle />
        </IconButton>
      </DmListHeader>
      {chatList && chatList.length > 0 ? (
        chatList.map((chat, index) => (
            <DmItem 
              key={index} 
              onClick={() => handleChangeRoom(chat)}
            >
              <img src={chat.otherUserImg} alt="프로필" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
              <div>
                <div style={{ marginBottom: '1px' }}>{chat.otherLoginId}</div>
                <div style={{ fontSize: '0.8rem' }}>{chat.lastMessage}</div>
              </div>
            </DmItem>
        ))
      ) : (
        <div style={{paddingLeft:"30px"}}>채팅방이 없습니다.</div>
      )}
    </DmListBoxContainer>
  );
}
