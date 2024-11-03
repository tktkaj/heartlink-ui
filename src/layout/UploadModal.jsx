import React from 'react';
import styled from 'styled-components';
import { MdAddPhotoAlternate } from "react-icons/md";

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
`

const ModalContainer = styled.div`
  background: white;
  border-radius: 10px;
  width: 560px;
  height: 585px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledIcon = styled(MdAddPhotoAlternate)`
  width: 90px;
  height: 90px; 
  color: #706EF4;
  margin-bottom: 10px;
`

const ModalContent = styled.div`
  background: white;
  width: 330px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`

const Explanation = styled.p`
    font-size: 15px;
    color: #747474;
    margin: 3px 0px 0px 0px;
`

const Title = styled.h1`
  font-size: 20px; // 글씨 크기 조정
  margin: 5px 0;
`

const FileInput = styled.input`
  display: none;
`

const Label = styled.label`
  background: #706EF4; // 배경색 변경
  color: #fff; // 글씨 색상 변경
  padding: 10px 20px; // 여백 추가
  border-radius: 5px; // 모서리 둥글게
  cursor: pointer; // 포인터 커서 추가
  text-align: center; // 가운데 정렬
  margin-top: 10px; // 위쪽 여백
`;


export default function UploadModal({ isOpen, onClose }) {
  if (!isOpen) return null; // 모달이 열리지 않을 때는 null 반환

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // 파일 업로드 로직을 여기에 추가하세요
    console.log(file);
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalContent>
          <StyledIcon />
          <Title>사진과 동영상을 선택하세요.</Title>
          <Explanation>동영상은 1개만 추가할 수 있습니다.</Explanation>
          <Explanation>최대 10개의 파일을 추가할 수 있습니다.</Explanation>
          <FileInput type="file" accept="image/*,video/*" id="file-input" onChange={handleFileChange} />
          <Label htmlFor="file-input">첨부하기</Label> {/* 라벨과 input 연결 */}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
}
