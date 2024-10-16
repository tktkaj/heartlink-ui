import styled from 'styled-components';
import SideMenu from '../layout/SideMenu';

let Content = styled.div`
    width: 100vw;
    background-color: #F8F8FA;
    display: flex;
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

let ContentWrap = styled.div`
    width: 770px;
    margin-left: 13vw;
`;

let SearchResultWrap = styled.div`
    width: 100%;
    height: 90px;
    display: flex;
    align-items: center;
`;

let SearchResult = styled.span`
    font-size: 20px;
`;

let PostWrap = styled.div`
    width: 100%;
`;

let PostList = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0px auto 10px;
`;

let Post = styled.div`
    width: 250px;
    height: 235px;
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

function Search() {
    const PostImage = require('../image/search/ping.jpg');

    return (
        <div style={{ display: 'flex' }}>
            <SideMenu />
            <Content>
                <ContentWrap>
                    <SearchResultWrap>
                        <SearchResult>&풍경사진</SearchResult>
                    </SearchResultWrap>

                    <PostWrap>
                        <PostList>
                            <Post background={PostImage}>
                                <PostLink></PostLink>
                            </Post>
                            <Post background={PostImage}>
                                <PostLink></PostLink>
                            </Post>
                            <Post background={PostImage}>
                                <PostLink href=''></PostLink>
                            </Post>
                        </PostList>

                        <PostList>
                            <Post background={PostImage}>
                                <PostLink></PostLink>
                            </Post>
                            <Post background={PostImage}>
                                <PostLink></PostLink>
                            </Post>
                            <Post background={PostImage}>
                                <PostLink href=''></PostLink>
                            </Post>
                        </PostList>

                        <PostList>
                            <Post background={PostImage}>
                                <PostLink></PostLink>
                            </Post>
                            <Post background={PostImage}>
                                <PostLink></PostLink>
                            </Post>
                            <Post background={PostImage}>
                                <PostLink href=''></PostLink>
                            </Post>
                        </PostList>
                    </PostWrap>
                </ContentWrap>
            </Content>
        </div>
    );
}

export default Search;
