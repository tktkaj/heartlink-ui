import styled from 'styled-components';
import { CgMenuGridR } from "react-icons/cg";
import { IoHeart } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import SideMenu from '../layout/SideMenu';


let Content = styled.div`
    width: 80vw;
    background-color: #F8F8FA;
    height: 100vh;
    overflow-y: auto;

    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
`
let Header = styled.div`
    width : 830px;
    height: 260px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid lightgray;
    margin-left: 13vw;
`

let Main_Profile = styled.div`
    width: 140px;
    height: 140px;
    border-radius: 100%;
    background-image: url(${props => props.background});
    background-size: cover;
    background-position: center;
    position:relative;

`
let Sub_Profile = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 100%;
    position : absolute;
    background-image: url(${props => props.background});
    background-size: cover;
    background-position: center;
    left: 182px;
    top: 149px;
    z-index: 4;
`
let Outline_Profile = styled.div`
    width: 70px;
    height: 70px;
    border-radius: 100%;
    background-color: #FFFFFF;
    position:relative;
    z-index: 3;
    left: -58px;
    top: 49px;
`
let Word_Wrap = styled.div`
    width: 260px;
    flex-grow: 1;
`
let Nickname_Wrap = styled.div`
    padding-bottom: 5px;
`
let Nickname = styled.span`
    font-size:20px;
`
let Status_Message_Wrap = styled.div``
let Status_Message = styled.span`
    font-size:16px;
`
let Follow_Wrap = styled.div`
    
    padding-left:100px;
    
`
let Follow = styled.ul`
    display: flex;
`
let Follow_li = styled.li`
`
let Menu_Wrap = styled.div`
    width: 830px;
    height: 65px;
    display:flex;
    align-items: center;
    justify-content: flex-end;
    margin-left: 13vw;
`
let Menu = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;
`
let Post_List = styled.div`
    width: 830px;
    display:flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-left: 13vw;
    padding-bottom: 10vh;
`
let Post = styled.div`
    width: 266px;
    height: 245px;
    background-image: url(${props => props.background});
    background-size: cover;
    background-position: center;
`
let Post_Link = styled.a`
    width: 100%;
    height: 100%;
    display: block;
    z-index: 1;  
`

function MyPage() {
    const mainProfileImage = require('../image/mypage/sponge.jpg');
    const subProfileImage = require('../image/mypage/bono.jpg');
    const postImage = require('../image/mypage/ping.jpg');

    return (
        <div style={{ display: 'flex' }}>
            <SideMenu />
            <Content>

                <Header>
                    <Main_Profile background={mainProfileImage}></Main_Profile>
                    <Sub_Profile background={subProfileImage}></Sub_Profile>
                    <Outline_Profile></Outline_Profile>

                    <Word_Wrap>
                        <Nickname_Wrap>
                            <Nickname>김김이</Nickname>
                            <Nickname style={{ paddingLeft: '15px' }}>asdfasf122</Nickname>
                        </Nickname_Wrap>
                        <Status_Message_Wrap>
                            <Status_Message>동해물과 백두산이 마르고 닳도록 하늘님이 보우하사</Status_Message>
                        </Status_Message_Wrap>
                    </Word_Wrap>

                    <Follow_Wrap>
                        <Follow>
                            <Follow_li>
                                <Nickname style={{ paddingRight: '10px' }}>팔로워</Nickname>
                                <Nickname>125</Nickname>
                            </Follow_li>
                            <Follow_li>
                                <Nickname style={{ paddingLeft: '30px', paddingRight: '10px' }}>팔로잉</Nickname>
                                <Nickname>431</Nickname>
                            </Follow_li>
                        </Follow>
                    </Follow_Wrap>
                </Header>
                <Menu_Wrap>
                    <Menu><CgMenuGridR style={{ width: '100%', height: '100%' }} /></Menu>
                    <Menu><IoHeart style={{ width: '100%', height: '100%' }} /></Menu>
                    <Menu><IoBookmark style={{ width: '100%', height: '100%' }} /></Menu>
                </Menu_Wrap>

                <Post_List>
                    <Post background={postImage}>
                        <Post_Link></Post_Link>
                    </Post>
                    <Post background={postImage}>
                        <Post_Link></Post_Link>
                    </Post>
                    <Post background={postImage}>
                        <Post_Link></Post_Link>
                    </Post>
                    <Post background={postImage}>
                        <Post_Link></Post_Link>
                    </Post>
                    <Post background={postImage}>
                        <Post_Link></Post_Link>
                    </Post>
                    <Post background={postImage}>
                        <Post_Link></Post_Link>
                    </Post>
                </Post_List>

            </Content>
        </div>
    );

}

export default MyPage;