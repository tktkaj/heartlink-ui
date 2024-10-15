import React, { useEffect, useRef, useState } from 'react'
import SideMenu from '../layout/SideMenu'
import styled from 'styled-components'
import Feed from './Feed'
import profilethum from '../image/sidebar/test.png';
import Upload from '../layout/Upload';
import Setting from '../layout/Setting';

const Container = styled.div`
    width: 80vw;
    height: 100vh;
    overflow-y: auto;

    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    padding-bottom: 20vh;
    display: flex;
`

const MainContainer = styled.div`
    background-color: #F8F8FA;
    display: flex;
`

const StatusContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 80px;
    gap: 10px;
    position: fixed;
    right: 10vw;
`

const LoveStatus = styled.div`
    width: 19vw;
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
    width: 19vw;
    height: 6vh;
    background-color: white;
    border: rgba(160, 160, 160, 0.2) 1px solid;
    border-radius: 10px;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const LoveAlarm = styled.div`
    width: 19vw;
    height: 6vh;
    background-color: #ffebeb;
    border: rgba(160, 160, 160, 0.2) 1px solid;
    border-radius: 10px;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
`

export default function MainPage() {

    const [showSetting, setShowSetting] = useState(false);
    const settingRef = useRef(null);

    const handleSettingClick = (event) => {
        setShowSetting(prev => !prev);
        event.stopPropagation()
    };

    const handleClickOutside = (event) => {
        if (settingRef.current && !settingRef.current.contains(event.target)) {
            setShowSetting(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    return (
        <MainContainer>
            <SideMenu onSettingClick={handleSettingClick} />
            <Container>
                <Feed />
                <StatusContainer>
                    <LoveStatus>
                        <ProfileThum>
                            <img src={profilethum} alt="" />
                        </ProfileThum>
                        <div>
                            <p style={{ fontFamily: 'SokchoBadaBatang', fontSize: '17px' }}>shinshinjeonghun</p>
                            <p style={{ fontSize: '15px' }}>접속중</p>
                        </div>
                    </LoveStatus>
                    <BasicAlarm>
                        <p>neung._. 님이 좋아요를 눌렀습니다.</p>
                    </BasicAlarm>
                    <LoveAlarm>
                        <p>신닭가슴살님과 링크매치 성공💕 </p>
                    </LoveAlarm>
                </StatusContainer>
                <div ref={settingRef}>
                    {showSetting && <Setting />}
                </div>
            </Container>
            <Upload />

        </MainContainer>
    )
}
