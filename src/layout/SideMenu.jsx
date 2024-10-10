import React from 'react'
import styled from 'styled-components'
import logo from '../images/logo2.png';
import { IoHomeOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";



const Sidebar = styled.div`
    width: 300px;
    height: 100vh;
    padding-top: 30px;
    border-right: solid gray 1px;
`

const Logostyle = styled.div`
    width: 170px;
    margin-left: 28px;
    padding-bottom: 30px;
`
const Ulstyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 120px;
    justify-content: space-between;
`

const Liststyle = styled.div`
    display: flex;
    height: 65px;
    font-size: 18px;
    gap: 11px;
    align-items: center;
    justify-content: flex-start;
    margin-left:40px;
`

export default function SideMenu() {

    return (
        <>
            <Sidebar>
                <Logostyle>
                    <img src={logo} alt="로고" />
                </Logostyle>
                <div>
                    <Ulstyle>
                        <div>
                            <Liststyle><IoHomeOutline className='icon' />홈</Liststyle>
                            <Liststyle><LuSearch className='icon' />검색</Liststyle>
                            <Liststyle><svg className='icon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box2-heart" viewBox="0 0 16 16">
                                <path d="M8 7.982C9.664 6.309 13.825 9.236 8 13 2.175 9.236 6.336 6.31 8 7.982" />
                                <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4zm0 1H7.5v3h-6zM8.5 4V1h3.75l2.25 3zM15 5v10H1V5z" />
                            </svg>커플</Liststyle>
                            <Liststyle><FaRegBell className='icon' />알림</Liststyle>
                            <Liststyle><AiOutlineMessage className='icon' />메시지</Liststyle>
                            <Liststyle>moong_52</Liststyle>
                        </div>
                        <div>
                            <Liststyle><IoSettingsOutline className='icon' />설정</Liststyle>
                        </div>
                    </Ulstyle>
                </div>
            </Sidebar >
        </>
    )
}
