import React from 'react'
import styled from 'styled-components'
import profilethum from '../image/sidebar/test.png';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from "axios";
import { getAuthAxios } from "../api/authAxios";
import { BiSearch } from "react-icons/bi";



const MenuContainer = styled.div`
    width: 400px;
    height: 100vh;
    background-color: white;
    border-radius: 0 10px 10px 0;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 82px;
    @keyframes slideIn {
    from {
        transform: translateX(-80%);
    }
    to {
        transform: translateX(0);
    }
}
    animation: slideIn 0.4s forwards;
    padding-top: 5vh;
`

const SearchList = styled.div`
    display: flex;
`

const ProfileThum = styled.div`
    width: 28px;
    height: 28px;
    overflow: hidden; 
    border-radius: 50%; 
    border: 1px solid #6b6b6b;
    text-align: center;
    color: #706EF4;
`

const Ulstyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

const Liststyle = styled.div`
    display: flex;
    width: 400px;
    height: 68px;
    font-size: 17px;
    gap: 13px;
    align-items: center;
    justify-content: flex-start;
    transition: background-color 0.4s ease;
    cursor: pointer;
    &:hover{
        background-color: #e6e6ff;
    }
    padding-left: 2vw;
`

export default function SearchMenu({ onSearchResults, onKeywordChange, onTagClick }) {
const [keyword, setKeyword] = useState('');
const [searchResults, setSearchResults] = useState([]);
const [isSearched, setIsSearched] = useState(false);
const [searchHistory, setSearchHistory] = useState([]);
const [isSearchedHistory, setIsSearchedHistory] = useState(false);
const handleSearch = (e) => {
    e.preventDefault();
    onSearchResults(keyword);
    onKeywordChange(keyword);
};

const handleTagClick = (tagName) => {
    console.log(`태그 클릭됨: ${tagName}`);
    onKeywordChange('&' + tagName);
    onTagClick(tagName);
};

useEffect(() => {
    const getSearchHistory = async () => {
    try {
        const access = localStorage.getItem("access");
        const response = await axios.get(
            `http://localhost:9090/search/history`,
            {
                headers: {
                    Authorization: access,
                }
            }
        );
        console.log('검색기록 결과:', response.data);
        setSearchHistory(response.data);
    } catch (error) {
        if (error.response) {
            console.error('서버 응답 에러:', error.response.data);
        } else {
            console.error('API 요청 실패:', error.message);
        }
    }  finally {
            setIsSearched(false);
        }
    };
    getSearchHistory();
}, []);


    const searchSubmit = async (e) => {
        e.preventDefault();
        console.log('검색 제출:', keyword);
        
        try {
            const access = localStorage.getItem("access");
            const response = await axios.get(
                `http://localhost:9090/search/keyword`,
                {
                    params: { keyword },
                    headers: {
                        Authorization: access,
                    },
                }
            );
            console.log('검색 결과:', response.data);
            setSearchResults([response.data]);
            console.log('setSearchResults 결과:', searchResults);
            onSearchResults(response.data);
            onKeywordChange(keyword);
             if (typeof response.data === 'string') {
                setSearchResults(response.data);
                setSearchResults([]);
            }
        } catch (error) {
            if (error.response) {
                console.error('서버 응답 에러:', error.response.data);
            } else {
                console.error('API 요청 실패:', error.message);
            }
        }  finally {
            setIsSearched(true);
        }
    };

    const renderResult = (result) => {
        switch (result.type) {
            case 'id':
                return <Link to={`/user/profile/${result.userId}`}>
                <Liststyle key={result.loginId}>
                <ProfileThum>
                    <img src={result.img} alt="프로필이미지" />
                </ProfileThum>
                <p style={{ fontFamily: 'SokchoBadaBatang' }}>{result.loginId}</p>
            </Liststyle></Link>;
            case 'tag':
                return <Liststyle key={result.tagName} onClick={() => handleTagClick(result.tagName)}>
                <ProfileThum>
                    &
                </ProfileThum>
                <p>{result.tagName}</p>
            </Liststyle>;
        }
    };

    const historyClick = (historyKeyword) => {
        console.log('검색기록 클릭:', historyKeyword);
        setKeyword(historyKeyword); // 검색 기록의 키워드를 input 상태로 설정
    };

    const renderHistory = (history) => {
        switch (history.type) {
            case 'id':
                return (
                    <Liststyle key={history.keyword} onClick={() => historyClick('@' + history.keyword)}>
                        <p style={{ fontFamily: 'SokchoBadaBatang' }}>@{history.keyword}</p>
                    </Liststyle>
                );
            case 'tag':
                return (
                    <Liststyle key={history.keyword} onClick={() => historyClick('&' + history.keyword)}>
                        <p style={{ fontFamily: 'SokchoBadaBatang' }}>&{history.keyword}</p>
                    </Liststyle>
                );
            case 'content':
                return (
                    <Liststyle key={history.keyword} onClick={() => historyClick(history.keyword)}>
                        <p style={{ fontFamily: 'SokchoBadaBatang' }}>{history.keyword}</p>
                    </Liststyle>
                );
        }
    };
    

    return (
        <>
            <MenuContainer>
                <div style={{ fontSize: '1.5rem', marginBottom: '20px', paddingLeft: '2vw' }}>
                    <h1>검색</h1>
                </div>
                <form onSubmit={searchSubmit} style={{ display: 'flex' }}>
                <div style={{ marginLeft: '2vw', width: '85%', display: 'flex' }}>
                    <input type="text" required placeholder="검색어 입력" value={keyword} onChange={(e) => setKeyword(e.target.value)}
                        className="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 " style={{ width: '290px', paddingLeft: '7px', fontSize: '15px', backgroundColor: '#f5f5f5' }}></input>
                                <button type='submit' style={{width: '10%', marginLeft: '10px'}}>
                                <BiSearch style={{width: '30px', height: '30px'}}className="icon" />
                                </button>
                </div>
                </form>
                <hr style={{ marginTop: '4vh' }}></hr>
                <SearchList>

                {isSearched ? (
    Array.isArray(searchResults) && searchResults.length > 0 ? (
        <div>
            {searchResults.map((result, index) => (
                <div key={index}>
                    {renderResult(result)}
                </div>
            ))}
        </div>
    ) : (
        <div style={{margin:'auto', marginTop:'20px'}}>검색 결과가 없습니다.</div>
    )
) : null}
                </SearchList>


                {/* 검색기록 */}
                {isSearched? null:(
                    <>
                    <div style={{ fontSize: '1.2rem', marginBottom: '20px', paddingLeft: '2vw', marginTop:'20px' }}>
                    <h1>검색기록</h1>
                </div>
                <SearchList>
                
                {Array.isArray(searchHistory) && searchHistory.length > 0 ? (
        <div>
            {searchHistory.map((result, index) => (
                <div key={index}>
                    {renderHistory(result)}
                </div>
            ))}
        </div>
    ) : (
        <div style={{ paddingLeft: '2vw' }}>검색 기록이 없습니다.</div>
    )}</SearchList>
                    </>
                )}
                
            </MenuContainer>
        </>
    )
}
