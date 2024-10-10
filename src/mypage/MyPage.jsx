import styled from 'styled-components';

let Content = styled.div`
    width: 1020px;
    display: flex;
    justify-content: center;
    background-color: #F8F8FA;
`
let Header = styled.div`
    width : 830px;
    height: 260px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid lightgray;
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
    left: 183px;
    top: 150px;
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

function MyPage() {
    const mainProfileImage = require('./image/sponge.jpg');
    const subProfileImage = require('./image/bono.jpg');

    return(
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
        </Content>
    );
    
}

export default MyPage;