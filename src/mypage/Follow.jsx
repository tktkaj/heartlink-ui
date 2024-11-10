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
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const response = await authAxios.get("/user/profile");
        setLoggedInUserId(response.data);
      } catch (error) {
        console.error("로그인 유저 정보 불러오기 실패:", error);
      }
    };
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const endpoint =
          type === "follower"
            ? `/follow/follower/${userId}`
            : `/follow/following/${userId}`;

        const response = await authAxios.get(endpoint);
        console.log("팔로워팔로잉", response.data.content);
        setUsers(response.data.content);
      } catch (error) {
        console.error(`${type} 목록을 불러오는데 실패했습니다:`, error);
      }
    };
    fetchUsers();
  }, [type, userId]);

  const handleFollow = async (targetUserId) => {
    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);

      const endpoint =
        type === "follower"
          ? `/follow/delete/${targetUserId}`
          : `/follow/cancel/${targetUserId}`;

      const response = await authAxios.delete(endpoint);

      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => {
            console.log(targetUserId, user.followerUserId);
            return type === "follower"
              ? user.followerUserId !== targetUserId
              : user.followingUserId !== targetUserId;
          })
        );
      }
    } catch (error) {
      console.error(
        type === "follower" ? "팔로워 끊기 실패:" : "언팔로우 실패:",
        error
      );
    }
  };

  return (
    <Overlay onClick={onClose}>
      <FollowPopup onClick={(e) => e.stopPropagation()}>
        {users.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "20px", marginTop: "6.5vw" }}
          >
            {type === "follower"
              ? "팔로워가 없습니다."
              : "팔로잉하는 유저가 없습니다."}
          </div>
        ) : (
          users.map((user) => (
            <FollowItem key={user.loginId}>
              <UserInfo
                onClick={() =>
                  (window.location.href = `/user/profile/${
                    type === "follower"
                      ? user.followerUserId
                      : user.followingUserId
                  }`)
                }
                style={{ cursor: "pointer" }}
              >
                <UserImage>
                  <img
                    src={
                      type === "follower"
                        ? user.followerImg || profilethum
                        : user.followingImg || profilethum
                    }
                    alt="프로필 썸네일"
                  />
                </UserImage>
                <div>
                  <UserId>
                    {type === "follower"
                      ? user.followerLoginId
                      : user.followingLoginId}
                  </UserId>
                  <div style={{ fontSize: "0.9em", color: "#666" }}>
                    {type === "follower" ? user.followerBio : user.followingBio}
                  </div>
                </div>
              </UserInfo>
              {String(loggedInUserId) === userId && (
                <FollowButton
                  onClick={() =>
                    handleFollow(
                      type === "follower"
                        ? user.followerUserId
                        : user.followingUserId
                    )
                  }
                >
                  {type === "follower" ? "팔로워 끊기" : "언팔로우"}
                </FollowButton>
              )}
            </FollowItem>
          ))
        )}
      </FollowPopup>
    </Overlay>
  );
}

export default Follow;
