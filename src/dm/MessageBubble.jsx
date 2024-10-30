import styled from 'styled-components';
import { format } from 'date-fns';
import { useState, useRef, useEffect } from 'react';


const MessageBox = styled.div`
  display: flex;
  justify-content: start;
`
const Message = styled.div`
  font-size: 1.1rem;
  display: flex;
  max-width: 50%;
  padding: 10px 20px;
  margin-bottom: 5px;
  background-color: ${(props) => (props.isMine ? '#706EF4' : '#DDDDDD')};
  color: ${(props) => (props.isMine ? '#FFFFFF' : '#333')};
  position: relative;
`;

const TimeCheckBox = styled.div`
  font-size: 0.9rem;
  display: flex;
  align-items: end;
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

function Msg({ message, userId, userProfile }) {
  if (message.senderId !== userId) {
    if (message.imageUrl) {
      return (
        <MessageBox>
          <ProfileImage src={userProfile} />
          <img src={message.imageUrl} style={{ maxWidth: '300px', maxHeight: '100%', borderRadius: '10px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
            <TimeCheckBox>{format(message.lastMessageTime, 'a hh:mm').replace('AM', '오전').replace('PM', '오후')}</TimeCheckBox>
          </div>
        </MessageBox>
      );
    } else {
      return (
        <MessageBox>
          <ProfileImage src={userProfile} />
          <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
            {message.content}
          </Message>
          <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
            <TimeCheckBox>{format(message.lastMessageTime, 'a hh:mm').replace('AM', '오전').replace('PM', '오후')}</TimeCheckBox>
          </div>
        </MessageBox>
      );
    }
  } else if (message.senderId == userId) {
    if (message.imageUrl) {
      return (
        <MessageBox style={{ display: 'flex', justifyContent: 'end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '15px', justifyContent: 'end' }}>
            <TimeCheckBox>{format(message.lastMessageTime, 'a hh:mm').replace('AM', '오전').replace('PM', '오후')}</TimeCheckBox>
          </div>
          <img src={message.imageUrl} style={{ maxWidth: '300px', maxHeight: '100%', borderRadius: '10px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          </div>
        </MessageBox>
      );
    } else {
      return (
        <MessageBox style={{ display: 'flex', justifyContent: 'end' }}>
          <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '15px', justifyContent: 'end' }}>
            <TimeCheckBox>{format(message.lastMessageTime, 'a hh:mm').replace('AM', '오전').replace('PM', '오후')}</TimeCheckBox>
          </div>
          <Message style={{ borderRadius: '50px 50px 50px 50px' }}>
            {message.content}
          </Message>
        </MessageBox>
      );
    }
  }
}

export default function MessageBubble({ messages, userId, userProfile }) {
  const messagesEndRef = useRef(null);

  // 메시지가 추가될 때마다 스크롤을 하단으로 이동시키는 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // messages 상태가 업데이트될 때마다 스크롤 이동
  useEffect(scrollToBottom, [messages]);

  return (
    <div style={{ maxHeight: '700px', overflowY: 'auto' }}>
      {messages.map((message, index) => (
        <Msg key={index} message={message} userId={userId} userProfile={userProfile} />
      ))}
      <div ref={messagesEndRef} /> {/* 스크롤을 맞출 요소 */}
    </div>
  );
}

{/* <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Message style={{ borderRadius: '10px 10px 5px 10px' }}>
          {message}
        </Message>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <ProfileImage src={TestImg}/>
        <Message isMine={true} style={{ borderRadius: '10px 10px 10px 10px' }}>
          어떤걸로 먹을까??
        </Message>
      </div> */}
{/* 
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Message style={{ borderRadius: '50px 50px 10px 50px' }}>
          흐..
        </Message>
      </div>

      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Message style={{ borderRadius: '50px 10px 10px 50px' }}>
          맛있는거 고르고싶은디..
        </Message>
      </div>

      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '15px', justifyContent: 'end' }}>
          <div style={{ display: 'flex', justifyContent: 'end', fontSize: '0.9rem', color: '#706EF4' }}>읽음</div>
          <TimeCheckBox>오전 12:50</TimeCheckBox>
        </div>
        <Message style={{ borderRadius: '50px 10px 50px 50px' }}>
          좀 어렵군..
        </Message>
      </div>

      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <div style={{ display: 'flex', alignItems: 'start' }}><ProfileImage src={TestImg} /></div>
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 10px' }}>
          어떤걸로 먹을까??
        </Message>
      </div>

      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <SpaceImage />
        <Message isMine={true} style={{ borderRadius: '10px 50px 50px 10px' }}>
          나는 그 청다 먹고싶어!
        </Message>
      </div>

      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <SpaceImage />
        <Message isMine={true} style={{ borderRadius: '10px 50px 50px 50px' }}>
          당장 시키자ㅏㅏ!!!ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
        </Message>
      </div>

      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <SpaceImage />
        <Message isMine={true} style={{ borderRadius: '10px 10px 10px 10px', padding: '0', backgroundColor: '#FFFFFF' }}>
          <img src={TestImg} style={{ maxWidth: '300px', maxHeight: '100%', borderRadius: '10px' }}></img>
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <div style={{ fontSize: '0.9rem', color: '#706EF4' }}>읽음</div>
          <TimeCheckBox>오전 12:52</TimeCheckBox>
        </div>
      </div> */}