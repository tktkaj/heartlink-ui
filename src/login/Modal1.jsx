import axios from "axios";
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

const VerifyButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #706ef4;
  color: white;
  cursor: pointer;
  white-space: nowrap;
  height: 42px;

  &:hover {
    opacity: 0.9;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;
`;

const ResultText = styled.p`
  text-align: center;
  margin: 10px 0;
  color: #666;
`;

const Modal1 = ({ providerId }) => {
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneLength = phoneNumber.length;

    if (phoneLength <= 3) return phoneNumber;
    if (phoneLength <= 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    if (phoneLength <= 11) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
        3,
        7
      )}-${phoneNumber.slice(7)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    if (formattedPhoneNumber && formattedPhoneNumber.length <= 13) {
      setPhone(formattedPhoneNumber);
    }
  };

  const handleVerify = async () => {
    if (phone.length < 13) {
      setError("전화번호를 올바른 형식으로 입력해주세요");
      return;
    }
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + `/user/sms/send?phoneNumber=${phone}`
      );
      console.log("인증번호 전송", response.data);
      setResult(response.data);
      setShowVerificationInput(true);
    } catch (err) {
      setError("아이디 찾기에 실패했습니다.");
      console.error(err);
    }
  };

  const handleVerificationCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleVerifyCode = async () => {
    if (!verificationCode) {
      setError("인증번호를 입력해주세요");
      return;
    }

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/user/sms/validate",
        {
          phone: phone,
          code: verificationCode,
        }
      );
      setResult(response.data);
      console.log("인증번호 확인", response);
      setError("");
      await axios.post(
        process.env.REACT_APP_API_URL + "/user/auth/phone",
        { phone },
        { params: { providerId } }
      );
      handleLoginRedirect(providerId);
    } catch (err) {
      setError("인증번호가 일치하지 않습니다.");
      setVerificationCode("");
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
        <Title>전화번호 인증</Title>
        <InputWrapper>
          <Input
            type="tel"
            placeholder="전화번호를 입력하세요"
            value={phone}
            onChange={handlePhoneChange}
            maxLength="13"
            required
          />
          <VerifyButton type="button" onClick={handleVerify}>
            인증
          </VerifyButton>
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            placeholder="인증번호를 입력하세요"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
            maxLength="6"
            required
          />
          <VerifyButton type="button" onClick={handleVerifyCode}>
            확인
          </VerifyButton>
        </InputWrapper>
        {error && <ResultText style={{ color: "red" }}>{error}</ResultText>}
        {result && <ResultText>{result}</ResultText>}
      </PopupContainer>
    </PopupOverlay>
  );
};

export default Modal1;
