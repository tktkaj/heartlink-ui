import styled from 'styled-components';
import { format } from 'date-fns';


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

const TimeBox = styled.div`
  text-align: center;
   margin-top: 20px; 
   margin-bottom: 40px;
   font-size: 1rem;
   color : #333;
`

export default function MessageBubble() {
  return (

    <div style={{ maxHeight: '700px', overflowY: 'auto' }}>
      <TimeBox>
        시간 나오는 곳
      </TimeBox>
      <MessageBox>
        <ProfileImage src={null} alt='상대방 사진' />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>메세지 보낸 시간</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>
      <MessageBox>
        <ProfileImage src={null} />
        <Message isMine={true} style={{ borderRadius: '50px 50px 50px 50px' }}>
          안녕
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <TimeCheckBox>오전 11:11</TimeCheckBox>
        </div>
      </MessageBox>


    </div>
  );
}


// 이미지 메시지인 경우
// <MessageBox>
// <ProfileImage src={null} />
// <img src={null} style={{ maxWidth: '300px', maxHeight: '100%', borderRadius: '10px' }} />
// <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
//   {/* <TimeCheckBox>{format(message.lastMessageTime, 'a hh:mm').replace('AM', '오전').replace('PM', '오후')}</TimeCheckBox> */}
//   <TimeCheckBox>오전 12:00</TimeCheckBox>
// </div>
// </MessageBox>

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