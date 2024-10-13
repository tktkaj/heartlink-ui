import DmListBox from './DmListBox';
import ChatBox from './ChatBox';
import { useState } from 'react';

export default function ChatRoom() {

  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    console.log(message);
  }


  return (
    <div style={{ display: 'flex' }}>
      <DmListBox />
      <ChatBox message={message} handleInputChange = {handleInputChange}/>
    </div>
  );
}
