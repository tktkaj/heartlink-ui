import React from 'react'
import ProfileImg from '../image/sidebar/test.png'
import styled from 'styled-components'

const Container = styled.div`
  width: 450px;
  background-color: #F8F8FA;
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

export default function AlarmList() {
  return (
    <Container>

      <Title>알림</Title>

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

    </Container>
  )
}
