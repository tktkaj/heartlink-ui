import React from 'react'
import styled from 'styled-components'
import profilethum from '../images/test.png';
import { GoKebabHorizontal } from "react-icons/go";

const FeedBox = styled.div`
    width: 35vw;
    height: 75vh;
    border: 1px solid rgba(160, 160, 160, 0.5);
    border-radius: 5%;
    background-color: white;
    margin-left: 150px;
    margin-top: 60px;
`

const ProfilePhoto = styled.div`
    width: 42px;
    height: 42px;
    overflow: hidden; 
    border-radius: 50%;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const FeedProfile = styled.div`
    font-family: 'SokchoBadaBatang';
    display: flex;
    align-items: center;
    height: 70px;
    padding-left: 15px;
    gap: 10px;
    h3{
        font-family: 'SBAggroB';
        color: #706EF4;
        font-size: 19px;
    }

`

const ProfileTxt = styled.div`
    display: flex;
    align-items: center;
`

export default function Feed() {
    return (
        <>
            <FeedBox>
                <FeedProfile>
                    <ProfileTxt>
                        <ProfilePhoto>
                            <img src={profilethum} alt="프사" />
                        </ProfilePhoto>
                        <p style={{ fontSize: '21px', marginLeft: '10px' }}>moong_52</p>
                    </ProfileTxt>
                    <h3>&</h3>
                    <p>shinshinjeonghun</p>
                    <div style={{ display: 'flex' }}>
                        <button>팔로우</button>
                        <GoKebabHorizontal style={{ width: '30px', height: '30px' }} />
                    </div>
                </FeedProfile>

            </FeedBox >
        </>
    )
}
