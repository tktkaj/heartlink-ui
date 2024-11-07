import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const ToastWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
`;

const ToastIcon = styled.div`
  font-size: 24px;
`;

const ToastContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const ToastTitle = styled.h4`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

const ToastMessage = styled.p`
  margin: 4px 0 0 0;
  font-size: 14px;
  color: #666;
`;

// 커스텀 토스트 컴포넌트
export const CustomToast = ({ title, message }) => (
  <ToastWrapper>
    <ToastIcon>🔔</ToastIcon>
    <ToastContent>
      <ToastTitle>{title}</ToastTitle>
      <ToastMessage>{message}</ToastMessage>
    </ToastContent>
  </ToastWrapper>
);

export default function AlarmRight() {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);

  // 내 userId를 가져오는 axios
  useEffect(()=>{
    const token = localStorage.getItem('access');

    axios.get("http://localhost:9090/notifications/check-userid"
      ,{
        headers:{
          Authorization: `${token}`
        }
      }
    ).then((response)=>{
       // eventSource에 SSE를 통해 넘어온 데이터가 저장!
    // http://localhost:9090/notifications/subscribe 실제로도 사용할 경로!
    console.log("sse는 ", response.data);
    const eventSource = new EventSource(
      `http://localhost:9090/notifications/subscribe/${response.data}`
    );

    // 'sse'는 내가 넘길 이벤트명이라 수정x, 이벤트명 체크하기 때문에!
    eventSource.addEventListener("sse", (event) => {
      try {
        // JSON 형식으로 파싱
        const parsedData = JSON.parse(event.data);
        console.log("알림데이터", parsedData);

        // Toastify로 message 표시 및 클릭 시 페이지 이동
        if (parsedData.message && parsedData.url) {
          toast(
            <CustomToast title="새로운 알림" message={parsedData.message} />,
            {
              position: "top-right",
              // autoClose: 5000,
              style: {
                marginTop: "topOffset",
                width: "400px",
                top: "20vh",
                right: "12.9vw",
              },
              onClick: () => (window.location.href = parsedData.url),
            }
          );
        }
      } catch (error) {
        console.error("Error parsing event data:", error);
      }
    });
    return () => {
      eventSource.close();
    };
    })
    .catch((error)=>{
      console.log(error);
    })
  },[]);

  return (
    <div>
      {notifications.map((notification, index) => (
        <li key={index}>{notification.url}</li>
      ))}
      <ToastContainer />
    </div>
  );
}
