import React, { useState } from "react";
import styled from "styled-components";

const PopupOverlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContainer = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin: 10px 0;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px 15px;
  background-color: #706ef4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 5px;

  &:hover {
    background-color: #5b5ac2;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;

const Modal2 = ({ onClose, onSubmit }) => {
  const [loginId, setLoginId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!loginId) {
      setError("아이디를 입력해주세요");
      return;
    }

    if (loginId.length < 4) {
      setError("아이디는 4자 이상이어야 합니다");
      return;
    }

    onSubmit(loginId);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      window.location.href = "/login";
    }
  };

  return (
    <PopupOverlay onClick={handleOverlayClick}>
      <PopupContainer>
        <Title>아이디 입력</Title>
        <InputWrapper>
          <Input
            type="text"
            placeholder="사용하실 아이디를 입력해주세요"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            maxLength="20"
          />
        </InputWrapper>
        {error && <ErrorText>{error}</ErrorText>}
        <SubmitButton onClick={handleSubmit}>확인</SubmitButton>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default Modal2;
