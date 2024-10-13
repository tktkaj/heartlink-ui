import DmListBox from './DmListBox';
import ChatBox from './ChatBox';

export default function ChatRoom() {

  return (
    <div style={{ display: 'flex' }}>
      <DmListBox />
      <ChatBox/>
    </div>
  );
}
