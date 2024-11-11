import React, { useState } from "react";
import styled from "styled-components";
import { MdAddPhotoAlternate } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
  background: #706ef4;
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
  padding: 60px 20px;
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
  position: relative;
`;

const CharacterCount = styled.div`
  font-size: 14px;
  color: #747474;
  position: absolute;
  bottom: 160px;
  right: 30px;
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
  ${({ disabled }) =>
    disabled &&
    `
    background: #ddd;
    cursor: not-allowed;
  `}
`;

export default function UploadModal({ isOpen, onClose }) {
  const [files, setFiles] = useState([]);
  const [text, setText] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isCoupleOnly, setIsCoupleOnly] = useState(false);
  const [uploadDisabled, setUploadDisabled] = useState(false); // 업로드 버튼 비활성화 상태

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      resetForm();
      onClose();
    }
  };

  const resetForm = () => {
    setFiles([]);
    setText("");
    setShowPreview(false);
    setIsCoupleOnly(false);
    setUploadDisabled(false); // 리셋 시 비활성화 상태 초기화
  };

  // 텍스트에서 줄 바꿈을 <br>로 변환
  const convertTextToHtml = (text) => {
    return text.split("\n").join("<br/>"); // 줄바꿈을 <br/>로 변환
  };

  // 파일 크기 10MB 초과 여부 체크
  const isFileTooLarge = (file) => {
    return file.size > 10 * 1024 * 1024; // 10MB 이상
  };

  // 동영상 길이 1분 초과 여부 체크
  const isVideoTooLong = (file) => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        resolve(video.duration > 60); // 60초(1분) 초과 여부
      };
      video.onerror = reject;
    });
  };

  const handleUpload = async () => {
    if (text.length > 300) {
      alert("글자 수는 300자를 초과할 수 없습니다.");
      return;
    }

    if (files.length === 0) {
      alert("파일을 선택하세요.");
      return;
    }

    const formData = new FormData();

    // 파일을 FormData에 추가
    for (const file of files) {
      if (isFileTooLarge(file.file)) {
        alert("파일 크기는 10MB를 초과할 수 없습니다.");
        return;
      }

      // 동영상 길이 확인
      if (file.type.startsWith("video/")) {
        const isTooLong = await isVideoTooLong(file.file);
        if (isTooLong) {
          alert("동영상 길이는 1분을 초과할 수 없습니다.");
          return;
        }
      }

      formData.append("files", file.file); // 'files' 키로 파일 추가
    }

    // 줄바꿈을 <br/>로 변환
    const convertedText = convertTextToHtml(text);

    // postDTO를 JSON 형태로 추가
    const postDTO = {
      content: convertedText,
      visibility: isCoupleOnly ? "PRIVATE" : "PUBLIC",
    };

    formData.append("post", JSON.stringify(postDTO)); // JSON 데이터는 문자열로 추가

    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);

      // 서버에 FormData 보내기
      const response = await authAxios.post("/feed/write", formData);

      // 응답이 정상적으로 오면
      if (response.status === 201) {
        alert("업로드 하였습니다.");
        resetForm();
        onClose();
      } else {
        throw new Error("업로드에 실패했습니다.");
      }
    } catch (error) {
      // 서버에서 반환한 오류 메시지를 출력
      if (error.response) {
        console.error("서버 오류:", error.response.data); // 서버 오류 응답 확인
        alert("서버 오류: " + error.response.data);
      } else {
        console.error("업로드 중 오류 발생:", error.message); // 네트워크 오류 등
        alert("업로드 중 오류가 발생했습니다.");
      }
    }
  };

  // 파일 개수 예외
  const handleFileChange = async (event) => {
    const selectedFiles = Array.from(event.target.files);

    if (selectedFiles.length > 10) {
      alert("최대 10개의 파일만 업로드할 수 있습니다.");
      return;
    }

    const fileObjects = [];
    let hasLongVideo = false;

    for (const file of selectedFiles) {
      const fileObj = {
        file,
        url: URL.createObjectURL(file),
        type: file.type,
      };

      // 동영상 길이 체크
      if (file.type.startsWith("video/")) {
        const isTooLong = await isVideoTooLong(file);
        if (isTooLong) {
          alert("1분을 초과하는 동영상은 업로드할 수 없습니다.");
          hasLongVideo = true;
        }
      }

      fileObjects.push(fileObj);
    }

    if (hasLongVideo) {
      setUploadDisabled(true); // 1분 초과 동영상이 있을 경우 업로드 비활성화
      return;
    }

    setFiles(fileObjects);
    setShowPreview(fileObjects.length > 0);
    setUploadDisabled(false); // 동영상 길이 확인 후 정상적으로 업로드 가능하도록 설정
  };

  return (
    <>
      {isOpen && (
        <ModalOverlay onClick={handleOverlayClick}>
          <CloseButton
            onClick={() => {
              resetForm();
              onClose();
            }}
          >
            <IoClose />
          </CloseButton>
          {!showPreview ? (
            <ModalContainer>
              <ModalContent>
                <StyledIcon />
                <Title>사진과 동영상을 선택하세요.</Title>
                <Explanation>동영상은 1개만 추가할 수 있습니다.</Explanation>
                <Explanation>
                  최대 10개의 파일을 추가할 수 있습니다.
                </Explanation>
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
                        {file.type.startsWith("image/") ? (
                          <PreviewImage
                            src={file.url}
                            alt={`Preview ${index + 1}`}
                          />
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
                  <CharacterCount>
                    {text.length} / 300
                  </CharacterCount>
                  <CheckboxContainer>
                    <Checkbox
                      type="checkbox"
                      checked={isCoupleOnly}
                      onChange={() => setIsCoupleOnly(!isCoupleOnly)}
                    />
                    <label>커플만 공개</label>
                  </CheckboxContainer>
                  <UploadButton
                    onClick={handleUpload}
                    disabled={uploadDisabled}
                  >
                    업로드
                  </UploadButton>
                </RightSection>
              </PreviewContent>
            </PreviewModalContainer>
          )}
        </ModalOverlay>
      )}
    </>
  );
}
