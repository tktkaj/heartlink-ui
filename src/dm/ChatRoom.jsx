import React from 'react'
import styled from 'styled-components'
import Logo from '../image/logo/logo2.png'
import profileImg from '../image/testimg/와구리.png'


const DmListBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    width: 300px;
    padding: 30px;
    border-right: 1px solid #ddd;
    background-color: #F8F8FA;
`

const DmListHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
`

const DmList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
    gap: 10px;
`

const DmItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: #fff;
    cursor: pointer;
    &:hover {
        background-color: #f0f0f0;
    }
`

const ChatBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    height: 100%;
    width: 1000px;
    /* width: calc(100% - 500px); */
    background-color: #fff;
`

const ChatHeader = styled.div`
    padding: 10px 0 10px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap:700px;
    font-size: 1.5rem;
    color: #333;
    border-bottom: 1px solid #ddd;
    img {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`

const ChatContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 10px;
    border-radius: 20px;
    background-color: #706EF4;
`

const CloseButton = styled.button`
    padding: 2px 10px;
    border-radius: 5px;
    font-size: 1rem;
    color: #706EF4;
    cursor: pointer;
`

export default function ChatRoom() {
  return (
    <div style={{display: 'flex'}}>
        <DmListBox>
            <DmListHeader>
                {/* DM 목록 헤더 */}
            </DmListHeader>
            <DmList>
                {/* DM 목록 */}
            </DmList>
        </DmListBox>
        <ChatBox>
            <ChatHeader>
                <div style={{display: 'flex'}}>
                <img src={profileImg}></img>
                <div style={{fontSize: '1.7rem', marginLeft:'10px'}}>Hyuna</div>
                </div>
                <CloseButton>차단</CloseButton>
            </ChatHeader>
            <div style={{padding:'50px'}}>
            <ChatContent>
                hello
                <DmItem><img src={Logo}></img></DmItem>
            </ChatContent>
            </div>
        </ChatBox>
    </div>
  )
}
