import styled from 'styled-components';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SideMenu from '../sideMenu/SideMenu';
import MiniSide from '../sideMenu/MiniSide';
import SearchMenu from '../sideMenu/SearchMenu';
import { getAuthAxios } from "../api/authAxios";
import FeedDetail from "../layout/FeedDetail";

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
    padding-bottom: 200px;

`;

let PostList = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 0px auto 10px;
    justify-content: flex-start;
    flex-wrap: wrap;
`;

let Post = styled.div`
    width: 250px;
    height: 235px;
    background-image: url(${props => props.background});
    background-size: cover;
    background-position: center;
    margin-right: 10px;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: calc(33.33% - 10px);
    background-color: #ccc;
`;

let PostLink = styled.a`
    width: 100%;
    height: 100%;
    display: block;
    z-index: 1; 
`;

let LoadingIndicator = styled.div`
    width: 100%;
    text-align: center;
    margin-top: 20px;
    font-size: 24px; /* 더 큰 글씨 크기 */
    color: #ff4500; /* 강렬한 색상 */
    font-weight: bold; /* 굵은 텍스트 */
    animation: pulse 1.5s infinite; /* 애니메이션 추가 */

    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.1);
            opacity: 0.7;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`;

function Search() {
    const [searchResults, setSearchResults] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [isTagView, setIsTagView] = useState(false);
    const [isPopular, setIsPopular] = useState(false);
    // 무한 스크롤
    const [isLoading, setIsLoading] = useState(false);
    const [nextCursor, setNextCursor] = useState(null);
    const limit = 15;

    useEffect(() => {
        getPopularPosts();
    
        const handleScroll = () => {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 && !isLoading) {
                loadMorePosts();
            }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isLoading]);

    const getAllPosts = async () => {
        try {
            const access = localStorage.getItem("access");
            const authAxios = getAuthAxios(access);
            const response = await authAxios.get("http://localhost:9090/search/allPosts");
            console.log('모든 게시글 조회 : '+response.data);
            setSearchResults(response.data);
        } catch (error) {
            console.error("Error fetching all posts:", error);
        }
    };

    // 무한 스크롤 이벤트 리스너
    window.addEventListener('scroll', () => {
        if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !isLoading) {
            loadMorePosts();
        }
    });

    // 무한 스크롤 데이터 로드
    const loadMorePosts = () => {
        setIsLoading(true);
        getPopularPosts();
    };

    const getPopularPosts = async () => {
        try {
            const access = localStorage.getItem("access");
            const authAxios = getAuthAxios(access);
            const response = await authAxios.get(`http://localhost:9090/search/getSearchPost?cursor=${nextCursor || ''}&limit=${limit}`);
            const popularPosts = response.data;
    
            setNextCursor(popularPosts.nextCursor);
            setSearchResults(prevResults => [...prevResults, ...popularPosts.data]); // 기존 데이터에 추가
            setIsPopular(true);
    
            if (!popularPosts.hasNext) {
                window.removeEventListener('scroll', loadMorePosts);
            }
        } catch (error) {
            console.error("Error fetching popular posts:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearchResults = (results) => {
        setIsTagView(false);
        if (!keyword.startsWith('&') && !keyword.startsWith('@')) {
            setIsPopular(false);
        } else {
            setIsPopular(true);
        }
        const extractedResults = results.map((result) => result);
        setSearchResults(extractedResults);
    };

    const handleKeywordChange = (newKeyword) => {
        setKeyword(newKeyword);
    };

      const chunkArray = (arr, chunkSize) => {
        const result = [];
        const validItems = arr.filter(item => item);
        
        for (let i = 0; i < validItems.length; i += chunkSize) {
            const chunk = validItems.slice(i, Math.min(i + chunkSize, validItems.length));
            if(chunk.length > 0) {
                result.push(chunk);
            }
        }
        return result;
    };
    

    const handleTagClick = (tagName) => {
        setIsTagView(true);
        setIsPopular(false);
        const getTagPosts = async () => {
            try {
                const access = localStorage.getItem("access");
                const authAxios = getAuthAxios(access);
                const response = await authAxios.get(`http://localhost:9090/search/tag?keyword=${tagName}`);
                setSearchResults(response.data);
            } catch (error) {
                console.error("Error fetching tag posts:", error);
            }
        };
        getTagPosts(tagName);
    };

// 일반 검색 결과 렌더링을 위한 전용 함수
const renderGeneralSearchResults = () => {
    if (!searchResults || !Array.isArray(searchResults) || searchResults.length === 0) {
        return <div>검색 결과가 없습니다.</div>;
    }

    const validResults = searchResults.filter(result => result !== null && result !== undefined);
    
    return chunkArray(validResults, 3).map((chunk, chunkIndex) => {
        console.log("각 chunk 데이터:", chunk); // chunk 데이터 확인
        return (
            <PostList key={chunkIndex}>
                {chunk.map((result) => {
                    return (
                        <Post d
                            key={result.id} 
                            background={result.img}>
                            <PostLink style={{cursor: 'pointer'}} onClick={(e)=>handleMessageClick(result.id)}></PostLink>
                        </Post>
                    );
                })}
            </PostList>
        );
    });
};
const [postDetails, setPostDetails] = useState('null');
const [isFeedDetail, setIsFeedDetail] = useState(false);
const handleMessageClick = (post) => {
    console.log("Selected PostId: ", post);
    setPostDetails(post);
    setIsFeedDetail(true);
    console.log('isFeedDetail : ', isFeedDetail)

};

    return (


        
        <div style={{ display: 'flex' }}>
            {/* <SideMenu /> */}
            <MiniSide />
            <SearchMenu onTagClick={handleTagClick} onSearchResults={handleSearchResults} onKeywordChange={handleKeywordChange} />

            <Content>
                <ContentWrap>
                    <SearchResultWrap>
                        <SearchResult>
                            {isTagView? keyword :( keyword ? (keyword.charAt(0) === '@' || keyword.charAt(0) === '&' ? '인기글 리스트' : keyword) : '인기글 리스트')}
                        </SearchResult>
                    </SearchResultWrap>
                    <PostWrap>
                        {isPopular?(searchResults && searchResults.length > 0 ? (
                        chunkArray(searchResults, 3).map((chunk, chunkIndex) => (
                            <PostList key={chunkIndex}>
                                {chunk.map((result) => (
                                    <Post key={result.postId} background={result.fileUrl}>
                                        <PostLink style={{cursor: 'pointer'}} onClick={(e)=>handleMessageClick(result.postId)}></PostLink>
                                    </Post>
                                ))}
                            </PostList>
                        ))
                    ):''):null}



                {isTagView ? 

                // 태그 검색 결과 뷰
                (
                    !isPopular && searchResults && searchResults.length > 0 ? (
                        chunkArray(searchResults, 3).map((chunk, chunkIndex) => (
                            <PostList key={chunkIndex}>
                                {chunk.map((result) => (
                                    <Post key={result.postId} background={result.fileUrl}>
                                        <PostLink style={{cursor: 'pointer'}} onClick={(e)=>handleMessageClick(result.id)}></PostLink>
                                    </Post>
                                ))}
                            </PostList>
                        ))
                    ) : (
                        <div>검색 결과가 없습니다.</div>
                    )
                )
             : (
                // 일반 검색 결과 뷰
                !isPopular && !keyword.startsWith('&') && !keyword.startsWith('@') ? 
                    renderGeneralSearchResults() 
                    : ''
            )}


                        {/* 로딩 중일 때 로딩 인디케이터 표시 */}
                        {isLoading && (
                            <LoadingIndicator>데이터를 불러오는 중입니다...</LoadingIndicator>
                        )}
                        <div>로딩중주우주웆ㅇ</div>
                    </PostWrap>
                </ContentWrap>
            </Content>
            {isFeedDetail && (
                <FeedDetail
                    isOpen={isFeedDetail}
                    onClose={() => setIsFeedDetail(false)}
                    post={postDetails} // 선택된 포스트 전달
                />
            )}

        </div>
    );
}

export default Search;