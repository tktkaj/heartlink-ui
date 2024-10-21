import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

const SettingBox = styled.div`
    background-color: white;
    border: rgba(160, 160, 160, 0.2) 2px solid;
    border-radius: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    left: 59.5vw;
    top: 16vh;
    z-index: 2000;
`

const SettingList = styled.div`
    display: flex;
    .settingIcon{
        width: 23px;
        height: 23px;
    }
    padding: 25px 22px ;
    height: 6vh;
    gap: 11px;
    align-items: center;
    cursor: pointer;
    &:hover{
        background-color: #e6e6ff;
    }
    transition: background-color 0.4s ease;
`
const Canvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0);
  z-index: 53;
`;

export default function FeedModal({ closeModal }) {
    return (
        <>
            <SettingBox>
                <ul>
                    <SettingList>
                        <p>게시글 수정</p>
                    </SettingList>
                    <Link to="/deleteAlert">
                        <SettingList>
                            <p>게시글 삭제</p>
                        </SettingList>
                    </Link>
                </ul>
            </SettingBox>
            <Canvas onClick={closeModal} />
        </>
    )
}
