import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FiMessageCircle } from "react-icons/fi"; // FiMessageCircle 추가
import { getAuthAxios } from "../api/authAxios";

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

const TextInput = styled.textarea`
  width: 100%;
  height: 80%;
  padding: 10px;
  border: 1px solid #ccc;
`;

const UploadButton = styled.button`
  background: #706ef4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 34px;

  &:hover {
    background: #5a55c1;
  }
`;

const FiMessageCircleButton = styled(FiMessageCircle)`
  font-size: 40px;
  cursor: pointer;
`;

export default function FeedDetail({ isOpen, onClose, post, files, onSave }) {
  console.log("EditPostModal 실행!");
  console.log("나야 포스트", JSON.stringify(post, null, 2));

  const [loading, setLoading] = useState(false);
  const [text, setText] = useState(post?.content || "");

  useEffect(() => {
    if (isOpen) {
      setText(post?.content || "");
    }
  }, [isOpen, post]);

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleSave = async () => {
    setLoading(true); // 수정 시작
    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);
      const requestBody = {
        content: text,
      };

      const response = await authAxios.put(
        `/feed/${post?.postId}/update`,
        requestBody
      );

      if (response.status === 200) {
        alert("게시글이 수정되었습니다.");
        onSave({ ...post, content: text });
        setText(""); // 텍스트 초기화
        onClose(); // 모달 닫기
        window.location.href =
          process.env.REACT_APP_API_URL + `/user/profile/${post?.userId}`;
      } else {
        throw new Error("업로드에 실패했습니다.");
      }
    } catch (error) {
      console.error("업로드 중 오류 발생:", error.message);
      alert("내 게시글만 수정할 수 있습니다.");
      onClose(); // 모달 닫기
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

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
                  files.map((file, index) => {
                    return (
                      <div key={index}>
                        {file.fileType && file.fileType === "IMAGE" ? (
                          <PreviewImage
                            src={file.fileUrl}
                            alt={`Preview ${index + 1}`}
                          />
                        ) : file.fileType && file.fileType === "VIDEO" ? (
                          <PreviewVideo controls>
                            <source src={file.fileUrl} type="video/mp4" />
                          </PreviewVideo>
                        ) : (
                          <div>미리보기가 지원되지 않는 파일입니다.</div>
                        )}
                      </div>
                    );
                  })
                )}
              </Carousel>
            </LeftSection>
            <RightSection>
              <TextInput
                placeholder="내용을 입력하세요..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <UploadButton onClick={handleSave}>수정</UploadButton>
            </RightSection>
          </PreviewContent>
        </PreviewModalContainer>
      </ModalOverlay>
    </div>
  );
}
