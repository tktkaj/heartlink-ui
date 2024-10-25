import styled from "styled-components";
import { CgMenuGridR } from "react-icons/cg";
import { IoHeart } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import SideMenu from "../sideMenu/SideMenu";
import { useEffect, useState } from "react";
import axios from "axios";
import { getMyPage } from "../api/mypage";

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
  border-radius: 100%;
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  position: relative;
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
  z-index: 4;
  outline: 5px solid white;
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
  const [data, setData] = useState();

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {

    getMyPage(() => {
      getMyPage().then((res) => {
        setData(res);
      })
    }, [])

    const fetchProfileData = async () => {
      try {
        const profileResponse = await axios.get(
          "https://virtserver.swaggerhub.com/changemode777/HeartLink/1.0.0/user/profile/1"
        );
        setProfile(profileResponse.data);
        fetchPosts(0); // 처음 로드할 때 기본 탭의 포스트를 가져옴
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const fetchPosts = async (tabIndex) => {
    try {
      let postsResponse;
      if (tabIndex === 0) {
        postsResponse = await axios.get(
          "https://virtserver.swaggerhub.com/changemode777/HeartLink/1.0.0/feed/2/couple"
        );
        setPosts(postsResponse.data.feed || []);
      } else if (tabIndex === 1) {
        postsResponse = await axios.get(
          "https://virtserver.swaggerhub.com/changemode777/HeartLink/1.0.0/feed/2/like"
        );
        setPosts(postsResponse.data.feeds || []);
      } else if (tabIndex === 2) {
        postsResponse = await axios.get(
          "https://virtserver.swaggerhub.com/changemode777/HeartLink/1.0.0/feed/2/bookmark"
        );
        setPosts(postsResponse.data.feeds || []);
      }
      console.log(postsResponse.data);
    } catch (err) {
      setError(err);
    }
  };

  const handleMenuClick = (tabIndex) => {
    setActiveTab(tabIndex);
    fetchPosts(tabIndex); // 클릭 시 포스트를 가져옴
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ display: "flex" }}>
      <SideMenu />
      <Content>
        <Header>
          <MainProfile background={profile.userimg}>
            <SubProfile background={profile.pairimg}></SubProfile>
          </MainProfile>

          <WordWrap>
            <NicknameWrap>
              <Nickname>{profile.nickname}</Nickname>
              <Nickname style={{ paddingLeft: "15px" }}>
                {profile.userId}
              </Nickname>
            </NicknameWrap>
            <StatusMessageWrap>
              <StatusMessage>{profile.statusMessage}</StatusMessage>
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
          <Menu onClick={() => handleMenuClick(0)}>
            <CgMenuGridR style={{ width: "100%", height: "100%" }} />
          </Menu>
          <Menu onClick={() => handleMenuClick(1)}>
            <IoHeart style={{ width: "100%", height: "100%" }} />
          </Menu>
          <Menu onClick={() => handleMenuClick(2)}>
            <IoBookmark style={{ width: "100%", height: "100%" }} />
          </Menu>
        </MenuWrap>

        <PostList>
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <Post key={index} background={post.feedImg}>
                <PostLink></PostLink>
              </Post>
            ))
          ) : (
            <div>게시글이 없습니다.</div> // 포스트가 없을 경우 대체 내용
          )}
        </PostList>
      </Content>
    </div>
  );
}

export default MyPage;
