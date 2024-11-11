import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdShare } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import defaultImg from "../image/logo/fav.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAuthAxios } from "../api/authAxios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FeedDetail from "../layout/FeedDetail";
import { PiSirenDuotone } from "react-icons/pi";
import Report from "../layout/Report";
const FeedBox = styled.div`
  width: 37vw;
  height: 84vh;
  border: 1px solid rgba(160, 160, 160, 0.5);
  border-radius: 4%;
  background-color: white;
  margin-left: 150px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfilePhoto = styled.div`
  width: 42px;
  height: 42px;
  overflow: hidden;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FeedProfile = styled.div`
  font-family: "SokchoBadaBatang";
  display: flex;
  align-items: center;
  width: 34vw;
  height: 72px;
  h3 {
    font-family: "SBAggroB";
    color: #706ef4;
    font-size: 19px;
  }
  justify-content: space-between;
`;

const ProfileTxt = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FeedIcons = styled.div`
  display: flex;
  width: 34vw;
  justify-content: space-between;
  height: 7vh;
  align-items: center;
  .feedIcon {
    width: 25px;
    height: 25px;
    &:hover {
      color: #706ef4;
      opacity: 0.8;
    }
  }
`;

const FeedInfo = styled.div`
  display: flex;
  text-align: left;
  justify-content: flex-start;
  gap: 13px;
  font-size: 15px;
  color: gray;
  width: 100%;
  padding-left: 22px;
`;

const FeedContent = styled.div`
  display: flex;
  text-align: left;
  justify-content: flex-start;
  width: 100%;
  padding-left: 22px;
  margin-top: 10px;
  gap: 8px;
`;

const SliderContainer = styled.div`
  width: 37vw;
  height: 55vh;
  margin: 0 auto;
  overflow: hidden;
`;

const FeedImages = styled.div`
  height: 55vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 99.7%;
    height: 100%;
    object-fit: cover;
  }
`;

const HeartPost = styled(IoIosHeartEmpty)`
  width: 25px;
  height: 25px;
  cursor: pointer;
  color: ${(props) => (props.liked ? "red" : "black")};
`;

const BookmarkPost = styled(FaRegBookmark)`
  width: 25px;
  height: 25px;
  cursor: pointer;
  color: ${(props) => (props.bookmarked ? "#706EF4" : "black")};
`;

export default function Feed() {
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isFeedDetail, setIsFeedDetail] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const openModal = (event, postId, userId) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    setModalPosition({
      top: buttonRect.bottom + 10, // 버튼의 아래쪽 위치
      left: buttonRect.left - 50, // 버튼의 왼쪽 위치
    });
    setIsModalOpen(true);
    setSelectedPost({ postId, userId });
  };

  // 시간 처리 함수
  function formatTimeDifference(createdAt) {
    const now = new Date();
    const postTime = new Date(createdAt);
    const timeDiff = now - postTime; // 밀리초 단위 차이

    const seconds = Math.floor(timeDiff / 1000); // 초
    const minutes = Math.floor(seconds / 60); // 분
    const hours = Math.floor(minutes / 60); // 시간
    const days = Math.floor(hours / 24); // 일
    const months =
      now.getMonth() -
      postTime.getMonth() +
      (now.getFullYear() - postTime.getFullYear()) * 12; // 월 차이

    if (seconds < 60) {
      return "방금 전"; // 1분 이내
    } else if (minutes < 60) {
      return `${minutes}분 전`; // 1시간 이내
    } else if (hours < 24) {
      return `${hours}시간 전`; // 1일 이내
    } else if (days < 30) {
      return `${days}일 전`; // 1개월 이내
    } else if (days >= 30 && days < 365) {
      return `${months}개월 전`; // 1년 이내
    } else {
      // 1년 이상 차이가 날 경우 yyyy-MM-dd 형식
      const year = postTime.getFullYear();
      const month = String(postTime.getMonth() + 1).padStart(2, "0");
      const day = String(postTime.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const truncateContent = (content) => {
    if (!content) return ""; // content가 없으면 빈 문자열을 반환
    const maxLength = 100; // 임의로 설정한 최대 길이
    return content.length > maxLength
      ? content.slice(0, maxLength) + "..."
      : content;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [ads, setAds] = useState([]);

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const result = await authAxios.get("/feed");

        const allPosts = [
          ...(result.data.followingPosts || []),
          ...(result.data.nonFollowedPosts || []),
        ];
        setPosts(allPosts);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Failed to fetch posts.");
      } finally {
        setLoading(false);
      }
    };
    // 호출
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const result = await authAxios.get("/ads/get");
        setAds(result.data);
        console.log("광고 데이터:", result.data);
      } catch (err) {
        console.error("Failed to fetch ads:", err);
        setError("Failed to fetch ads.");
      }
    };
    fetchAds();
  }, []);

  const combinedFeed = [];
  let postIndex = 0;
  let adIndex = 0;

  // 피드와 광고를 번갈아 가며 결합
  while (postIndex < posts.length) {
    // 3개의 피드를 추가
    for (let i = 0; i < 3 && postIndex < posts.length; i++) {
      combinedFeed.push({ type: "post", content: posts[postIndex++] });
    }
    // 3개의 피드 후에 광고가 있다면 광고를 추가
    if (adIndex < ads.length && postIndex % 3 === 0) {
      combinedFeed.push({ type: "ad", content: ads[adIndex++] });
    }
  }

  /*************** 유저 팔로우 ***************/
  const handleFollow = async (userId, e) => {
    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);
      const res = await authAxios.post(`/follow/${userId}`);

      if (res.status === 201) {
        toast.success(res.data, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (e) {
      switch (e.status) {
        case 404:
          toast.warn("서버에서 오류가 발생하였습니다.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
          break;
        case 409:
          toast.warn(e.response.data, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
          break;
        case 500:
          toast.warn("서버에 오류가 생겼습니다.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
          break;
      }
    }
  };

  /*************** 게시물 삭제 ***************/
  const handlePostDelete = async (postId, e) => {
    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);
      const res = await authAxios.delete(`/feed/${postId}/delete`);

      if (res.status === 201) {
        toast.success(res.data, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (e) {
      switch (e.status) {
        case 404:
          toast.warn("권한이 존재하지않아요ㅠㅜ", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
          break;
        case 500:
          toast.warn("서버에 오류가 생겼습니다ㅜㅠ", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
          break;
      }
    }
  };

  /*************** 게시물 좋아요 ***************/
  const handlePostLike = async (postId, e) => {
    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);
      const res = await authAxios.post("/like/toggle", null, {
        params: { postId: postId },
      });

      if (res.status === 200) {
        toast.success(res.data, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }
    } catch (e) {
      switch (e.status) {
        case 404:
          toast.warn("권한이 존재하지않아요ㅠㅜ", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
          break;
        case 500:
          toast.warn("서버에 오류가 생겼습니다ㅜㅠ", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
          break;
      }
    }
  };

  /*************** 게시물 공유 ***************/
  const handlePostShare = () => {
    const shareLink = window.location.href;
    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        toast.success("대시보드에 링크가 저장되었습니다.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      })
      .catch(() => {
        toast.warn("링크 저장을 실패하였습니다.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      });
  };

  /*************** 게시물 북마크 ***************/
  const handlePostBookmark = async (postId, e) => {
    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);
      const res = await authAxios.post(`/bookmark/${postId}`);

      if (res.status === 200) {
        if (res.data === "북마크 추가됨") {
          toast.success("내 북마크 목록에 추가했습니다.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
        } else if (res.data === "북마크 삭제됨") {
          toast.error("내 북마크 목록에서 제거했습니다.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
      }
    } catch (e) {
      switch (e.status) {
        case 404:
          toast.warn("권한이 존재하지않아요ㅠㅜ", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
          break;
        case 500:
          toast.warn("서버에 오류가 생겼습니다ㅜㅠ", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
          break;
      }
    }
  };

  const handleMessageClick = (post) => {
    console.log("Selected PostId: ", post.postId); // 로그 추가
    setSelectedPost(post); // 선택한 포스트 데이터 저장
    setIsFeedDetail(true); // FeedDetail 모달 열기
  };

  return (
    <div>
      <ToastContainer />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      {combinedFeed.map((item, index) => (
        <div key={index}>
          {item.type === "post" ? (
            // 피드 렌더링
            <FeedBox>
              {isModalOpen && (
                <Report
                  closeModal={closeModal}
                  position={modalPosition}
                  post={item.content}
                />
              )}
              <FeedProfile>
                <ProfileTxt>
                  <a
                    href={`http://localhost:3000/user/profile/${item.content.userId}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <ProfilePhoto>
                      <img
                        src={item.content.profileImg || defaultImg}
                        alt="프사"
                      />
                    </ProfilePhoto>
                    <p style={{ fontSize: "21px", cursor: "pointer" }}>
                      {item.content.loginId}
                    </p>
                  </a>
                  <h3>&</h3>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "gray",
                      marginBottom: "-5px",
                    }}
                  >
                    {item.content.partnerId}
                  </p>
                </ProfileTxt>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    style={{
                      backgroundColor: "#706EF4",
                      width: "70px",
                      height: "30px",
                      paddingTop: "3px",
                    }}
                    className="flex w-full justify-center rounded-md text-sm font-semibold leading-6 text-white shadow-sm"
                    onClick={(e) => handleFollow(item.content.userId, e)}
                  >
                    팔로우
                  </button>
                  <PiSirenDuotone
                    style={{
                      width: "25px",
                      height: "25px",
                      cursor: "pointer",
                      marginTop: "5px",
                    }}
                    onClick={(e) =>
                      openModal(e, item.content.postId, item.content.userId)
                    }
                  />
                </div>
              </FeedProfile>
              <SliderContainer>
                <Slider {...settings}>
                  {item.content.files.map((image, index) => (
                    <FeedImages key={index}>
                      <img
                        src={image.fileUrl || defaultImg}
                        alt={`피드사진 ${index + 1}`}
                      />
                    </FeedImages>
                  ))}
                </Slider>
              </SliderContainer>
              <FeedIcons>
                <div style={{ display: "flex", gap: "20px" }}>
                  <HeartPost
                    onClick={(e) => handlePostLike(item.content.postId, e)}
                    liked={item.content.liked}
                  />
                  <FiMessageCircle
                    className="feedIcon"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleMessageClick(item.content)}
                  />
                  <IoMdShare
                    className="feedIcon"
                    style={{ cursor: "pointer" }}
                    onClick={handlePostShare}
                  />
                </div>
                <BookmarkPost
                  onClick={(e) => handlePostBookmark(item.content.postId, e)}
                  bookmarked={item.content.bookmarked}
                />
              </FeedIcons>
              <FeedInfo>
                <p>{formatTimeDifference(item.content.createdAt)}</p>
                <p>좋아요 {item.content.likeCount}개</p>
                <p>댓글 {item.content.commentCount}개</p>
              </FeedInfo>
              <FeedContent>
                <p>
                  {item.content.content.length > 20
                    ? `${item.content.content.slice(0, 20)}...`
                    : item.content.content}
                </p>
                <div>
                  <p
                    style={{
                      fontSize: "15px",
                      color: "gray",
                      cursor: "pointer",
                    }}
                    onClick={() => handleMessageClick(item.content)}
                  >
                    더보기
                  </p>
                </div>
              </FeedContent>
            </FeedBox>
          ) : (
            // 광고 렌더링
            <div className="ad">
              <FeedBox>
                <FeedProfile>
                  <ProfileTxt>
                    <ProfilePhoto>
                      <img src={defaultImg} alt="광고 프로필" />
                    </ProfilePhoto>
                    <p style={{ fontSize: "21px", cursor: "pointer" }}>
                      Ad_Manager
                    </p>
                  </ProfileTxt>
                </FeedProfile>
                <SliderContainer>
                  <Slider {...settings}>
                    <FeedImages>
                      <img
                        src={item.content.imgUrl}
                        alt="광고 이미지"
                        onClick={() =>
                          window.open(item.content.siteUrl, "_blank")
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </FeedImages>
                  </Slider>
                </SliderContainer>
                <FeedIcons>
                  <div style={{ display: "flex", gap: "20px" }}>
                    <IoIosHeartEmpty
                      className="feedIcon"
                      style={{ cursor: "pointer" }}
                    />
                    <FiMessageCircle
                      className="feedIcon"
                      style={{ cursor: "pointer" }}
                    />
                    <IoMdShare
                      className="feedIcon"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <FaRegBookmark
                    className="feedIcon"
                    style={{ cursor: "pointer" }}
                  />
                </FeedIcons>
                <FeedInfo>
                  <p>{formatTimeDifference(item.content.searchTime)}</p>
                  <p>좋아요 32개</p>
                  <p>댓글 21개</p>
                </FeedInfo>
                <FeedContent>
                  <p>
                    {item.content.title.length > 20
                      ? `${item.content.title.slice(0, 20)}...`
                      : item.content.title}
                  </p>
                  <div>
                    <p style={{ fontSize: "15px", color: "gray" }}>더보기</p>
                  </div>
                </FeedContent>
              </FeedBox>
            </div>
          )}
        </div>
      ))}
      {isFeedDetail && (
        <FeedDetail
          isOpen={isFeedDetail}
          onClose={() => setIsFeedDetail(false)}
          post={selectedPost} // 선택된 포스트 전달
        />
      )}
    </div>
  );
}