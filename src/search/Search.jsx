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
    const PostImage = require('../image/search/ping.jpg');
    const [searchResults, setSearchResults] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [isTagView, setIsTagView] = useState(false);


    useEffect(() => {
        getPopularPosts();

        
    }, []);

    const getPopularPosts = async () => {
        try {
            const access = localStorage.getItem("access");
            const authAxios = getAuthAxios(access);
            const response = await authAxios.get("http://localhost:9090/search/getSearchPost");
            const popularPosts = response.data;
            setSearchResults(popularPosts);
        } catch (error) {
            console.error("Error fetching popular posts:", error);
        }
    };

    const handleSearchResults = (results) => {
        setIsTagView(false);
        const extractedResults = results.map((result) => result);
        setSearchResults(extractedResults);
    };

    const handleKeywordChange = (newKeyword) => {
        setKeyword(newKeyword);
    };

      const chunkArray = (arr, chunkSize) => {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    };

    const handleTagClick = (tagName) => {
        setIsTagView(true); // 태그 뷰로 변경
        
        const getTagPosts = async () => {
            try {
                const access = localStorage.getItem("access");
                const authAxios = getAuthAxios(access);
                const response = await authAxios.get(`http://localhost:9090/search/tag?keyword=${tagName}`);
                console.log("tag검색인데 search다 : ", response.data);
                setSearchResults(response.data);
            } catch (error) {
                console.error("Error fetching tag posts:", error);
            }
        };
        getTagPosts(tagName);
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
                    {isTagView ? 
                // 태그 검색 결과 뷰
                (
                    searchResults && searchResults.length > 0 ? (
                        chunkArray(searchResults, 3).map((chunk, chunkIndex) => (
                            <PostList key={chunkIndex}>
                                {chunk.map((result) => (
                                    <Post key={result.postId} background={result.fileUrl || PostImage}>
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
                // 기존 검색 결과 뷰
                !keyword.startsWith('&') && !keyword.startsWith('@') ? (
                    searchResults[0] && searchResults[0].length > 0 ? (
                        chunkArray(searchResults[0], 3).map((chunk, chunkIndex) => (
                            <PostList key={chunkIndex}>
                                {chunk.map((result) => (
                                    <Post key={result.id} background={result.img || PostImage}>
                                        <PostLink href={`/feed/details/${result.id}`}></PostLink>
                                    </Post>
                                ))}
                            </PostList>
                        ))
                    ) : (
                        <div>검색 결과가 없습니다.</div>
                    )
                ) : ''
            )}
                    </PostWrap>
                </ContentWrap>
            </Content>
        </div>
    );
}

export default Search;
