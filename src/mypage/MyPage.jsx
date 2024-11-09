import styled from "styled-components";
import { IoGridOutline, IoGrid } from "react-icons/io5";
import { useEffect, useState, useRef } from "react";
import { getMyPage } from "../api/mypage";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { useParams } from "react-router-dom";
import { FaRegPenToSquare } from "react-icons/fa6";
import { RiUserSettingsLine } from "react-icons/ri";
import { getAuthAxios } from "../api/authAxios";
import BlockUser from "./BlockUser";
import Follow from "./Follow";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import FeedDetail from "../layout/FeedDetail";

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
  cursor: pointer;
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
  width: 29vw;
  justify-content: space-between;
  padding-bottom: 5px;
  display: flex;
  position: relative;
`;

let Nickname = styled.span`
  font-size: 20px;
`;

let EditPopup = styled.div`
  width: 20vw;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1001;
`;

let EditProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto 20px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

let EditInput = styled.input`
  width: 100%;
  padding: 8px;
  margin: 5px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

let EditButton = styled.button`
  padding: 8px 16px;
  background: #706ef4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;
`;

let ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

let SettingWrap = styled.div`
  position: relative;
  display: flex;
  gap: 1.2vw;
  margin-top: 5px;
  margin-right: 1.6vw;
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
  left: 2.4vw;
  top: 4.7vh;
  width: 8vw;
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

let StatusMessageWrap = styled.div`
  width: 15vw;
`;

let StatusMessage = styled.span`
  font-size: 16px;
`;

let ButtonWrap = styled.div`
  margin-top: 3px;
  display: flex;
  gap: 10px;
  height: 4vh;
  width: 10vw;
`;

let FollowButton = styled.button`
  padding: 5px 10px;
  /* margin-left: 4vw; */
  border-radius: 5px;
  background-color: #706ef4;
  color: white;
  cursor: pointer;
  font-size: 13px;
`;

let BlockButton = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #ff4444;
  color: white;
  cursor: pointer;
  font-size: 13px;
`;

let FollowWrap = styled.div`
  display: flex;
`;

let FollowUl = styled.ul`
  padding-top: 5px;
  display: flex;
  width: 13.7vw;
  justify-content: end;
  padding-right: 0.5vw;
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

// let PostLink = styled.a`
//   width: 100%;
//   height: 100%;
//   display: block;
//   z-index: 1;
//   cursor: pointer;
// `;

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
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editNickname, setEditNickname] = useState("");
  const [editBio, setEditBio] = useState("");
  const [newProfileImage, setNewProfileImage] = useState(null);
  const settingRef = useRef();
  const fileInputRef = useRef();
  const [Iding, setIding] = useState(null);
  const [followType, setFollowType] = useState("followers");
  const [isFollowing, setIsFollowing] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [isBlocker, setIsBlocker] = useState();
  const [isBlocked, setIsBlocked] = useState();
  const [isFeedDetail, setIsFeedDetail] = useState(false);
  const [postDetails, setPostDetails] = useState("null");
  const [coupleId, setCoupleId] = useState(null);

  const { userId } = useParams();
  console.log("Retrieved userId:", userId);

  const handleMessageClick = (post) => {
    console.log("Selected PostId: ", post);
    setPostDetails(post);
    setIsFeedDetail(true);
    console.log("isFeedDetail : ", isFeedDetail);
  };

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
        const userIdRes = await authAxios.get("/user/profile");
        console.log("접속중인 아이디는:", userIdRes.data);
        setIding(userIdRes.data);

        const res = await getMyPage(userId);
        setData(res);
        console.log("API 응답:", res);
        setProfile(res.profile);
        setEditNickname(res.profile.nickname);
        setEditBio(res.profile.bio);
        setIsFollowing(res.profile.followed);
        setIsPrivate(res.profile.private);
        setIsBlocker(res.isBlocker);
        setIsBlocked(res.isBlocked);
        console.log("프로필 정보:", res.profile);
        console.log("차단상태:", res.isBlocker);
        console.log("차단당함상태:", res.isBlocked);
        if (Array.isArray(res.feed)) {
          setPosts(res.feed);
        } else {
          setPosts([]); // 빈 배열로 설정
        }

        // 커플 정보 조회
        const coupleResponse = await authAxios.get("/user/couple");
        console.log(
          "접속한 아이디의 커플아이디:",
          coupleResponse.data.coupleUserId
        );
        setCoupleId(coupleResponse.data.coupleUserId);
      } catch (err) {
        setError(err);
        console.error("데이터 조회 실패:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleBlock = async () => {
    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);

      if (isBlocked) {
        await authAxios.delete(`/user/block/cancel/${userId}`);
        setIsBlocked(false);
      } else {
        await authAxios.post(`/user/block/${userId}`);
        setIsBlocked(true);
      }
    } catch (error) {
      console.error("차단/차단해제 실패:", error);
      alert("차단/차단해제에 실패했습니다.");
    }
  };

  const handleEditProfile = async () => {
    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);

      // 순차적으로 요청 처리
      let isSuccess = true;

      // 닉네임 변경
      if (editNickname !== profile.nickname) {
        console.log("닉네임 변경 요청:", editNickname);
        try {
          await authAxios.patch(`/user/profile/${userId}/update/nickname`, {
            nickName: editNickname,
          });
        } catch (error) {
          console.error("닉네임 변경 실패:", error);
          isSuccess = false;
        }
      }

      // 상태 메시지 변경
      if (editBio !== profile.bio) {
        console.log("상태 메시지 변경 요청:", editBio);
        try {
          await authAxios.patch(`/user/profile/${userId}/update/bio`, {
            bio: editBio,
          });
        } catch (error) {
          console.error("상태 메시지 변경 실패:", error);
          isSuccess = false;
        }
      }

      // 프로필 이미지 변경
      if (newProfileImage) {
        const formData = new FormData();
        formData.append("img", newProfileImage);
        console.log("프로필이미지:", newProfileImage);

        try {
          await authAxios.patch(
            `/user/profile/${userId}/update/img`,
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
          );
        } catch (error) {
          console.error("프로필 이미지 수정 실패:", error);
          isSuccess = false;
        }
      }

      if (isSuccess) {
        setShowEditPopup(false);
        alert("프로필이 성공적으로 수정되었습니다.");
        window.location.reload();
      } else {
        alert("일부 프로필 수정에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.error("프로필 수정 실패:", error);
      if (error.response) {
        switch (error.response.status) {
          case 403:
            alert("프로필 수정 권한이 없습니다.");
            break;
          case 404:
            alert("프로필이 존재하지 않습니다.");
            break;
          case 400:
            alert("잘못된 요청입니다.");
            break;
          default:
            alert("프로필 수정에 실패했습니다.");
        }
      } else {
        alert("프로필 수정에 실패했습니다.");
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log("선택한 파일 타입:", file.type);
    if (file) {
      const validImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/jpg",
      ];
      if (validImageTypes.includes(file.type)) {
        setNewProfileImage(file);
      } else {
        alert(
          "지원하지 않는 파일 형식입니다. JPG, PNG, GIF 파일만 업로드 가능합니다."
        );
        e.target.value = "";
      }
    }
  };

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
    fetchPosts(type);
  };

  const handleFollow = async () => {
    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);

      console.log("팔로우상태:", isFollowing);
      if (isFollowing) {
        await authAxios.delete(`/follow/cancel/${userId}`);
        setIsFollowing(false);
        setProfile((prev) => ({
          ...prev,
          followed: false,
          followerCount: prev.followerCount - 1,
        }));
      } else {
        await authAxios.post(`/follow/${userId}`);
        setIsFollowing(true);
        setProfile((prev) => ({
          ...prev,
          followed: true,
          followerCount: prev.followerCount + 1,
        }));
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
        `/user/profile/${userId}/update/${isPrivate ? "public" : "private"}`
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
  console.log("프로필 이미지 URL:", profile.userimg);
  console.log("상대프로필 이미지 URL:", profile.pairimg);

  const shouldShowPosts =
    !isPrivate || profile.followed || String(Iding) === userId;

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
          {showEditPopup && (
            <EditPopup>
              <h3>프로필 수정</h3>
              <EditProfileImage>
                <img
                  src={
                    newProfileImage
                      ? URL.createObjectURL(newProfileImage)
                      : profile.userimg
                  }
                  alt="프로필 이미지"
                />
              </EditProfileImage>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ marginBottom: "10px" }}
              />
              <EditInput
                type="text"
                value={editNickname}
                onChange={(e) => setEditNickname(e.target.value)}
                placeholder="닉네임"
              />
              <EditInput
                type="text"
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                placeholder="상태메시지"
              />
              <ButtonWrapper>
                <EditButton onClick={handleEditProfile}>저장</EditButton>
                <EditButton onClick={() => setShowEditPopup(false)}>
                  취소
                </EditButton>
              </ButtonWrapper>
            </EditPopup>
          )}
          <FollowWrap>
            {Iding && userId && String(Iding) !== userId && (
              <ButtonWrap>
                <FollowButton onClick={handleFollow}>
                  {profile.followStatus
                    ? "요청중"
                    : profile.followed
                    ? "팔로잉"
                    : "팔로우"}
                </FollowButton>
                {userId !== String(coupleId) && (
                  <BlockButton onClick={handleBlock}>
                    {isBlocked ? "차단해제" : "차단하기"}
                  </BlockButton>
                )}
              </ButtonWrap>
            )}
            {Iding && userId && String(Iding) === userId && (
              <SettingWrap ref={settingRef}>
                <FaRegPenToSquare
                  className="icon"
                  onClick={() => setShowEditPopup(true)}
                />
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
            <FollowUl>
              <FollowLi
                onClick={() => {
                  setFollowType("follower");
                  setShowFollow(true);
                }}
              >
                <Nickname style={{ paddingRight: "8px", fontSize: "18px" }}>
                  팔로워
                </Nickname>
                <Nickname style={{ fontSize: "18px" }}>
                  {profile.followerCount}
                </Nickname>
              </FollowLi>
              <FollowLi
                onClick={() => {
                  setFollowType("following");
                  setShowFollow(true);
                }}
              >
                <Nickname
                  style={{
                    paddingLeft: "20px",
                    paddingRight: "10px",
                    fontSize: "18px",
                  }}
                >
                  팔로잉
                </Nickname>
                <Nickname style={{ fontSize: "18px" }}>
                  {profile.followingCount}
                </Nickname>
              </FollowLi>
            </FollowUl>
          </FollowWrap>
        </Header>
        <MenuWrap>
          <Menu onClick={() => handleTabClick("feed")}>
            {activeTab === "feed" ? (
              <IoGrid style={{ width: "100%", height: "100%" }} />
            ) : (
              <IoGridOutline style={{ width: "100%", height: "100%" }} />
            )}
          </Menu>
          {String(Iding) === userId && (
            <>
              <Menu onClick={() => handleTabClick("like")}>
                {activeTab === "like" ? (
                  <IoMdHeart style={{ width: "100%", height: "100%" }} />
                ) : (
                  <IoMdHeartEmpty style={{ width: "100%", height: "100%" }} />
                )}
              </Menu>
              <Menu onClick={() => handleTabClick("bookmark")}>
                {activeTab === "bookmark" ? (
                  <GoBookmarkFill style={{ width: "100%", height: "100%" }} />
                ) : (
                  <GoBookmark style={{ width: "100%", height: "100%" }} />
                )}
              </Menu>
            </>
          )}
        </MenuWrap>

        <PostList>
          {isBlocked ? (
            <div>차단한 유저의 피드는 볼 수 없습니다.</div>
          ) : isBlocker ? (
            <div>차단당한 상대의 피드는 볼 수 없습니다.</div>
          ) : shouldShowPosts ? (
            posts.length > 0 ? (
              posts.map((post) => (
                <Post key={post.PostId}>
                  {post.fileType === "IMAGE" && (
                    <img style={{cursor:"pointer"}} src={post.fileUrl} onClick={() => handleMessageClick(post)} alt="썸네일" />
                  )}
                  {/* <PostLink
                  onClick={() => handleMessageClick(post)}
                  /> */}
                </Post>
              ))
            ) : (
              <div>게시글이 없습니다.</div>
            )
          ) : (
            <div>비공개 계정입니다. 팔로우 후 게시글을 볼 수 있습니다.</div>
          )}
        </PostList>
      </Content>
      {isFeedDetail && (
        <FeedDetail
          isOpen={isFeedDetail}
          onClose={() => setIsFeedDetail(false)}
          post={postDetails} // 선택된 포스트 전달
        />
      )}
    </div>
  );
}

export default MyPage;
