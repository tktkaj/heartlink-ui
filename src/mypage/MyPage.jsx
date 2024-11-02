import styled from "styled-components";
import { CgMenuGridR } from "react-icons/cg";
import { IoBookmark } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { getMyPage } from "../api/mypage";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiUserSettingsLine } from "react-icons/ri";
import { getAuthAxios } from "../api/authAxios";
import BlockUser from "./BlockUser";
import Follow from "./Follow";

let Content = styled.div`
  background-color: #f8f8fa;
  height: 100vh;
  width: 100vw;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-left: 20vw;
`;

let Header = styled.div`
  width: 830px;
  height: 260px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid lightgray;
  margin-left: 13vw;
`;

let MainProfile = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

let SubProfile = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 100%;
  position: absolute;
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  bottom: -10px;
  right: 0;
  z-index: 994;
  outline: 5px solid white;
  overflow: hidden;
`;

let WordWrap = styled.div`
  width: 260px;
  flex-grow: 1;
  margin-left: 20px;
`;

let NicknameWrap = styled.div`
  width: 25vw;
  justify-content: space-between;
  padding-bottom: 5px;
  display: flex;
  position: relative;
`;

let Nickname = styled.span`
  font-size: 20px;
`;

let SettingWrap = styled.div`
  display: flex;
  gap: 15px;
  .icon {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
`;

let SettingPopup = styled.div`
  position: absolute;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  right: 0;
  top: 100%;
  overflow: hidden;
`;

let SettingOption = styled.div`
  padding: 15px;
  cursor: pointer;
  text-align: center;
  &:hover {
    background: #e6e6ff;
  }
`;

let StatusMessageWrap = styled.div``;

let StatusMessage = styled.span`
  font-size: 16px;
`;
let FollowButton = styled.button`
  padding: 5px 12px;
  margin-left: 10px;
  border-radius: 5px;
  background-color: #706ef4;
  color: white;
  cursor: pointer;
  font-size: 14px;
`;

let FollowWrap = styled.div`
  padding-left: 100px;
`;

let FollowUl = styled.ul`
  display: flex;
`;

let FollowLi = styled.li`
  cursor: pointer;
`;

let MenuWrap = styled.div`
  width: 830px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 13vw;
`;

let Menu = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
`;

let PostList = styled.div`
  width: 830px;
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-left: 13vw;
  padding-bottom: 10vh;
`;

let Post = styled.div`
  width: 266px;
  height: 245px;
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

let PostLink = styled.a`
  width: 100%;
  height: 100%;
  display: block;
  z-index: 1;
`;

function MyPage() {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    feed: null,
    likes: null,
    bookmarks: null,
  });
  const [activeTab, setActiveTab] = useState(0);
  const [showSettingPopup, setShowSettingPopup] = useState(false);
  const [showBlockUser, setShowBlockUser] = useState(false);
  const [showFollow, setShowFollow] = useState(false);
  const settingRef = useRef();
  const [Iding, setIding] = useState(null);
  const [followType, setFollowType] = useState("followers");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);

  const { userId } = useParams();
  console.log("Retrieved userId:", userId);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingRef.current && !settingRef.current.contains(event.target)) {
        setShowSettingPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const userIdRes = await authAxios.get(
          "http://localhost:9090/user/profile"
        );
        console.log("접속중인 아이디는:", userIdRes.data);
        setIding(userIdRes.data);

        const res = await getMyPage(userId);
        setData(res);
        console.log("API 응답:", res);
        setProfile(res.profile);
        setIsFollowing(res.profile.isFollowing);
        setIsPrivate(res.profile.private);
        console.log("프로필 정보:", res.profile);
        setPosts(res.feed); // 초기 데이터로 feed 설정
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  if (loading) return <div>로딩주웅...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const fetchPosts = (type) => {
    if (type === "feed") {
      setPosts(data.feed);
    } else if (type === "like") {
      setPosts(data.likes);
    } else if (type === "bookmark") {
      setPosts(data.bookmarks);
    }
  };

  const handleTabClick = (type) => {
    setActiveTab(type);
    fetchPosts(type); // 선택된 탭에 맞는 포스트 가져오기
  };

  const handleFollow = async () => {
    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);

      console.log("팔로우상태:", isFollowing);
      if (isFollowing) {
        // 언팔로우
        await authAxios.delete(`http://localhost:9090/follow/cancel/${userId}`);
        setIsFollowing(false);
      } else {
        // 팔로우
        await authAxios.post(`http://localhost:9090/follow/${userId}`);
        setIsFollowing(true);
      }
    } catch (error) {
      console.error("팔로우/언팔로우 실패:", error);
      alert("팔로우/언팔로우에 실패했습니다.");
    }
  };

  const handlePrivacyToggle = async () => {
    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);
      const response = await authAxios.patch(
        `http://localhost:9090/user/profile/${userId}/update/${
          isPrivate ? "public" : "private"
        }`
      );
      if (response.status === 200) {
        setIsPrivate(!isPrivate);
        setProfile({
          ...profile,
          private: !isPrivate,
        });
        console.log("플텍여부:", isPrivate);
        alert(isPrivate ? "계정 공개성공" : "계정 비공개성공");
        console.log(
          isPrivate
            ? "계정이 공개로 변경되었습니다."
            : "계정이 비공개로 변경되었습니다."
        );
      } else if (response.status === 404) {
        console.error("유저를 찾을 수 없습니다.");
        alert("유저를 찾을 수 없습니다.");
      } else if (response.status === 409) {
        console.error("이미 비공개 계정입니다.");
        alert("이미 비공개 계정입니다.");
      } else if (response.status === 403) {
        console.error("계정 상태 변경 권한이 없습니다.");
        alert("계정 상태 변경 권한이 없습니다.");
      }
    } catch (error) {
      console.error("계정 상태 변경 실패:", error);
      alert("계정 상태 변경에 실패했습니다.");
    }
  };

  console.log("Iding:", Iding, "type:", typeof Iding);
  console.log("userId:", userId, "type:", typeof userId);

  return (
    <div style={{ display: "flex" }}>
      <Content>
        <Header>
          <MainProfile>
            <img src={profile.userimg} alt="내프사" />
            <SubProfile
              onClick={() =>
                (window.location.href = `/user/profile/${profile.coupleUserId}`)
              }
              style={{ cursor: "pointer" }}
            >
              <img src={profile.pairimg} alt="짝프사" />
            </SubProfile>
          </MainProfile>

          <WordWrap>
            {showBlockUser && (
              <BlockUser onClose={() => setShowBlockUser(false)} />
            )}

            <NicknameWrap>
              <div>
                <Nickname> {profile.nickname}</Nickname>
                <Nickname style={{ paddingLeft: "15px" }}>
                  {profile.loginId}
                </Nickname>
              </div>
              {Iding && userId && String(Iding) === userId && (
                <SettingWrap ref={settingRef}>
                  <FaRegPenToSquare className="icon" />
                  <RiUserSettingsLine
                    className="icon"
                    onClick={() => setShowSettingPopup(!showSettingPopup)}
                  />
                  {showSettingPopup && (
                    <SettingPopup>
                      <SettingOption
                        onClick={() => {
                          setShowBlockUser(true);
                          setShowSettingPopup(false);
                        }}
                      >
                        차단유저 관리
                      </SettingOption>
                      <SettingOption onClick={handlePrivacyToggle}>
                        {isPrivate ? "계정 공개" : "계정 비공개"}
                      </SettingOption>
                    </SettingPopup>
                  )}
                </SettingWrap>
              )}
              {Iding && userId && String(Iding) !== userId && (
                <FollowButton onClick={handleFollow}>
                  {profile.isFollowing ? "언팔로우" : "팔로우"}
                </FollowButton>
              )}
            </NicknameWrap>
            <StatusMessageWrap>
              <StatusMessage>
                {profile.bio || "상태메세지가 없습니다."}
              </StatusMessage>
            </StatusMessageWrap>
          </WordWrap>
          {showFollow && (
            <Follow
              onClose={() => setShowFollow(false)}
              type={followType}
              userId={userId}
            />
          )}
          <FollowWrap>
            <FollowUl>
              <FollowLi
                onClick={() => {
                  setFollowType("follower");
                  setShowFollow(true);
                }}
              >
                <Nickname style={{ paddingRight: "10px" }}>팔로워</Nickname>
                <Nickname>{profile.followerCount}</Nickname>
              </FollowLi>
              <FollowLi
                onClick={() => {
                  setFollowType("following");
                  setShowFollow(true);
                }}
              >
                <Nickname style={{ paddingLeft: "30px", paddingRight: "10px" }}>
                  팔로잉
                </Nickname>
                <Nickname>{profile.followingCount}</Nickname>
              </FollowLi>
            </FollowUl>
          </FollowWrap>
        </Header>
        <MenuWrap>
          <Menu onClick={() => handleTabClick("feed")}>
            <CgMenuGridR style={{ width: "100%", height: "100%" }} />
          </Menu>
          <Menu onClick={() => handleTabClick("like")}>
            {activeTab === "like" ? (
              <FaHeart style={{ width: "100%", height: "100%" }} />
            ) : (
              <FaRegHeart style={{ width: "100%", height: "100%" }} />
            )}
          </Menu>
          <Menu onClick={() => handleTabClick("bookmark")}>
            {activeTab === "bookmark" ? (
              <IoBookmark style={{ width: "100%", height: "100%" }} />
            ) : (
              <FaRegBookmark style={{ width: "100%", height: "100%" }} />
            )}
          </Menu>
        </MenuWrap>

        <PostList>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <Post key={index}>
                {post.fileType === "IMAGE" && (
                  <img src={post.fileUrl} alt="썸네일" />
                )}
                <PostLink></PostLink>
              </Post>
            ))
          ) : (
            <div>게시글이 없습니다.</div>
          )}
        </PostList>
      </Content>
    </div>
  );
}

export default MyPage;
