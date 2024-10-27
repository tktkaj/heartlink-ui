import React from "react";
import styled from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
`;

const Title = styled.h1`
  font-size: 48px;
  color: #ff6347;
  margin: 0;
`;

const Message = styled.p`
  font-size: 24px;
  color: #555;
  margin: 20px 0;
`;

const HomeButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 18px;
  color: white;
  background-color: #f48589;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #db7275;
  }
`;

const NotFound = () => {
  const handleHomeRedirect = () => {
    window.location.href = "/"; // 홈으로 리디렉션
  };

  return (
    <PageContainer>
      <Title>404</Title>
      <Message>찾을 수 없는 페이지예요!</Message>
      <HomeButton onClick={handleHomeRedirect}>홈으로 돌아가기</HomeButton>
    </PageContainer>
  );
};

export default NotFound;
