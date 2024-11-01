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

const FollowPopup = styled.div`
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

const FollowItem = styled.div`
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

const FollowButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 5px;

  &:hover {
    color: #333;
  }
`;

function Follow({ onClose, type, userId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const endpoint =
          type === "followers"
            ? `http://localhost:9090/follow/follower/${userId}`
            : `http://localhost:9090/follow/following/${userId}`;

        const response = await authAxios.get(endpoint);
        setUsers(response.data);
        console.log(`${type} 목록:`, response.data);
      } catch (error) {
        console.error(`${type} 목록을 불러오는데 실패했습니다:`, error);
      }
    };
    fetchUsers();
  }, [type, userId]);

  const handleFollow = (targetUserId) => async () => {
    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);
      const response = await authAxios.post(
        `http://localhost:9090/user/follow/${targetUserId}`
      );

      if (response.status === 200) {
        // UI 업데이트 로직
        console.log("팔로우/언팔로우 성공");
      }
    } catch (error) {
      console.error("팔로우/언팔로우 실패:", error);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <FollowPopup onClick={(e) => e.stopPropagation()}>
        {users.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "20px", marginTop: "6.5vw" }}
          >
            {type === "followers"
              ? "팔로워가 없습니다."
              : "팔로잉하는 유저가 없습니다."}
          </div>
        ) : (
          users.map((user) => (
            <FollowItem key={user.loginId}>
              <UserInfo
                onClick={() =>
                  (window.location.href = `/user/profile/${user.userId}`)
                }
                style={{ cursor: "pointer" }}
              >
                <UserImage>
                  <img src={user.userImg || profilethum} alt="프로필 썸네일" />
                </UserImage>
                <UserId>{user.loginId}</UserId>
              </UserInfo>
              <FollowButton onClick={handleFollow(user.userId)}>
                {type === "followers" ? "팔로우" : "언팔로우"}
              </FollowButton>
            </FollowItem>
          ))
        )}
      </FollowPopup>
    </Overlay>
  );
}

export default Follow;
