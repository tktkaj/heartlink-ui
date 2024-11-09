import styled from "styled-components";
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
  padding: 12px 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;

  &:hover {
    background-color: #e6e6ff;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
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
  font-size: 15px;
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
        const response = await authAxios.get("/user/block/list");
        setBlockedUsers(response.data.content);

        console.log("차단 유저 목록", response.data);
      } catch (error) {
        console.error("차단 유저 목록을 불러오는데 실패했습니다:", error);
      }
    };
    fetchBlockedUsers();
  }, []);

  const handleUnblock = (blockedUserId) => async () => {
    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);
      const response = await authAxios.delete(
        `/user/block/cancel/${blockedUserId}`
      );

      if (response.status >= 200 && response.status < 300) {
        // DB 삭제 성공 시에만 UI 업데이트
        setBlockedUsers(
          blockedUsers.filter((user) => user.blockedUserId !== blockedUserId)
        );
        console.log("차단 해제 성공");
      } else {
        console.error("차단 해제 실패: 서버 응답이 성공이 아님");
        alert("차단 해제에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("차단 해제에 실패했습니다:", error);
      alert("차단 해제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <Overlay onClick={onClose}>
      <BlockUserPopup onClick={(e) => e.stopPropagation()}>
        {blockedUsers.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "20px", marginTop: "6.5vw" }}
          >
            차단된 유저가 없습니다.
          </div>
        ) : (
          blockedUsers.map((user) => (
            <BlockUserItem key={user.blockedLoginId}>
              <UserInfo
                onClick={() =>
                  (window.location.href = `/user/profile/${user.blockedUserId}`)
                }
                style={{ cursor: "pointer" }}
              >
                <UserImage>
                  <img
                    src={user.blockedImg || profilethum}
                    alt="프로필 썸네일"
                  />
                </UserImage>
                <div>
                  <UserId>{user.blockedLoginId}</UserId>
                  <div style={{ fontSize: "0.9em", color: "#666" }}>
                    {user.blockedBio}
                  </div>
                </div>
              </UserInfo>
              <UnblockButton onClick={handleUnblock(user.blockedUserId)}>
                해제
              </UnblockButton>
            </BlockUserItem>
          ))
        )}
      </BlockUserPopup>
    </Overlay>
  );
}

export default BlockUser;
