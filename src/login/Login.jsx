import React, { useEffect, useState } from "react";
import styled from "styled-components";
import kakaoLogo from "../image/sns/free-icon-kakao-talk-4494622.png";
import naverLogo from "../image/sns/pngwing.com.png";
import googleLogo from "../image/sns/google_logo_icon_147282.png";
import MainLogo from "../image/logo/Logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../api/login";

const LoginBox = styled.div`
  background-color: white;
  width: 1100px;
  height: 600px;
  border-radius: 20px;
  border: 2px solid #f0f0f0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px,
    rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px,
    rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px,
    rgba(42, 51, 70, 0.04) 0px 6px 6px -3px,
    rgba(14, 63, 126, 0.04) 0px 12px 12px -6px,
    rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
`;

const LoginBoxRight = styled.form`
  width: 45%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 2px solid #f0f0f0;
  flex-direction: column;
`;

const LoginBanner = styled.div`
  font-size: 2rem;
  width: 55%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OAuthButton = styled.button`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin: 10px;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 3px 5px #d3d3d3;
  img {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const Input = styled.input`
  width: 60%;
  height: 45px;
  border-radius: 5px;
  border: 0.15rem solid rgba(112, 110, 244, 0.49);
  padding: 0 10px;
  margin: 10px 0;

  &::placeholder {
    font-size: 0.8rem;
  }
`;

const LoginButton = styled.button`
  width: 60%;
  height: 40px;
  border-radius: 5px;
  border: none;
  background: linear-gradient(135deg, #f1767a 0%, #5e66af 100%);
  color: white;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  box-shadow: 3px 3px 5px #bdbdbd;
  margin: 20px 0;
`;
const IdLabel = styled.p`
  font-size: 0.8rem;
  padding-right: 250px;
  display: flex;
  align-items: center;
`;
const PassLabel = styled.p`
  font-size: 0.8rem;
  padding-right: 240px;
  display: flex;
  align-items: center;
  margin-top: 5px;
`;
const LoginTitle = styled.div`
  font-size: 2.1rem;
  padding-right: 190px;
  line-height: 45px;
`;

const LoginIntro = styled.div`
  font-size: 0.8rem;
  padding-right: 12px;
  color: gray;
`;

const LoginTitleAndIntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 35px;
`;

const SignUpAndFindIdContainer = styled.div`
  width: 290px;
  display: flex;
  justify-content: end;
  margin-top: 5px;
`;

const SignUpButton = styled.button`
  background-color: transparent;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 0.8rem;
`;

const FindIdButton = styled.button`
  background-color: transparent;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 0.8rem;
`;

const logs = { kakaoLogo, googleLogo, naverLogo };

export default function Login() {
  const [loginId, setId] = useState("");
  const [password, setPw] = useState("");

  const onChangeId = (e) => {
    setId(e.target.value);
  };

  const onChangePw = (e) => {
    setPw(e.target.value);
  };

  const onClick = async (e) => {
    e.preventDefault();
    console.log("loginId:", loginId, "password:", password);
    try {
      const result = await login(loginId, password);
      console.log(result);
      const { authorization, refreshToken } = result;
      localStorage.setItem("access", authorization);
      localStorage.setItem("refresh", refreshToken);

      alert("로그인 성공!");
      window.location.href = "/home";
    } catch (error) {
      alert("로그인 실패!");
    }
  };

  return (
    <LoginBox>
      <LoginBoxRight>
        <LoginTitleAndIntroContainer>
          <LoginTitle>LOGIN</LoginTitle>
          <LoginIntro>
            <p style={{ display: "inline-block", color: "#f1767a " }}>
              사랑하는 사람
            </p>
            과의 소중한 순간을 함께 기록하세요.
          </LoginIntro>
        </LoginTitleAndIntroContainer>
        <IdLabel>아이디</IdLabel>
        <Input value={loginId} placeholder="ID" onChange={onChangeId} />
        <PassLabel>비밀번호</PassLabel>
        <Input value={password} placeholder="비밀번호" onChange={onChangePw} />

        <SignUpAndFindIdContainer>
          <Link to="/user/join">
            <SignUpButton style={{ marginRight: "4px" }}>
              회원가입 |
            </SignUpButton>
          </Link>
          <FindIdButton>아이디 찾기</FindIdButton>
        </SignUpAndFindIdContainer>
        <LoginButton onClick={onClick}>LOGIN</LoginButton>
        <div style={{ display: "flex", gap: "15px" }}>
          <OAuthButton>
            <img src={logs.kakaoLogo} alt="카카오 로그인" />
          </OAuthButton>
          <OAuthButton>
            <img src={logs.naverLogo} alt="네이버 로그인" />
          </OAuthButton>
          <OAuthButton>
            <img src={logs.googleLogo} alt="구글 로그인" />
          </OAuthButton>
        </div>
      </LoginBoxRight>
      <LoginBanner>
        <div style={{ width: "300px", height: "100px" }}>
          <img
            src={MainLogo}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      </LoginBanner>
    </LoginBox>
  );
}
