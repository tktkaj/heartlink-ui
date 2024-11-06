import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { FiMessageCircle } from 'react-icons/fi'; // FiMessageCircle 추가
import defaultImg from "../image/logo/fav.png";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdShare } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import { getAuthAxios } from "../api/authAxios";
import { TiHeartOutline } from "react-icons/ti";
import { LuSend } from "react-icons/lu";


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
  z-index:2001;
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

const StyledIcon = styled(MdAddPhotoAlternate)`
  width: 90px;
  height: 90px;
  color: #706ef4;
  margin-bottom: 10px;
`;

const ModalContent = styled.div`
  background: white;
  width: 330px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
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
  width : 40px;
  border-radius: 100%;
`;

const LoginId = styled.span`
  width: 100px;
  font-size: 20px;
  margin-left: 7px;
`;

const ContentBox = styled.div`
  width: 100%;
  margin: 10px 0px;
  
`;

const ContentText = styled.span`
  font-size: 15px;
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
  }
`;

const LikeCountBox = styled.div`
  width: 100%;
  margin: 10px 0px;
`;

const LikeCount = styled.span`
  
`;

const CommentsBox = styled.div`
  width: 100%;
  margin-top: 5px;
  height: 329px;
  overflow-y: auto;
  scrollbar-width: none;
`;

const CommentUl = styled.ul`
  
`
const CommentLi = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 5px;
  width: 100%;
`

const CommentProfile = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 100%;
  margin-right: 5px;
`

const CommentTextBox = styled.div`
  display: flex;
  flex-direction: row; 
  align-items: center;
  
`

const CommentWriter = styled.span`
  font-weight: bold;
  font-size: 15px;
  margin-right: 3px;
`

const CommentText = styled.span`
  font-size: 15px;
`

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
  transition: color;

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
`

const ReplyLook = styled.button`
  color: #595959;
  font-size: 12px;
  cursor: pointer;

`;





// const FiMessageCircleButton = styled(FiMessageCircle)`
//   font-size: 40px;
//   cursor: pointer;
// `;

export default function FeedDetail({ isOpen, onClose, post}) {
  const [files, setFiles] = useState(post?.files || []);
  const [postDetails, setPostDetails] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState(post);
  const [commentText, setCommentText] = useState("") 
  const [parentCommentId, setParentCommentId] = useState(null);
  const [isReplying, setIsReplying] = useState(false);
  const [visibleReplies, setVisibleReplies] = useState({});


  const handleCommentChange = (e) => {
    setCommentText(e.target.value);  // 댓글 내용 업데이트
  };

  // 댓글 작성
  const handleCommentSubmit = async () => {
    if (commentText.trim()) {  // 공백만 입력되는 것을 방지
      try{
        const access = localStorage.getItem("access");
        const axios = getAuthAxios(access);
        const response = await axios.post(
          
          `http://localhost:9090/comment/${postData}/reply`,
          {
            content: commentText,  // 댓글 내용
            parentId: parentCommentId  // 부모 댓글 ID
          }
        );
        console.log("댓글 작성 성공 : ", commentText);
        setCommentText("");
        setParentCommentId(null);
        setIsReplying(false);
      } catch(error){
        console.error("댓글 작성 실패 :", error);
      }
    }
  };

  // 대댓글 작성
  const handleReplyClick = (commentId, loginId) => {
    setParentCommentId(commentId);
    setCommentText(`@${loginId} `)
    setIsReplying(true);
  }

  const handleToggleReplies = (commentId) => {
    setVisibleReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId], // 댓글에 대한 답글 표시 상태를 토글
    }));
  };
  
  // const [text, setText] = useState(post?.content || '');
  // const [loginId, setloginId] = useState(post?.loginId || '');

  


  useEffect(() => {
    if (isOpen) {
      setFiles(post?.files || []);
      
        const access = localStorage.getItem("access");
        const axios = getAuthAxios(access);
    
          const response = axios
            .get(`http://localhost:9090/feed/details/${postData}`)
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

  // const handleFileChange = (postId, e) => {
  //   const selectedFiles = Array.from(e.target.files);
  //   const fileURLs = selectedFiles.map((file) => ({
  //     url: URL.createObjectURL(file),
  //     type: file.type,
  //   }));
  //   setFiles((prevFiles) => [...prevFiles, ...fileURLs]);
  // };

  // const handleSave = () => {
  //   const updatedPost = { ...post, content: text, files: files };
  //   onSave(updatedPost);
  //   onClose();
  // };
  

  return (
    <div>
      
      <ModalOverlay onClick={handleOverlayClick}>
        <CloseButton onClick={onClose}>
          <IoClose />
        </CloseButton>
        <PreviewModalContainer>
          <PreviewContent>
            <LeftSection>
              <Carousel showThumbs={false}>
                {files.length === 0 ? (
                  <div>선택된 파일이 없습니다.</div>
                ) : (
                  files.map((file, index) => (
                    <div key={index}>
                      {file.type && file.type.startsWith('image/') ? (
                        <PreviewImage src={file.url} alt={`Preview ${index + 1}`} />
                      ) : file.type && file.type.startsWith('video/') ? (
                        <PreviewVideo controls>
                          <source src={file.url} type={file.type} />
                        </PreviewVideo>
                      ) : (
                        <div>미리보기가 지원되지 않는 파일입니다.</div>
                      )}
                    </div>
                  ))
                )}
              </Carousel>
            </LeftSection>
            <RightSection>
              <RightHeader>
                <Profile><img
                  src={postDetails.profileImg || defaultImg}
                /></Profile>
                <LoginId>{postDetails.loginId}</LoginId>
                <button
                    style={{
                      backgroundColor: "#706EF4",
                      width: "70px",
                      height: "30px",
                      paddingTop: "3px",
                      margin: "0px 0px 0px auto",
                    }}
                    className="flex w-full justify-center rounded-md text-sm font-semibold leading-6 text-white shadow-sm"
                    // onClick={(e) => handleFollow(item.content.userId, e)}
                  >
                    팔로우
                  </button>
              </RightHeader>
              <ContentBox>
                <ContentText>{postDetails.content}</ContentText>
                <Line/>
                <IconBox>
                  <IoIosHeartEmpty
                    className="feedIcon"
                    style={{ cursor: "pointer", marginRight: "8px" }}
                    // onClick={(e) => handlePostLike(item.content.postId, e)}
                  />
                  <IoMdShare
                    className="feedIcon"
                    style={{ cursor: "pointer" }}
                    // onClick={handlePostShare}
                  />
                <FaRegBookmark
                  className="feedIcon"
                  style={{ cursor: "pointer", margin: "0px 0px 0px auto"}}
                  // onClick={(e) => handlePostBookmark(item.content.postId, e)}
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
                            <CommentProfile>
                              <img src={comment.profileImg || defaultImg} alt="Profile" />
                            </CommentProfile>
                            <CommentTextBoxWrapper>
                              <CommentTextBox>
                                <CommentWriter>{comment.loginId}</CommentWriter>
                                <CommentText>{comment.content}</CommentText>
                              </CommentTextBox>
                              <DayandReplyBox>
                                <Day>1시간 전</Day>
                                <ReplyButton onClick={() => handleReplyClick(comment.commentId, comment.loginId)}>
                                  답글 달기
                                </ReplyButton>
                              </DayandReplyBox>

                              {hasReplies && (
                                <ReplyLookBox> <ReplyLine/>
                                  <ReplyLook onClick={() => handleToggleReplies(comment.commentId)}>
                                    {visibleReplies[comment.commentId] ? '답글 숨기기' : '답글 보기'}
                                  </ReplyLook>
                                </ReplyLookBox>
                              )}

                              {/* 답글이 보이는 상태 */}
                              {visibleReplies[comment.commentId] && (
                                <div>
                                  {postDetails.comments
                                    .filter((reply) => reply.parentId === comment.commentId)
                                    .map((reply, idx) => (
                                      <CommentLi key={idx}>
                                        <CommentProfile>
                                          <img src={reply.profileImg || defaultImg} alt="Profile" />
                                        </CommentProfile>
                                        <CommentTextBoxWrapper>
                                          <CommentTextBox>
                                            <CommentWriter>{reply.loginId}</CommentWriter>
                                            <CommentText>{reply.content}</CommentText>
                                          </CommentTextBox>
                                        </CommentTextBoxWrapper>
                                        <HeartBox>
                                          <HeartIcon />
                                        </HeartBox>
                                      </CommentLi>
                                    ))}
                                </div>
                              )}
                            </CommentTextBoxWrapper>
                            <HeartBox>
                              <HeartIcon />
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