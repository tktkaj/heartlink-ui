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
`;

const CommentUl = styled.ul`
  overflow-y: scroll;
  scrollbar-width: none;
  display: flex;
  justify-content: center;
  align-items: center;
`
const CommentLi = styled.li`
  
`

const CommentBox = styled.div`
`

const CommentProfile = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 100%;
`

const CommentTextBox = styled.div`
  
`

const CommentWriter = styled.span`
  font-weight: bold;
`

const CommentText = styled.span`
  
`

const DayandReplyBox = styled.div`

`

const HeartBox = styled.div`
  margin: 0px 0px 0px auto;
`





// const FiMessageCircleButton = styled(FiMessageCircle)`
//   font-size: 40px;
//   cursor: pointer;
// `;

export default function FeedDetail({ isOpen, onClose, post}) {
  const [files, setFiles] = useState(post?.files || []);
  // const [text, setText] = useState(post?.content || '');
  // const [loginId, setloginId] = useState(post?.loginId || '');

  const [postData, setPostData] = useState(post);

  useEffect(() => {
    if (isOpen) {
      setFiles(post?.files || []);
      // setText(post?.content || '');
    }
  }, [isOpen, post]);

  if (!isOpen) return null;

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
                  src={postData.profileImg || defaultImg}
                /></Profile>
                <LoginId>{postData.loginId}</LoginId>
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
                <ContentText>{postData.content}</ContentText>
                <Line/>
                <IconBox>
                  <IoIosHeartEmpty
                    className="feedIcon"
                    style={{ cursor: "pointer" }}
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
                <LikeCount>좋아요 {postData.likeCount}개</LikeCount>
              </LikeCountBox>
              <CommentsBox>
                <CommentUl>
                  
                </CommentUl>
              </CommentsBox>
            </RightSection>
          </PreviewContent>
        </PreviewModalContainer>
      </ModalOverlay>
    </div>
  );
}

