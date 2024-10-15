import styled from 'styled-components';
import {format} from 'date-fns';
import { useState } from 'react';
import TestImg from '../image/testimg/와구리.png';


const Message = styled.div`
  font-size: 1.1rem;
  display: flex;
  max-width: 50%;
  padding: 10px 20px;
  margin-bottom: 5px;
  background-color: ${(props) => (props.isMine ? '#706EF4' : '#DDDDDD')};
  color: ${(props) => (props.isMine ? '#FFFFFF' : '#333')};
  /* border-radius: 10px; */
  position: relative;
`;

const TimeCheckBox = styled.div`
  font-size: 0.9rem;
  display: flex;
  align-items: end;
`

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

function Msg({ message }) {

  const [flag, setFlag] = useState(message.senderId);
  console.log(flag);


  if (message.senderId === 4) {
    return <div style={{ display: 'flex', justifyContent: 'start' }}>
      <ProfileImage src={TestImg}/>
      <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
       {message.content}
      </Message>
      <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <div style={{ fontSize: '0.9rem', color: '#706EF4' }}>{message.read===true?'읽음':''}</div>
          <TimeCheckBox>{format(message.lastMessageTime,'a hh:mm').replace('AM', '오전').replace('PM', '오후')}</TimeCheckBox>
        </div>
    </div>
  }
  else {
    return <div style={{ display: 'flex', justifyContent: 'end' }}>
      <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '15px', justifyContent: 'end' }}>
        <div style={{ display: 'flex', justifyContent: 'end', fontSize: '0.9rem', color: '#706EF4' }}>{message.read===true?'읽음':''}</div>
        <TimeCheckBox>{format(message.lastMessageTime,'a hh:mm').replace('AM', '오전').replace('PM', '오후')}</TimeCheckBox>
      </div>
      <Message style={{ borderRadius: '50px 50px 50px 50px' }}>
        {message.content}
      </Message>
    </div>

  }
}

export default function MessageBubble({ messages }) {

  console.log(messages);

  return (
    <>
      {messages.map((message, index) => (
        <Msg message={message} />
      ))}

    </>
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