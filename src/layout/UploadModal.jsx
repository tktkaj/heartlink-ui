import React, { useState } from 'react';
import styled from 'styled-components';
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Carousel } from 'react-responsive-carousel';
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
  z-index: 1;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 24px;
  z-index: 2;
`;

const StyledIcon = styled(MdAddPhotoAlternate)`
  width: 90px;
  height: 90px; 
  color: #706EF4;
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

const Explanation = styled.p`
  font-size: 15px;
  color: #747474;
  margin: 3px 0px 0px 0px;
`;

const Title = styled.h1`
  font-size: 20px;
  margin: 5px 0;
`;

const FileInput = styled.input`
  display: none;
`;

const Label = styled.label`
  background: #706EF4;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  margin-top: 10px;
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
  overflow: hidden;
`;

const PreviewVideo = styled.video`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  overflow: hidden;
`;

const TextInput = styled.textarea`
  width: 100%;
  height: 80%;
  padding: 10px;
  border: 1px solid #ccc;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const Checkbox = styled.input`
  margin-right: 10px;
`;

const UploadButton = styled.button`
  background: #706ef4;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;

  &:hover {
    background: #5a55c1;
  }
`;

export default function UploadModal({ isOpen, onClose }) {
  const [files, setFiles] = useState([]);
  const [text, setText] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isCoupleOnly, setIsCoupleOnly] = useState(false);

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setFiles([]);
    setText('');
    setShowPreview(false);
    setIsCoupleOnly(false);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      alert("파일을 선택하세요.");
      return;
    }
  
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file.file); // 파일 객체를 첨부
    });
  
    const postDTO = {
      content: encodeURIComponent(text), // URL 인코딩
      visibility: isCoupleOnly ? "PRIVATE" : "PUBLIC"
    };
    formData.append('post', JSON.stringify(postDTO));
  
    // FormData 내용 확인
    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]); // formData의 항목을 출력
    }
  
    try {
      const response = await fetch('http://localhost:9090/feed/write', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('업로드에 실패했습니다.');
      }
  
      console.log('업로드 성공:', await response.json());
    } catch (error) {
      console.error('업로드 중 오류 발생:', error);
    }
  };
  

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    if (selectedFiles.length > 10) {
      alert("최대 10개의 파일만 업로드할 수 있습니다.");
      return;
    }

    const videoFiles = selectedFiles.filter(file => file.type.startsWith('video/'));
    if (videoFiles.length > 1) {
      alert("동영상은 1개만 업로드할 수 있습니다.");
      return;
    }

    const fileObjects = selectedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type
    }));

    setFiles(fileObjects);
    if (fileObjects.length > 0) setShowPreview(true);
  };

  return (
    <>
      {isOpen && (
        <ModalOverlay onClick={handleOverlayClick}>
          <CloseButton onClick={() => { resetForm(); onClose(); }}>
            <IoClose />
          </CloseButton>
          {!showPreview ? (
            <ModalContainer>
              <ModalContent>
                <StyledIcon />
                <Title>사진과 동영상을 선택하세요.</Title>
                <Explanation>동영상은 1개만 추가할 수 있습니다.</Explanation>
                <Explanation>최대 10개의 파일을 추가할 수 있습니다.</Explanation>
                <FileInput
                  type="file"
                  accept="image/*,video/*"
                  id="file-input"
                  onChange={handleFileChange}
                  multiple
                />
                <Label htmlFor="file-input">첨부하기</Label>
              </ModalContent>
            </ModalContainer>
          ) : (
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
                  <CheckboxContainer>
                    <Checkbox
                      type="checkbox"
                      checked={isCoupleOnly}
                      onChange={() => setIsCoupleOnly(!isCoupleOnly)}
                    />
                    <label>커플만 공개</label>
                  </CheckboxContainer>
                  <UploadButton onClick={handleUpload}>업로드</UploadButton>
                </RightSection>
              </PreviewContent>
            </PreviewModalContainer>
          )}
        </ModalOverlay>
      )}
    </>
  );
}
