import styled from "styled-components";
import { CgMenuGridR } from "react-icons/cg";
import { IoHeart } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import SideMenu from "../sideMenu/SideMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { getMyPage } from "../api/mypage";
import { getAuthAxios } from "../api/authAxios";

let Content = styled.div`
  width: 100vw;
  background-color: #f8f8fa;
  height: 100vh;
  overflow-y: auto;

  /* 스크롤바 숨기기 */
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
  padding-bottom: 5px;
`;

let Nickname = styled.span`
  font-size: 20px;
`;

let StatusMessageWrap = styled.div``;

let StatusMessage = styled.span`
  font-size: 16px;
`;

let FollowWrap = styled.div`
  padding-left: 100px;
`;

let Follow = styled.ul`
  display: flex;
`;

let FollowLi = styled.li``;

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMyPage();
        setData(res);
        console.log("API 응답:", res);
        console.log("유저아이디는:", res.userId);
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const profileData = await authAxios.get(
          `http://localhost:9090/user/profile/${res.userId}`
        );
        setProfile(profileData.data);
        console.log("프로필 정보:", profileData.data);
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

  return (
    <div style={{ display: "flex" }}>
      <SideMenu />
      <Content>
        <Header>
          <MainProfile>
            <img src={profile.userimg} alt="내프사" />
            <SubProfile
              onClick={() =>
                (window.location.href = `/user/profile/${profile.pairId}`)
              }
              style={{ cursor: "pointer" }}
            >
              <img src={profile.pairimg} alt="짝프사" />
            </SubProfile>
          </MainProfile>

          <WordWrap>
            <NicknameWrap>
              <Nickname> {profile.nickname}</Nickname>
              <Nickname style={{ paddingLeft: "15px" }}>
                {profile.loginId}
              </Nickname>
            </NicknameWrap>
            <StatusMessageWrap>
              <StatusMessage>
                {profile.bio || "상태메세지가 없습니다."}
              </StatusMessage>
            </StatusMessageWrap>
          </WordWrap>

          <FollowWrap>
            <Follow>
              <FollowLi>
                <Nickname style={{ paddingRight: "10px" }}>팔로워</Nickname>
                <Nickname>{profile.followerCount}</Nickname>
              </FollowLi>
              <FollowLi>
                <Nickname style={{ paddingLeft: "30px", paddingRight: "10px" }}>
                  팔로잉
                </Nickname>
                <Nickname>{profile.followingCount}</Nickname>
              </FollowLi>
            </Follow>
          </FollowWrap>
        </Header>
        <MenuWrap>
          <Menu onClick={() => handleTabClick("feed")}>
            <CgMenuGridR style={{ width: "100%", height: "100%" }} />
          </Menu>
          <Menu onClick={() => handleTabClick("like")}>
            <IoHeart style={{ width: "100%", height: "100%" }} />
          </Menu>
          <Menu onClick={() => handleTabClick("bookmark")}>
            <IoBookmark style={{ width: "100%", height: "100%" }} />
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
