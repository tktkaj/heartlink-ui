import React from 'react'
import styled from 'styled-components'
import profilethum from '../image/sidebar/test.png';
import { Link } from 'react-router-dom';


const MenuContainer = styled.div`
    width: 350px;
    height: 100vh;
    background-color: white;
    border-radius: 0 10px 10px 0;
    box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 0;
    left: 4.7vw;
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
    width: 21.8vw;
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

export default function SearchMenu() {


    return (
        <>
            <MenuContainer>
                <div style={{ fontSize: '1.5rem', marginBottom: '10px', paddingLeft: '2vw' }}>
                    <h1>검색</h1>
                </div>
                <div style={{ marginLeft: '2vw' }}>
                    <input type="text" required placeholder="검색어 입력"
                        class="block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 " style={{ width: '240px', paddingLeft: '7px', fontSize: '15px' }}></input>
                </div>
                <hr style={{ marginTop: '4vh' }}></hr>
                <SearchList>
                    <Ulstyle>
                        <Liststyle>
                            <ProfileThum>
                                <img src={profilethum} alt="" />
                            </ProfileThum>
                            <p style={{ fontFamily: 'SokchoBadaBatang' }}>@moong_52</p>
                        </Liststyle>
                        <Link to="/search">
                            <Liststyle>
                                <ProfileThum>
                                    &
                                </ProfileThum>
                                <p>&풍경사진</p>
                            </Liststyle>
                        </Link>
                        <Liststyle>
                            <ProfileThum>

                            </ProfileThum>
                            <p>꾸래핑</p>
                        </Liststyle>
                    </Ulstyle>

                </SearchList>
            </MenuContainer>
        </>
    )
}
