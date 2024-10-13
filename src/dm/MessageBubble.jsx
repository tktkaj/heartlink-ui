import styled from 'styled-components';
import TestImg from '../images/test.png';


const Message = styled.div`
  font-size: 1.1rem;
  display: flex;
  max-width: 50%;
  padding: 10px 10px;
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

export default function MessageBubble({ message }) {

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Message style={{ borderRadius: '10px 10px 5px 10px' }}>
          흐..
        </Message>
      </div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Message style={{ borderRadius: '10px 5px 5px 10px' }}>
          맛있는거 고르고싶은디..
        </Message>
      </div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '15px', justifyContent: 'end' }}>
          <div style={{display: 'flex', justifyContent: 'end', fontSize: '0.9rem' , color: '#706EF4'}}>읽음</div>
          <TimeCheckBox>오전 12:50</TimeCheckBox>
        </div>
        <Message style={{ borderRadius: '10px 5px 10px 10px' }}>
          좀 어렵군..
        </Message>
      </div>

      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <Message isMine={true} style={{ borderRadius: '10px 10px 10px 5px' }}>
          어떤걸로 먹을까??
        </Message>
      </div>
      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <Message isMine={true} style={{ borderRadius: '5px 10px 10px 5px' }}>
          나는 그 청다 먹고싶어!
        </Message>
      </div>
      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <Message isMine={true} style={{ borderRadius: '5px 10px 10px 10px' }}>
          당장 시키자ㅏㅏ!!!ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ
        </Message>
      </div>
      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <Message isMine={true} style={{ borderRadius: '10px 10px 10px 10px', padding: '0', backgroundColor: '#FFFFFF' }}>
          <img src={TestImg} style={{ maxWidth: '300px', maxHeight: '100%', borderRadius: '10px' }}></img>
        </Message>
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '15px', justifyContent: 'end' }}>
          <div style={{fontSize: '0.9rem', color: '#706EF4'}}>읽음</div>
          <TimeCheckBox>오전 12:52</TimeCheckBox>
        </div>
      </div>
    </>
  );
}


