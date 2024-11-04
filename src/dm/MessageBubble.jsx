import styled from 'styled-components';
import { format } from 'date-fns';
import { useEffect, useRef } from 'react';

const MessageBox = styled.div`
  display: flex;
  justify-content: start;
`;

const Message = styled.div`
  font-size: 1.1rem;
  display: flex;
  max-width: 50%;
  padding: 10px 20px;
  margin-bottom: 15px;
  background-color: ${(props) => (props.isMine ? '#706EF4' : '#eee')};
  color: ${(props) => (props.isMine ? '#FFFFFF' : '#333')};
`;

const TimeCheckBox = styled.div`
  font-size: 0.9rem;
  display: flex;
  align-items: end;
  padding-bottom: 15px;
`;

const ProfileImage = styled.img`
  margin: 0 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const SpaceImage = styled.div`
  margin: 0 15px;
  width: 50px;
  height: 50px;
`;

const TimeBox = styled.div`
  text-align: center;
  margin-top: 20px; 
  margin-bottom: 40px;
  font-size: 1rem;
  color : #333;
`;

export default function MessageBubble({ otherProfile, messages, userId }) {
  const messagesEndRef = useRef(null);

  // messages가 업데이트될 때마다 스크롤을 최신 메시지로 이동
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div style={{ maxHeight: '780px', overflowY: 'auto' }}>
      {messages.map((message, index) => {
        const currentDate = message.lastMessageTime ? format(message.lastMessageTime, 'yyyy년 MM월 dd일') : null;
        const previousDate = index > 0 && messages[index - 1].lastMessageTime
          ? format(messages[index - 1].lastMessageTime, 'yyyy년 MM월 dd일')
          : null;
        const isNewDate = currentDate && currentDate !== previousDate;

        return (
          <div key={index}>
            {isNewDate && (
              <TimeBox>
                {currentDate}
              </TimeBox>
            )}
            <MessageBox style={{ justifyContent: userId === message.senderId ? 'end' : 'start' }}>
              {userId === message.senderId && (
                <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '15px', justifyContent: 'end' }}>
                  <TimeCheckBox>{format(message.lastMessageTime, 'a hh:mm').replace('AM', '오전').replace('PM', '오후')}</TimeCheckBox>
                </div>
              )}
              {userId !== message.senderId && <ProfileImage src={otherProfile} />}
              {message.content && <Message isMine={userId === message.senderId} style={{ borderRadius: '50px' }}>
                {message.content}
              </Message>}
              {message.imageUrl && <img src={message.imageUrl} style={{ maxWidth: '300px', maxHeight: '100%', borderRadius: '10px', marginBottom:'15px'}} />}
              {userId !== message.senderId && (
                <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
                  <TimeCheckBox>{format(message.lastMessageTime, 'a hh:mm').replace('AM', '오전').replace('PM', '오후')}</TimeCheckBox>
                </div>
              )}
            </MessageBox>
          </div>
        );
      })}
      {/* 새 메시지가 추가될 때마다 이 요소로 스크롤 이동 */}
      <div ref={messagesEndRef} />
    </div>
  );
}




// 이미지 메시지인 경우

// 텍스트 메시지인 경우
{/* <MessageBox>
<ProfileImage src={null} />
<Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
  {message.content}
</Message>
<div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
  <TimeCheckBox>오전 11:11</TimeCheckBox>
</div>
</MessageBox> */}