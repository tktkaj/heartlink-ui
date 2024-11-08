import React, { useEffect, useState }  from 'react'
import styled from 'styled-components'
import ProfileImg from '../image/sidebar/test.png'
import axios from 'axios'
import { format } from 'date-fns'

const MenuContainer = styled.div`
    width: 350px;
    height: 100vh;
    background-color: white;
    border-radius: 0 10px 10px 0;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 4.7vw;
    @keyframes slideIn {
    from {
        transform: translateX(-80%);
    }
    to {
        transform: translateX(0);
    }
}
    animation: slideIn 0.4s forwards;
    padding-top: 5vh;
`
const Alarms = styled.div`
    height: 100%;
    margin-top:2vw;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    gap: 15px;
`

const AlarmItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.4s ease;
  &:hover{
        background-color: #e6e6ff;
    }
    padding: 10px 0 10px 1.5vw;
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
  width: 350px;
  justify-content: center;
  height: 60px;
  gap: 5px;
`;

const AlarmText = styled.div`
  width: 240px;
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
  background-color: #706EF4;
  padding: 5px 30px;
  border-radius: 5px;
  color: #ffffff;
  margin-right: 15px;
  font-size: 0.9rem;
`;

const DeclineButton = styled.button`
  background-color: #D9D9D9;
  padding: 5px 30px;
  border-radius: 5px;
  color: #333;
  font-size: 0.9rem;
`;

export default function AlarmMenu() {

    // 받아온 notifications를 저장할 state
    const [notifications, setNotificactions] = useState();
    //  axios 연결

    useEffect(() => {
        const token = localStorage.getItem("access");

        axios.get("http://localhost:9090/notifications"
            , {
                headers: {
                    Authorization: `${token}`
                }
            }
        ).then((response) => {
            setNotificactions(response.data);
        })
            .catch()
    }, [])
      

    const handleAcceptFollow = async() =>{
        
    }

    return (
        <>
            <MenuContainer>
                <div style={{ fontSize: '1.5rem', marginBottom: '10px', paddingLeft: '2vw' }}>
                    <h1>알림</h1>
                </div>
                <Alarms>
                    {notifications && notifications.map((notification, index) => {

                        //  오늘로부터 얼마나 지난 메세지인지 일자를 보여주기 위한 날짜 계산

                        //  날짜 포맷팅
                        let today = format(new Date(), 'yyyy-MM-dd');
                        let createDate = format(notification.createdAt, 'yyyy-MM-dd');

                        const oldDate = new Date(today);
                        const newDate = new Date(createDate);

                        // 실질적인 날짜 계산
                        let diff = Math.abs(newDate.getTime() - oldDate.getTime());
                        diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
                        console.log(notification.otherUserImg);
                        return (
                            <AlarmItem key={index} onClick={() => (window.location.href = notification.link)}>
                                <ProfileImage src={notification.otherUserImg} />
                                <AlarmTextContainer>
                                    <AlarmText>{notification.message}</AlarmText>
                                    {notification.type == 'PRIVATE_FOLLOW_REQUEST' && <ButtonContainer>
                                        <AcceptButton>수락</AcceptButton>
                                        <DeclineButton>거절</DeclineButton>
                                    </ButtonContainer>}
                                    {notification.type !== 'PRIVATE_FOLLOW_REQUEST' && <AlarmTime>{diff == 0 ? '오늘' : `${diff}일전`}</AlarmTime>}
                                </AlarmTextContainer>
                            </AlarmItem>
                        )
                    })}
                </Alarms>

            </MenuContainer>
        </>
    )
}
