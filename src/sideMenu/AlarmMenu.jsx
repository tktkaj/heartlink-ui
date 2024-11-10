import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MenuContainer = styled.div`
  width: 400px;
  height: 100vh;
  background-color: white;
  border-radius: 0 10px 10px 0;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 82px;
  @keyframes slideIn {
    from {
      transform: translateX(-80%);
    }
    to {
      transform: translateX(0);
    }
  }
  animation: slideIn 0.4s forwards;
  padding-top: 3vh;
`;
const Alarms = styled.div`
  height: 100%;
  margin-top: 2vw;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 15px;
`;

const AlarmItem = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  transition: background-color 0.4s ease;
  &:hover {
    background-color: #e6e6ff;
  }
  padding: 10px 0 10px 30px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const AlarmTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 18px;
  width: 270px;
  justify-content: center;
  height: 60px;
  gap: 5px;
`;

const AlarmText = styled.div`
  width: 260px;
  color: #333;
  font-size: 0.9rem;
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

export default function AlarmMenu() {
    const token = localStorage.getItem("access");
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/notifications`, {
            headers: {
                Authorization: `${token}`
            }
        }).then((response) => {
            setNotifications(response.data);
        }).catch((error) => console.error(error));
    }, []);

    const handleConfirmFollow = async (notificationId, senderId) => {
        axios.post(`${process.env.REACT_APP_API_URL}/notifications/confirm/${notificationId}`, null, {
            headers: {
                Authorization: `${token}`
            },
            params: {
                senderId: senderId
            }
        }).then(() => {
            axios.get(`${process.env.REACT_APP_API_URL}/notifications`, {
                headers: {
                    Authorization: `${token}`
                }
            }).then((response) => {
                setNotifications(response.data);
            }).catch((error) => console.error(error));
        }).catch((err) => {
            if (err.response) {
                switch (err.response.status) {
                    case 500:
                        alert(err.response.data);
                        break;
                    case 404:
                        navigate("/notfound");
                        break;
                    default:
                        console.error(err);
                }
            }
        });
    }

    const handleDenyFollow = async (notificationId, senderId) => {
        axios.post(`${process.env.REACT_APP_API_URL}/notifications/deny/${notificationId}`, null, {
            headers: {
                Authorization: `${token}`
            },
            params: {
                senderId: senderId
            }
        }).then(() => {
            axios.get(`${process.env.REACT_APP_API_URL}/notifications`, {
                headers: {
                    Authorization: `${token}`
                }
            }).then((response) => {
                setNotifications(response.data);
            }).catch((error) => console.error(error));
        }).catch((err) => {
            if (err.response) {
                switch (err.response.status) {
                    case 500:
                        alert(err.response.data);
                        break;
                    case 404:
                        navigate("/notfound");
                        break;
                    default:
                        console.error(err);
                }
            }
        });
    }

    return (
        <MenuContainer>
            <div style={{fontSize: '2rem', paddingLeft:'30px'}}>알림</div>
            <Alarms>
                {notifications.map((notification, index) => {
                    const today = format(new Date(), 'yyyy-MM-dd');
                    const createDate = format(new Date(notification.createdAt), 'yyyy-MM-dd');
                    const diff = Math.ceil((new Date(today) - new Date(createDate)) / (1000 * 60 * 60 * 24));

                    return (
                        <AlarmItem key={index}>
                            <ProfileImage src={notification.otherUserImg} onClick={() => (window.location.href = notification.link)} />
                            <AlarmTextContainer>
                                <AlarmText onClick={() => (window.location.href = notification.link)}>{notification.message}</AlarmText>
                                {notification.type === 'PRIVATE_FOLLOW_REQUEST' ? (
                                    <ButtonContainer>
                                        <AcceptButton onClick={() => handleConfirmFollow(notification.id, notification.senderId)}>수락</AcceptButton>
                                        <DeclineButton onClick={() => handleDenyFollow(notification.id, notification.senderId)}>거절</DeclineButton>
                                    </ButtonContainer>
                                ) : (
                                    <AlarmTime>{diff === 0 ? '오늘' : `${diff}일전`}</AlarmTime>
                                )}
                            </AlarmTextContainer>
                        </AlarmItem>
                    );
                })}
            </Alarms>
        </MenuContainer>
    );
}
