import React from 'react'
import styled from 'styled-components'
import Logo from '../image/logo/logo2.png'

const DmListBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    width: 300px;
    padding: 30px;
    border-right: 1px solid #ddd;
    background-color: #f5f5f5;
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
    width: calc(100% - 300px);
    padding: 30px;
    background-color: #fff;
`

const ChatHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #333;
    img {
    display: block;
    width: 100%;
    height: 100%;
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
                 Hyuna
            </ChatHeader>
            <ChatContent>
                hello
                <DmItem><img src={Logo}></img></DmItem>
            </ChatContent>
        </ChatBox>
    </div>
  )
}
