import styled from 'styled-components';

let Content = styled.div`
    width: 1020px;
    background-color: #F8F8FA;
`
let Content_Wrap = styled.div`
    width: 770px;
    margin: 0px auto;
`
let Search_Result_Wrap = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;
`
let Search_Result = styled.span`
    font-size: 20px;
`
let Post_Wrap = styled.div`
    width : 100%;
`
let Post_List = styled.div`
    width: 100%;
    display:flex;
    justify-content: space-between;
    margin: 0px auto 10px;
`
let Post = styled.div`
    width: 250px;
    height: 235px;
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

function Search() {
    const postImage = require('./image/ping.jpg');

    return(
        <Content>
            <Content_Wrap>
                <Search_Result_Wrap>
                    <Search_Result>&풍경사진</Search_Result>
                </Search_Result_Wrap>

                <Post_Wrap>
                    <Post_List>
                        <Post  background={postImage}>
                            <Post_Link></Post_Link>
                        </Post>
                        <Post  background={postImage}>
                            <Post_Link></Post_Link>
                        </Post>
                        <Post  background={postImage}>
                            <Post_Link href=''></Post_Link>
                        </Post>
                    </Post_List>

                    <Post_List>
                        <Post  background={postImage}>
                            <Post_Link></Post_Link>
                        </Post>
                        <Post  background={postImage}>
                            <Post_Link></Post_Link>
                        </Post>
                        <Post  background={postImage}>
                            <Post_Link href=''></Post_Link>
                        </Post>
                    </Post_List>

                    <Post_List>
                        <Post  background={postImage}>
                            <Post_Link></Post_Link>
                        </Post>
                        <Post  background={postImage}>
                            <Post_Link></Post_Link>
                        </Post>
                        <Post  background={postImage}>
                            <Post_Link href=''></Post_Link>
                        </Post>
                    </Post_List>
                </Post_Wrap>
            </Content_Wrap>       
        </Content>

    );

}
export default Search;
