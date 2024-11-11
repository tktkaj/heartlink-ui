import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoClose } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import defaultImg from "../image/logo/fav.png";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdShare } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import { getAuthAxios } from "../api/authAxios";
import { TiHeartOutline } from "react-icons/ti";
import { LuSend } from "react-icons/lu";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoPencil } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { GoKebabHorizontal } from "react-icons/go";
import FeedModal from "../layout/FeedModal";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2001;
`;

const ModalContainer = styled.div`
  background: white;
  border-radius: 10px;
  width: 560px;
  height: 585px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 24px;
  color: #fff;
`;

const PreviewModalContainer = styled(ModalContainer)`
  width: 1000px;
  height: 600px;
`;

const PreviewContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const LeftSection = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const PreviewVideo = styled.video`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const RightHeader = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
`;

const Profile = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 100%;
  cursor: pointer;
`;

const LoginId = styled.span`
  font-size: 20px;
  margin-left: 7px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ContentBox = styled.div`
  width: 100%;
  margin: 10px 0px;
`;

const ContentText = styled.span`
  font-size: 14px;
  line-height: 29px;
  display: block;
  margin: 22px 0px;
  white-space: pre-wrap;
`;

const Line = styled.hr`
  width: 100%;
  margin: 10px 0px;
`;

const IconBox = styled.div`
  display: flex;
  width: 100%;
  height: 30px;
  align-items: center;

  .feedIcon {
    width: 25px;
    height: 25px;
    margin-right: 5px;

    

    &:hover {
      color: #706ef4;
      opacity: 0.8;
    }
  }
`;

const HeartPost = styled(IoIosHeartEmpty)`
  width: 25px;
  height: 25px;
  margin-right: 8px;  

  cursor: pointer;
  color: ${(props) => (props.liked ? "red" : "black")};

  &:hover {
        color: #706ef4;
        opacity: 0.8;
      }
`

const LikeCountBox = styled.div`
  width: 100%;
  margin: 10px 0px;
`;

const LikeCount = styled.span``;

const CommentsBox = styled.div`
  width: 100%;
  margin-top: 5px;
  height: 329px;
  overflow-y: auto;
  scrollbar-width: none;
`;

const CommentUl = styled.ul``;
const CommentLi = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 5px;
  width: 100%;
`;

const CommentProfile = styled.div`
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 100%;
  margin-right: 5px;
  cursor: pointer;
`;

const CommentTextBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const CommentWriter = styled.span`
  font-weight: bold;
  font-size: 15px;
  margin-right: 3px;
  cursor: pointer;
`;

const CommentText = styled.span`
  font-size: 13px;
`;

const CommentTextBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DayandReplyBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const Day = styled.span`
  color: #595959;
  font-size: 11px;
  margin-right: 5px;
`;

const ReplyButton = styled.button`
  color: #595959;
  font-size: 11px;
`;

const HeartBox = styled.div`
  margin: 0px 0px 0px auto;
`;

const HeartIcon = styled(TiHeartOutline)`
  cursor: pointer;
  transition: color 0.3s;

  color: ${(props) => (props.liked ? "red" : "black")};

  &:hover {
    color: #706ef4;
    opacity: 0.8;
  }
`;

const CommentWriteBox = styled.div`
  width: 100%;
  margin: auto 0px 0px 0px;
  padding-top: 5px;
  border-top: 1px solid #ccc;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CommentInput = styled.textarea`
  width: 90%;
  height: 35px;
  padding: 10px;
  resize: none;
  font-size: 14px;
  box-sizing: border-box;
  outline: none;
  color: #333;
  margin-top: 5px;
`;

const CommentSend = styled(LuSend)`
  cursor: pointer;
  transition: color;
  width: 25px;
  height: 25px;
  margin-top: 8px;

  &:hover {
    color: #706ef4;
    opacity: 0.8;
  }
`;

const ReplyLookBox = styled.div`
  display: flex;
  margin: 15px 0px;
`;

const ReplyLine = styled.div`
  border-bottom: 1px solid #595959;
  margin-right: 16px;
  width: 24px;
  margin-bottom: 8px;
`;

const ReplyLook = styled.button`
  color: #595959;
  font-size: 12px;
  cursor: pointer;
`;


export default function FeedDetail({ isOpen, onClose, post }) {
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState(post.postId);
  const [commentText, setCommentText] = useState("");
  const [parentCommentId, setParentCommentId] = useState(null);
  const [isReplying, setIsReplying] = useState(false);
  const [visibleReplies, setVisibleReplies] = useState({});
  const navigate = useNavigate();
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => setIsModalOpen(false);
  const currentUserId = localStorage.getItem("userId");

  const openModal = (event) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    setModalPosition({
      top: buttonRect.bottom + 10, // 버튼의 아래쪽 위치
      left: buttonRect.left - 50, // 버튼의 왼쪽 위치
    });
    setIsModalOpen(true);
  };

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

  // 링크태그 이동 함수
  const handleTagClick = (text) => {
    navigate(`/search`, { state: { searchText: text } });
  };

  // 유저태그 이동 함수
  const handleUserClick = (userId) => {
    // 예시: 로그인한 유저의 ID를 서버에서 받아오고, 그에 해당하는 `userId`를 처리
    // const currentUserId = loggedInUserId;  // 로그인된 사용자 ID를 가져옴

    // if (currentUserId === taggedUserId) {
    //   console.log("자기 자신에게 태그됨");
    // } else {
    //   console.log("다른 사용자에게 태그됨");
    //   // 이 부분에서 서버로 해당 사용자의 프로필 페이지로 이동
    // }
    if (userId) {
      navigate(`/user/profile/${userId}`);
    } else {
      console.log("User ID is not found");
    }
  };

  // TagLink 함수: content와 유저 정보 (reply, postDetails, comment 등) 처리
  const TagLink = (content, mentionedLoginIds, mentionedUserIds) => {
    const regex = /(&[\w가-힣_]+|@[a-zA-Z0-9_]+)/g;

    const parts = content.split(regex);

    return parts.map((part, index) => {
      if (part && part.startsWith("&")) {
        return (
          <span
            key={index}
            style={{
              color: "#706ef4",
              cursor: "pointer",
              fontSize: "12px",
            }}
            onClick={() => handleTagClick(part.substring(1))}
          >
            {part}
          </span>
        );
      }

      if (part && part.startsWith("@")) {
        const taggedUserLoginId = part.substring(1); // '@' 이후의 사용자 ID 추출

        // '@' 태그된 사용자가 mentionedLoginIds에 포함되는지 확인
        const userIndex = mentionedLoginIds.indexOf(taggedUserLoginId);

        // 만약 찾았다면 userId 추출, 못 찾으면 null
        const userId = userIndex !== -1 ? mentionedUserIds[userIndex] : null;

        console.log("taggedUserLoginId:", taggedUserLoginId);
        console.log("matchedUserId:", userId);

        return (
          <span
            key={index}
            style={{
              color: "#706ef4",
              cursor: "pointer",
              fontSize: "12px",
            }}
            onClick={() => handleUserClick(userId)}
          >
            {part}
          </span>
        );
      }

      return part;
    });
  };

  const handleCommentChange = (e) => {
    setCommentText(e.target.value); // 댓글 내용 업데이트
  };

  // 댓글 작성
  const handleCommentSubmit = async () => {
    if (commentText.trim()) {
      // 공백만 입력되는 것을 방지
      try {
        const access = localStorage.getItem("access");
        const axios = getAuthAxios(access);
        const response = await axios.post(`/comment/${postData}/reply`, {
          content: commentText, // 댓글 내용
          parentId: parentCommentId, // 부모 댓글 ID
        });
        console.log("댓글 작성 성공 : ", commentText);
        setCommentText("");
        setParentCommentId(null);
        setIsReplying(false);
      } catch (error) {
        console.error("댓글 작성 실패 :", error);
      }
    }
  };

  // 대댓글 작성
  const handleReplyClick = (commentId, loginId) => {
    setParentCommentId(commentId);
    setCommentText(`@${loginId} `);
    setIsReplying(true);
  };

  const handleToggleReplies = (commentId) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId], // 댓글에 대한 답글 표시 상태를 토글
    }));
  };

  // 좋아요
  const handlePostLike = async (postId, commentId) => {
    const access = localStorage.getItem("access");
    const axios = getAuthAxios(access);
    // like, header에 토큰 값

    const params = {};
    if (post) params.postId = postId;
    if (commentId) params.commentId = commentId;

    try {
      const res = await axios.post("/like/toggle", null, {
        params: params,
        headers: {
          Authorization: `${access}`,
        },
      });
  
      if (res.status === 200) {
        // 좋아요 추가 또는 삭제 후 상태 업데이트
        if (res.data === "좋아요 추가") {
          // 게시글 좋아요
          if (postId) {
            setPostDetails((prevState) => ({
              ...prevState,
              liked: true, // 게시글 좋아요 상태 업데이트
              likeCount: prevState.likeCount + 1, // 좋아요 개수 증가
            }));
          }
          
          // 댓글 좋아요
          if (commentId) {
            setPostDetails((prevState) => {
              // 댓글 좋아요 상태 업데이트
              const updatedComments = prevState.comments.map((comment) =>
                  comment.commentId === commentId
                      ? { ...comment, liked: true, likeCount: comment.likeCount + 1 }
                      : comment
              );
              return {
                  ...prevState,
                  comments: updatedComments, // 댓글 좋아요 상태 반영
              };
          });
      }
  
          toast.success("좋아요 추가!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
        } else if (res.data === "좋아요 삭제") {
          // 게시글 좋아요
          if (postId) {
            setPostDetails((prevState) => ({
              ...prevState,
              liked: false, // 게시글 좋아요 상태 업데이트
              likeCount: prevState.likeCount - 1, // 좋아요 개수 감소
            }));
          }
  
           // 댓글 좋아요 처리

           if (commentId) {
            setPostDetails((prevState) => {
                const updatedComments = prevState.comments.map((comment) =>
                    comment.commentId === commentId
                        ? { ...comment, liked: false, likeCount: comment.likeCount - 1 }
                        : comment
                );
                return {
                    ...prevState,
                    comments: updatedComments, // 댓글 좋아요 상태 반영
                };
            });
        }
  
          toast.success("좋아요 삭제!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
          });
        }
        console.log(res.data);
      }
    } catch (e) {
      switch (e.response?.status) {
        case 404:
          toast.warn("권한이 존재하지 않아요ㅠㅜ", {
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
        default:
          toast.error("오류가 발생했습니다.", {
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

  useEffect(() => {
    console.log('Post details updated:', postDetails);
  }, [postDetails]);

  // 유저 팔로우
  const handleFollow = (userId, e) => {
    const access = localStorage.getItem("access");
    const axios = getAuthAxios(access);
    // post, header에 토큰 값
    axios
      .post(
        `/follow/${userId}`,
        {},
        {
          headers: {
            Authorization: `${access}`,
          },
        }
      )
      .then((res) => {
        if ((res.status = 201)) {
          toast.success(res.data, {
            position: "top-right", // 위치 설정
            autoClose: 2000, // 자동 닫힘 시간
            hideProgressBar: true, // 진행 바 숨김 여부
            closeOnClick: true, // 클릭 시 닫힘 여부
            pauseOnHover: true, // 호버 시 일시 정지
          });
        }
      })
      .catch((e) => {
        switch (e.status) {
          case 404:
            toast.warn("서버에서 오류가 발생하였습니다.", {
              position: "top-right", // 위치 설정
              autoClose: 2000, // 자동 닫힘 시간
              hideProgressBar: true, // 진행 바 숨김 여부
              closeOnClick: true, // 클릭 시 닫힘 여부
              pauseOnHover: true, // 호버 시 일시 정지
            });
            break;
          case 409:
            toast.warn(e.response.data, {
              position: "top-right", // 위치 설정
              autoClose: 2000, // 자동 닫힘 시간
              hideProgressBar: true, // 진행 바 숨김 여부
              closeOnClick: true, // 클릭 시 닫힘 여부
              pauseOnHover: true, // 호버 시 일시 정지
            });
            break;
          case 500:
            toast.warn("서버에 오류가 생겼습니다.", {
              position: "top-right", // 위치 설정
              autoClose: 2000, // 자동 닫힘 시간
              hideProgressBar: true, // 진행 바 숨김 여부
              closeOnClick: true, // 클릭 시 닫힘 여부
              pauseOnHover: true, // 호버 시 일시 정지
            });
            break;
        }
      });
  };

  // 북마크
  const handlePostBookmark = (postId, e) => {
    const access = localStorage.getItem("access");
    const axios = getAuthAxios(access);
    // delete, header에 토큰 값
    axios
      .post(`/bookmark/${postId}`, null, {
        headers: {
          Authorization: `${access}`,
        },
      })
      .then((res) => {
        switch (res.status) {
          case 200:
            if (res.data === "북마크 추가됨") {
              toast.success("내 북마크 목록에 추가했습니다.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
              });
  
              // 클라이언트 상태 업데이트: 북마크가 추가되었으므로 bookmarked 상태 true로 변경
              setPostDetails((prevState) => ({
                ...prevState,
                bookmarked: true,
              }));
            } else if (res.data === "북마크 삭제됨") {
              toast.error("내 북마크 목록에서 제거했습니다.", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
              });
  
              // 클라이언트 상태 업데이트: 북마크가 삭제되었으므로 bookmarked 상태 false로 변경
              setPostDetails((prevState) => ({
                ...prevState,
                bookmarked: false,
              }));
            }
            break;
        }
      })
      .catch((e) => {
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
      });
  };
  
  // 게시글 공유
  const handlePostShare = () => {
    const token = localStorage.getItem("access");
    // 나중에 게시물 상세페이지 주소로 전환할 것.
    const shareLink = window.location.href;
    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        toast.success("대시보드에 링크가 저장되었습니다.", {
          position: "top-right", // 위치 설정
          autoClose: 2000, // 자동 닫힘 시간
          hideProgressBar: true, // 진행 바 숨김 여부
          closeOnClick: true, // 클릭 시 닫힘 여부
          pauseOnHover: true, // 호버 시 일시 정지
        });
      })
      .catch(() => {
        toast.warn("링크 저장을 실패하였습니다.", {
          position: "top-right", // 위치 설정
          autoClose: 2000, // 자동 닫힘 시간
          hideProgressBar: true, // 진행 바 숨김 여부
          closeOnClick: true, // 클릭 시 닫힘 여부
          pauseOnHover: true, // 호버 시 일시 정지
        });
      });
  };

  // 게시글 상세보기
  useEffect(() => {
    if (isOpen) {
      const access = localStorage.getItem("access");
      const axios = getAuthAxios(access);

      const response = axios
        .get(`/feed/details/${postData}`)
        .then((response) => {
          setPostDetails(response.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("데이터를 불러오는 중 오류가 발생했습니다.");
          setLoading(false);
        });
    }
  }, [isOpen, postData]);

  useEffect(() => {
    if (postDetails) {
      console.log("Updated post details:", postDetails);
    }
  }, [postDetails]);

  if (!isOpen) return null;

  if (loading) {
    return <div>Loading...</div>;
  }

  // postDetails가 null일 경우 처리
  if (!postDetails) {
    return <div>포스트 데이터를 불러오는 중 문제가 발생했습니다.</div>;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div>
      <ToastContainer />
      <ModalOverlay onClick={handleOverlayClick}>
        <CloseButton onClick={onClose}>
          <IoClose />
        </CloseButton>
        <PreviewModalContainer>
        {isModalOpen && (
                <FeedModal
                  closeModal={closeModal}
                  position={modalPosition}
                  post={postDetails}
                />
              )}
          <PreviewContent>
            <LeftSection>
              <Carousel showThumbs={false}>
                {postDetails.files && postDetails.files.length > 0 ? (
                  postDetails.files.map((file, index) => (
                    <div key={index}>
                      {file.fileType && file.fileType.startsWith("IMAGE") ? (
                        <PreviewImage
                          src={file.fileUrl}
                          alt={`Preview ${index + 1}`}
                        />
                      ) : file.fileType && file.fileType.startsWith("VIDEO") ? (
                        <PreviewVideo controls>
                          <source src={file.fileUrl} type={file.fileType} />
                        </PreviewVideo>
                      ) : (
                        <div>미리보기가 지원되지 않는 파일입니다.</div>
                      )}
                    </div>
                  ))
                ) : (
                  <div>선택된 파일이 없습니다.</div>
                )}
              </Carousel>
            </LeftSection>
            <RightSection>
              <RightHeader>
                <Profile onClick={() => handleUserClick(postDetails.userId)}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover", // 이미지를 영역에 맞게 크롭
                    }}
                    src={postDetails.profileImg || defaultImg}
                  />
                </Profile>
                <LoginId onClick={() => handleUserClick(postDetails.userId)}>
                  {postDetails.loginId}
                </LoginId>
                <h3
                  style={{
                    color: "#706ef4",
                    margin: "0px 8px",
                    fontSize: "20px",
                  }}
                >
                  &
                </h3>
                <p
                  style={{
                    fontSize: "17px",
                    color: "gray",
                  }}
                >
                  {postDetails.partnerId}
                </p>
                <button
                  style={{
                    backgroundColor: "#706EF4",
                    width: "70px",
                    height: "30px",
                    paddingTop: "3px",
                    marginLeft: "auto",
                  }}
                  className="flex w-full justify-center rounded-md text-sm font-semibold leading-6 text-white shadow-sm"
                  onClick={(e) => handleFollow(postDetails.userId, e)}
                >
                  팔로우
                </button>
                <GoKebabHorizontal
                    style={{
                      width: "25px",
                      height: "25px",
                      cursor: "pointer",
                      marginLeft: "8px",

                    }}
                    onClick={openModal}
                    />
              </RightHeader>
              <ContentBox>
                <ContentText>
                  {TagLink(
                    postDetails.content,
                    postDetails.mentionedLoginIds,
                    postDetails.mentionedUserIds
                  )}
                </ContentText>
                <Line />
                <IconBox>
                  <HeartPost
                    onClick={() => handlePostLike(postDetails.postId, null)}
                    liked = {postDetails.liked}
                  />
                  <IoMdShare
                    className="feedIcon"
                    style={{ cursor: "pointer" }}
                    onClick={handlePostShare}
                  />
                  <FaRegBookmark
                    className="feedIcon"
                    style={{ cursor: "pointer", margin: "0px 0px 0px auto", color: postDetails.bookmarked ? "#706ef4" : "black" }}
                    onClick={(e) => handlePostBookmark(postDetails.postId, e)}
                  />
                </IconBox>
              </ContentBox>
              <LikeCountBox>
                <LikeCount>좋아요 {postDetails.likeCount}개</LikeCount>
              </LikeCountBox>
              <CommentsBox>
                <CommentUl>
                  {postDetails.comments && postDetails.comments.length > 0 ? (
                    postDetails.comments.map((comment, index) => {
                      const hasReplies = postDetails.comments.some(
                        (reply) => reply.parentId === comment.commentId
                      ); // 댓글에 답글이 있는지 확인

                      // 답글이 아닌 댓글만 표시
                      if (!comment.parentId) {
                        return (
                          <CommentLi key={index}>
                            <CommentProfile
                              onClick={() => handleUserClick(comment.userId)}
                            >
                              <img
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover", // 이미지를 영역에 맞게 크롭
                                }}
                                src={comment.profileImg || defaultImg}
                                alt="Profile"
                              />
                            </CommentProfile>
                            <CommentTextBoxWrapper>
                              <CommentTextBox>
                                <CommentWriter
                                  onClick={() =>
                                    handleUserClick(comment.userId)
                                  }
                                >
                                  {comment.loginId}
                                </CommentWriter>
                                <CommentText>
                                  {TagLink(
                                    comment.content,
                                    comment.mentionedLoginIds,
                                    comment.mentionedUserIds
                                  )}
                                </CommentText>
                              </CommentTextBox>
                              <DayandReplyBox>
                                <Day>
                                  {formatTimeDifference(comment.createdAt)}
                                </Day>
                                <ReplyButton
                                  onClick={() =>
                                    handleReplyClick(
                                      comment.commentId,
                                      comment.loginId
                                    )
                                  }
                                >
                                  답글 달기
                                </ReplyButton>
                              </DayandReplyBox>

                              {hasReplies && (
                                <ReplyLookBox>
                                  {" "}
                                  <ReplyLine />
                                  <ReplyLook
                                    onClick={() =>
                                      handleToggleReplies(comment.commentId)
                                    }
                                  >
                                    {visibleReplies[comment.commentId]
                                      ? "답글 숨기기"
                                      : "답글 보기"}
                                  </ReplyLook>
                                </ReplyLookBox>
                              )}

                              {/* 답글이 보이는 상태 */}
                              {visibleReplies[comment.commentId] && (
                                <div>
                                  {postDetails.comments
                                    .filter(
                                      (reply) =>
                                        reply.parentId === comment.commentId
                                    )
                                    .map((reply, idx) => (
                                      <CommentLi key={idx}>
                                        <CommentProfile
                                          onClick={() =>
                                            handleUserClick(reply.userId)
                                          }
                                        >
                                          <img
                                            style={{
                                              width: "100%",
                                              height: "100%",
                                              objectFit: "cover", // 이미지를 영역에 맞게 크롭
                                            }}
                                            src={reply.profileImg || defaultImg}
                                            alt="Profile"
                                          />
                                        </CommentProfile>
                                        <CommentTextBoxWrapper>
                                          <CommentTextBox>
                                            <CommentWriter
                                              onClick={() =>
                                                handleUserClick(reply.userId)
                                              }
                                            >
                                              {reply.loginId}
                                            </CommentWriter>
                                            <CommentText>
                                              {TagLink(
                                                reply.content,
                                                reply.mentionedLoginIds,
                                                reply.mentionedUserIds
                                              )}
                                            </CommentText>
                                          </CommentTextBox>
                                        </CommentTextBoxWrapper>
                                        <HeartBox>
                                        <HeartIcon
                                          onClick={() => handlePostLike(null, reply.commentId)}
                                          liked={reply.liked}
                                        />
                                        </HeartBox>
                                      </CommentLi>
                                    ))}
                                </div>
                              )}
                            </CommentTextBoxWrapper>
                            <HeartBox>
                            <HeartIcon
                              onClick={() => handlePostLike(null, comment.commentId)}
                              liked={comment.liked}
                            />
                            </HeartBox>
                          </CommentLi>
                        );
                      }
                      return null; // 답글은 숨깁니다
                    })
                  ) : (
                    <div>댓글이 없습니다.</div>
                  )}
                </CommentUl>
              </CommentsBox>
              <CommentWriteBox>
                <CommentInput
                  placeholder="댓글 달기..."
                  value={commentText}
                  onChange={handleCommentChange}
                />
                <CommentSend onClick={handleCommentSubmit} />
              </CommentWriteBox>
            </RightSection>
          </PreviewContent>
        </PreviewModalContainer>
      </ModalOverlay>
    </div>
  );
}
