import styled from 'styled-components';
import { CgMenuGridR } from "react-icons/cg";
import { IoHeart } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import SideMenu from '../sideMenu/SideMenu';

let Content = styled.div`
    width: 100vw;
    background-color: #F8F8FA;
    height: 100vh;
    overflow-y: auto;

    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    padding-left: 20vw;
`;

let Header = styled.div`
    width: 830px;
    height: 260px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid lightgray;
    margin-left: 13vw;
`;

let MainProfile = styled.div`
    width: 140px;
    height: 140px;
    border-radius: 100%;
    background-image: url(${props => props.background});
    background-size: cover;
    background-position: center;
    position: relative;
`;

let SubProfile = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 100%;
    position: absolute;
    background-image: url(${props => props.background});
    background-size: cover;
    background-position: center;
    bottom: -10px;
    right: 0;
    z-index: 4;
    outline: 5px solid white;
`;


let WordWrap = styled.div`
    width: 260px;
    flex-grow: 1;
    margin-left: 20px;
`;

let NicknameWrap = styled.div`
    padding-bottom: 5px;
`;

let Nickname = styled.span`
    font-size: 20px;
`;

let StatusMessageWrap = styled.div`
`;

let StatusMessage = styled.span`
    font-size: 16px;
`;

let FollowWrap = styled.div`
    padding-left: 100px;
`;

let Follow = styled.ul`
    display: flex;
`;

let FollowLi = styled.li``;

let MenuWrap = styled.div`
    width: 830px;
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: 13vw;
`;

let Menu = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
`;

let PostList = styled.div`
    width: 830px;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-left: 13vw;
    padding-bottom: 10vh;
`;

let Post = styled.div`
    width: 266px;
    height: 245px;
    background-image: url(${props => props.background});
    background-size: cover;
    background-position: center;
`;

let PostLink = styled.a`
    width: 100%;
    height: 100%;
    display: block;
    z-index: 1;  
`;

function MyPage() {
    const MainProfileImage = require('../image/mypage/sponge.jpg');
    const SubProfileImage = require('../image/mypage/bono.jpg');
    const PostImage = require('../image/mypage/ping.jpg');

    return (
        <div style={{ display: 'flex' }}>
            <SideMenu />
            <Content>

                <Header>
                    <MainProfile background={MainProfileImage}>
                        <SubProfile background={SubProfileImage}></SubProfile>
                    </MainProfile>

                    <WordWrap>
                        <NicknameWrap>
                            <Nickname>김김이</Nickname>
                            <Nickname style={{ paddingLeft: '15px' }}>asdfasf122</Nickname>
                        </NicknameWrap>
                        <StatusMessageWrap>
                            <StatusMessage>동해물과 백두산이 마르고 닳도록 하늘님이 보우하사</StatusMessage>
                        </StatusMessageWrap>
                    </WordWrap>

                    <FollowWrap>
                        <Follow>
                            <FollowLi>
                                <Nickname style={{ paddingRight: '10px' }}>팔로워</Nickname>
                                <Nickname>125</Nickname>
                            </FollowLi>
                            <FollowLi>
                                <Nickname style={{ paddingLeft: '30px', paddingRight: '10px' }}>팔로잉</Nickname>
                                <Nickname>431</Nickname>
                            </FollowLi>
                        </Follow>
                    </FollowWrap>
                </Header>
                <MenuWrap>
                    <Menu><CgMenuGridR style={{ width: '100%', height: '100%' }} /></Menu>
                    <Menu><IoHeart style={{ width: '100%', height: '100%' }} /></Menu>
                    <Menu><IoBookmark style={{ width: '100%', height: '100%' }} /></Menu>
                </MenuWrap>

                <PostList>
                    <Post background={PostImage}>
                        <PostLink></PostLink>
                    </Post>
                    <Post background={PostImage}>
                        <PostLink></PostLink>
                    </Post>
                    <Post background={PostImage}>
                        <PostLink></PostLink>
                    </Post>
                    <Post background={PostImage}>
                        <PostLink></PostLink>
                    </Post>
                    <Post background={PostImage}>
                        <PostLink></PostLink>
                    </Post>
                    <Post background={PostImage}>
                        <PostLink></PostLink>
                    </Post>
                </PostList>

            </Content>
        </div>
    );

}

export default MyPage;
