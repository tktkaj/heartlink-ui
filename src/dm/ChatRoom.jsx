import DmListBox from './DmListBox';
import ChatBox from './ChatBox';
import { useState } from 'react';

export default function ChatRoom() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState({
    0: []
  });


  const handleInputChange = (e) => {
    setInput(e.target.value);
  }

  const sendMessage = () => {
    if (input.trim() !== '') {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [0]: [...prevMessages[0], { text: input, isMine: true }],
      }));
      setInput('');
    }

  }


  return (
    <div style={{ display: 'flex' }}>
      <DmListBox />
      <ChatBox input={input} handleInputChange = {handleInputChange} sendMessage={sendMessage}/>
    </div>
  );
}
