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
    const [loading, setLoading] = useState(false); // 로딩 상태 추가
    const navigate = useNavigate(); // useNavigate를 컴포넌트 최상단에서 호출

    useEffect(() => {
        getPopularPosts();
    }, []);

    const getPopularPosts = async () => {
        try {
            const access = localStorage.getItem("access");
            const authAxios = getAuthAxios(access); // 함수 호출로 인스턴스를 반환
            const response = await authAxios.get("http://localhost:9090/search/getSearchPost");
            console.log("fffffresponse : ", response);
            const popularPosts = response.data;
            setSearchResults(popularPosts);
            console.log("인기글 가져온거다 : ", popularPosts); // 여기서 로그를 찍어야 함
        } catch (error) {
            console.error("Error fetching popular posts:", error);
        }
    };

    const handleSearchResults = (results) => {
        const extractedResults = results.map((result) => result);
        setSearchResults(extractedResults);

        console.log("search의 searchResults : ", searchResults);
    };

    useEffect(() => {
    }, [searchResults, keyword]);

    const handleKeywordChange = (newKeyword) => {
        setKeyword(newKeyword);
    };

      // 배열을 주어진 크기로 잘라내는 함수
      const chunkArray = (arr, chunkSize) => {
        const result = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            result.push(arr.slice(i, i + chunkSize));
        }
        return result;
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* <SideMenu /> */}
            <MiniSide />
            <SearchMenu onSearchResults={handleSearchResults} onKeywordChange={handleKeywordChange} />

            <Content>
                <ContentWrap>
                    <SearchResultWrap>
                        <SearchResult>
                            {keyword ? (keyword.charAt(0) === '@' || keyword.charAt(0) === '&' ? '인기글 리스트' : keyword) : '인기글 리스트'}
                        </SearchResult>
                    </SearchResultWrap>
                    <PostWrap>
                    {!keyword.startsWith('&') && !keyword.startsWith('@') ? (
                    searchResults[0] && searchResults[0].length > 0 ? (
        // searchResults[0] 배열을 3개씩 묶어서 PostList로 표시
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
) : ''}
                    </PostWrap>
                </ContentWrap>
            </Content>
        </div>
    );
}

export default Search;
