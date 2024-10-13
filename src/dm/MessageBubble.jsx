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

export default function MessageBubble({ message }) {
  const a1 = 1;
  const a2 = 2;
  const a3 = 3;

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Message style={{ borderRadius: '10px 10px 5px 10px' }}>
          흐..
        </Message>
      </div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Message style={{ borderRadius: '10px 5px 5px 10px' }}>
          {message}
        </Message>
      </div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
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
          나는 그 소시지 먹고싶어!
        </Message>
      </div>
      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <Message isMine={true} style={{ borderRadius: '5px 10px 10px 10px' }}>
          당장 시키자ㅏㅏ!!!
        </Message>
      </div>
      <div style={{ display: 'flex', justifyContent: 'start' }}>
        <Message isMine={true} style={{ borderRadius: '10px 10px 10px 10px', padding: '0', backgroundColor: '#FFFFFF' }}>
          <img src={TestImg} style={{maxWidth:'90%', maxHeight:'90%', borderRadius: '10px'}}></img>
        </Message>
      </div>
    </>
  );
}


