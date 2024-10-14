import React from 'react'
import styled from 'styled-components'
import { FaHeartBroken } from "react-icons/fa";
import { HiMiniEyeSlash } from "react-icons/hi2";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";

const SettingBox = styled.div`
    width: 200px;
    height: 230px;
    background-color: white;
    border: rgba(160, 160, 160, 0.2) 2px solid;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 30px;
    bottom: 75px;
`

const SettingList = styled.div`
    display: flex;
    .settingIcon{
        width: 25px;
        height: 25px;
    }
    height: 6vh;
    gap: 8px;
    align-items: center;
`

export default function Setting() {

    return (
        <>
            <SettingBox>
                <ul>
                    <SettingList>
                        <FaHeartBroken className='settingIcon' />
                        <p>커플 해제</p>
                    </SettingList>
                    <SettingList>
                        <HiMiniEyeSlash className='settingIcon' />
                        <p>차단유저 관리</p>
                    </SettingList>
                    <SettingList>
                        <RiLockPasswordFill className='settingIcon' />
                        <p>비밀번호 변경</p>
                    </SettingList>
                    <SettingList>
                        <IoLogOut className='settingIcon' />
                        <p>로그아웃</p>
                    </SettingList>
                </ul>
            </SettingBox>
        </>
    )
}