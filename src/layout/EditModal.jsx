import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


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

export default function EditPostModal({ isOpen, onClose, post, onSave }) {
  console.log(`나야 포스트 ${post.postId}`);
  const [files, setFiles] = useState(post.files || []);
  const [text, setText] = useState(post.content || '');
  console.log("post확인 : ", post);

  useEffect(() => {
    if (isOpen) {
      setFiles(post.files || []);
      setText(post.content || '');
    }
  }, [isOpen, post]);

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };



  const handleFileChange = (postId, e) => {
    const selectedFiles = Array.from(e.target.files);
    // const access = localStorage.getItem("access");
    // const axios = getAuthAxios(access);
    // const response = axios.put('http://localhost:9090/feed/${postId}/update');

    const fileURLs = selectedFiles.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type,
    }));
    setFiles((prevFiles) => [...prevFiles, ...fileURLs])
  };

  const handleSave = () => {
    // 수정된 내용 저장 로직을 추가
    const updatedPost = { ...post, content: text, files: files };
    onSave(updatedPost);
    onClose();
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <CloseButton onClick={onClose}>
        <IoClose />
      </CloseButton>
      <PreviewModalContainer>
        <PreviewContent>
          <LeftSection>
            <Carousel showThumbs={false}>
              {files.map((file, index) => (
                <div key={index}>
                  {file.type.startsWith('image/') ? (
                    <PreviewImage src={file.url} alt={`Preview ${index + 1}`} />
                  ) : (
                    <PreviewVideo controls>
                      <source src={file.url} type={file.type} />
                    </PreviewVideo>
                  )}
                </div>
              ))}
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
  );
}
