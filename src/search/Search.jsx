import styled from 'styled-components';
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import SideMenu from '../sideMenu/SideMenu';
import MiniSide from '../sideMenu/MiniSide';
import SearchMenu from '../sideMenu/SearchMenu';
import { getAuthAxios } from "../api/authAxios";

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

function Search() {
    // const PostImage = require('../image/search/ping.jpg');
    const [searchResults, setSearchResults] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [isTagView, setIsTagView] = useState(false);
    const [isPopular, setIsPopular] = useState(false);

    useEffect(() => {
        getPopularPosts();
        // getAllPosts();
    }, []);

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

    const getPopularPosts = async () => {
        try {
            const access = localStorage.getItem("access");
            const authAxios = getAuthAxios(access);
            const response = await authAxios.get("http://localhost:9090/search/getSearchPost");
            const popularPosts = response.data;
            setSearchResults(popularPosts);
            setIsPopular(true);
            console.log('인기글 조회 : ', popularPosts);
        } catch (error) {
            console.error("Error fetching popular posts:", error);
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
                            <PostLink href={`/feed/details/${result.id}`}></PostLink>
                        </Post>
                    );
                })}
            </PostList>
        );
    });
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
                                        <PostLink href={`/feed/details/${result.postId}`}></PostLink>
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
                                        <PostLink href={`/feed/details/${result.postId}`}></PostLink>
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
                    </PostWrap>
                </ContentWrap>
            </Content>
        </div>
    );
}

export default Search;