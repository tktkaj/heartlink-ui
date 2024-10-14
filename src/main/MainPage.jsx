import React, { useState } from 'react'
import SideMenu from '../layout/SideMenu'
import styled from 'styled-components'
import Feed from './Feed'
import profilethum from '../image/sidebar/test.png';
import Upload from '../layout/Upload';
import Setting from '../layout/Setting';

const MainContainer = styled.div`

    background-color: #F8F8FA;
    display: flex;
`
const LoveStatus = styled.div`
    width: 15vw;
    height: 12vh;
    background-color: white;
    border: rgba(160, 160, 160, 0.2) 1px solid;
    border-radius: 15px;
    margin-top: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
`
const ProfileThum = styled.div`
    width:50px;
    height: 50px;
    overflow: hidden; 
    border-radius: 50%; 
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    margin-right: 15px;
`

const BasicAlarm = styled.div`
    width: 15vw;
    height: 6vh;
    background-color: white;
    border: rgba(160, 160, 160, 0.2) 1px solid;
    border-radius: 10px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LoveAlarm = styled.div`
    width: 20vw;
    height: 6vh;
    background-color: #ffebeb;
    border: rgba(160, 160, 160, 0.2) 1px solid;
    border-radius: 10px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default function MainPage() {

    const [showSetting, setShowSetting] = useState(false);

    const handleSettingClick = () => {
        setShowSetting(prev => !prev);
    };


    return (
        <MainContainer>
            <SideMenu onSettingClick={handleSettingClick} />
            <Feed />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '80px', gap: '10px' }}>
                <LoveStatus>
                    <ProfileThum>
                        <img src={profilethum} alt="" />
                    </ProfileThum>
                    <div>
                        <p style={{ fontFamily: 'SokchoBadaBatang' }}>shinshinjeonghun</p>
                        <p style={{ fontSize: '14px' }}>접속중</p>
                    </div>
                </LoveStatus>
                <BasicAlarm>
                    <p>neung._. 님이 좋아요를 눌렀습니다.</p>
                </BasicAlarm>
                <LoveAlarm>
                    <p>신닭가슴살님과 링크매치 성공💕 </p>
                </LoveAlarm>
            </div>
            <Upload />
            {showSetting && <Setting />}
        </MainContainer>
    )
}
