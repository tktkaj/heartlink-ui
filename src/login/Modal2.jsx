import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { getAuthAxios } from "../api/authAxios";
import { toast, ToastContainer } from "react-toastify";

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

const Modal2 = ({ providerId, onSubmit }) => {
  const [loginId, setLoginId] = useState("");
  const [error, setError] = useState("");
  const [isIdChecked, setIsIdChecked] = useState(false);

  const checkDuplicateId = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/user/idcheck",
        {
          loginId: loginId,
        }
      );
      if (response.status === 200) {
        toast.success("사용 가능한 아이디입니다.");
        setIsIdChecked(true);
      } else if (response.status === 400) {
        toast.error("이미 가입된 회원이 있습니다.");
        setIsIdChecked(false);
      }
    } catch (error) {
      toast.error("이미 가입된 회원이 있습니다.");
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!loginId) {
      alert("아이디를 입력해주세요");
      return;
    }

    if (loginId.length < 5 || loginId.length > 15) {
      alert("아이디는 5자 이상 15자 이내어야 합니다");
      return;
    }
    if (/[^a-zA-Z0-9]/.test(loginId)) {
      alert("아이디는 영문과 숫자만 포함할 수 있습니다.");
      return;
    }

    if (!isIdChecked) {
      alert("아이디 중복 체크를 먼저 해주세요.");
      return;
    }

    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);

      await authAxios.post(
        "/user/auth/loginId",
        { loginId },
        {
          params: { providerId },
          headers: {
            Authorization: access,
          },
        }
      );
      setError("");
      alert("아이디가 성공적으로 등록되었습니다!");
      handleLoginRedirect(providerId);
    } catch (err) {
      setError("아이디 등록 중 오류가 발생했습니다.");
      console.error(err);
    }
  };

  const handleLoginRedirect = (providerId) => {
    const provider = providerId.split(" ")[0];
    const redirectUrl =
      process.env.REACT_APP_API_URL + `/oauth2/authorization/${provider}`;
    window.location.href = redirectUrl;
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      window.location.href = "/login";
    }
  };

  return (
    <PopupOverlay onClick={handleOverlayClick}>
      <PopupContainer>
        <ToastContainer
          position="top-center"
          limit={1}
          closeButton={true}
          autoClose={1500}
          hideProgressBar
        />
        <Title>아이디 입력</Title>
        <InputWrapper>
          <Input
            type="text"
            placeholder="아이디를 입력해주세요"
            value={loginId}
            onChange={(e) => {
              setLoginId(e.target.value);
              setIsIdChecked(false);
            }}
            maxLength="20"
          />
          <SubmitButton onClick={checkDuplicateId} style={{ width: "auto" }}>
            중복확인
          </SubmitButton>
        </InputWrapper>
        {error && <ErrorText>{error}</ErrorText>}
        <SubmitButton onClick={handleSubmit}>확인</SubmitButton>
      </PopupContainer>
    </PopupOverlay>
  );
};

export default Modal2;
