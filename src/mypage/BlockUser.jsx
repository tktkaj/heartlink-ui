import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import profilethum from "../image/sidebar/test.png";
import { getAuthAxios } from "../api/authAxios";
import { useEffect, useState } from "react";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const BlockUserPopup = styled.div`
  width: 300px;
  height: 300px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 15px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 10px;
  }
`;

const BlockUserItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserImage = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const UserId = styled.span`
  font-size: 14px;
`;

const UnblockButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 5px;

  &:hover {
    color: #333;
  }
`;

function BlockUser({ onClose }) {
  const [blockedUsers, setBlockedUsers] = useState([]);

  useEffect(() => {
    const fetchBlockedUsers = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const response = await authAxios.get(
          "http://localhost:9090/user/block/list"
        );
        setBlockedUsers(response.data);
        console.log("차단 유저 목록", response.data);
      } catch (error) {
        console.error("차단 유저 목록을 불러오는데 실패했습니다:", error);
      }
    };

    fetchBlockedUsers();
  }, []);

  //   const handleUnblock = async (userId) => {
  //     try {
  //       const access = localStorage.getItem("access");
  //       const authAxios = getAuthAxios(access);
  //       await authAxios.delete(
  //         `http://localhost:9090/user/block/cancel/${blockedUserId}`
  //       );
  //       setBlockedUsers(blockedUsers.filter((user) => user.id !== userId));
  //     } catch (error) {
  //       console.error("차단 해제에 실패했습니다:", error);
  //     }
  //   };

  return (
    <Overlay onClick={onClose}>
      <BlockUserPopup onClick={(e) => e.stopPropagation()}>
        {blockedUsers.map((user) => (
          <BlockUserItem key={user.blockedLoginId}>
            <UserInfo>
              <UserImage>
                <img src={user.blockedImg || profilethum} alt="프로필 썸네일" />
              </UserImage>
              <UserId>{user.blockedLoginId}</UserId>
            </UserInfo>
            <UnblockButton>
              <IoClose size={20} />
            </UnblockButton>
          </BlockUserItem>
        ))}
      </BlockUserPopup>
    </Overlay>
  );
}

export default BlockUser;
