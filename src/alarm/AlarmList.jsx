import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { getAuthAxios } from "../api/authAxios";

const Container = styled.div`
  width: 450px;
  background-color: #f8f8fa;
  padding-left: 30px;
  height: 100vh;
`;

const Title = styled.div`
  font-size: 1.8rem;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const AlarmItem = styled.div`
  display: flex;
  padding-bottom: 25px;
`;

const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
`;

const AlarmTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  width: 350px;
  justify-content: center;
  height: 60px;
  gap: 5px;
`;

const AlarmText = styled.div`
  width: 310px;
  color: #333;
  font-size: 1rem;
`;

const AlarmTime = styled.div`
  color: #696969;
  font-size: 0.8rem;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const AcceptButton = styled.button`
  background-color: #706ef4;
  padding: 5px 30px;
  border-radius: 5px;
  color: #ffffff;
  margin-right: 15px;
  font-size: 0.9rem;
`;

const DeclineButton = styled.button`
  background-color: #d9d9d9;
  padding: 5px 30px;
  border-radius: 5px;
  color: #333;
  font-size: 0.9rem;
`;

export default function AlarmList() {
  // 받아온 notifications를 저장할 state
  const [notifications, setNotificactions] = useState();
  //  axios 연결

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const response = await authAxios.get("/notifications");
        setNotificactions(response.data);
      } catch (error) {
        console.error("알림 조회 실패:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <Container>
      <Title>알림</Title>

      {notifications &&
        notifications.map((notification, index) => {
          //  오늘로부터 얼마나 지난 메세지인지 일자를 보여주기 위한 날짜 계산

          //  날짜 포맷팅
          let today = format(new Date(), "yyyy-MM-dd");
          let createDate = format(notification.createdAt, "yyyy-MM-dd");

          const oldDate = new Date(today);
          const newDate = new Date(createDate);

          // 실질적인 날짜 계산
          let diff = Math.abs(newDate.getTime() - oldDate.getTime());
          diff = Math.ceil(diff / (1000 * 60 * 60 * 24));

          return (
            <AlarmItem key={index}>
              <ProfileImage src={notification.otherUserImg} />
              <AlarmTextContainer>
                <AlarmText>{notification.message}</AlarmText>
                {notification.type == "PRIVATE_FOLLOW_REQUEST" && (
                  <ButtonContainer>
                    <AcceptButton>수락</AcceptButton>
                    <DeclineButton>거절</DeclineButton>
                  </ButtonContainer>
                )}
                {notification.type !== "PRIVATE_FOLLOW_REQUEST" && (
                  <AlarmTime>{diff == 0 ? "오늘" : `${diff}일전`}</AlarmTime>
                )}
              </AlarmTextContainer>
            </AlarmItem>
          );
        })}
    </Container>
  );
}
