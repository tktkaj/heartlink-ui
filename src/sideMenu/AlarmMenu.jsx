import React from 'react'
import styled from 'styled-components'
import ProfileImg from '../image/sidebar/test.png'

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
    margin-top:2vw;
    display: flex;
    flex-direction: column;
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
    return (
        <>
            <MenuContainer>
                <div style={{ fontSize: '1.5rem', marginBottom: '10px', paddingLeft: '2vw' }}>
                    <h1>알림</h1>
                </div>
                <Alarms>
                    <AlarmItem>
                        <ProfileImage src={ProfileImg} />
                        <AlarmTextContainer>
                            <AlarmText>dduddo님이 회원님의 게시물을 좋아합니다.</AlarmText>
                            <AlarmTime>방금 전</AlarmTime>
                        </AlarmTextContainer>
                    </AlarmItem>

                    <AlarmItem>
                        <ProfileImage src={ProfileImg} />
                        <AlarmTextContainer>
                            <AlarmText>Yebook님이 회원님의 게시물에 댓글을 남겼습니다.</AlarmText>
                            <AlarmTime>방금 전</AlarmTime>
                        </AlarmTextContainer>
                    </AlarmItem>

                    <AlarmItem>
                        <ProfileImage src={ProfileImg} />
                        <AlarmTextContainer>
                            <AlarmText>tktkaj님이 팔로우 요청하셨습니다.</AlarmText>
                            <ButtonContainer>
                                <AcceptButton>수락</AcceptButton>
                                <DeclineButton>거절</DeclineButton>
                            </ButtonContainer>
                        </AlarmTextContainer>
                    </AlarmItem>
                </Alarms>

            </MenuContainer>
        </>
    )
}
