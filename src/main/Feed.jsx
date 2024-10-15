import React from 'react'
import styled from 'styled-components'
import profilethum from '../image/sidebar/test.png';
import feedImage from '../image/feed/yy.jpg';
import { GoKebabHorizontal } from "react-icons/go";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaComment } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const FeedBox = styled.div`
    width: 37vw;
    height: 83vh;
    border: 1px solid rgba(160, 160, 160, 0.5);
    border-radius: 4%;
    background-color: white;
    margin-left: 150px;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;

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
    width: 34vw;
    height: 72px;
    h3{
        font-family: 'SBAggroB';
        color: #706EF4;
        font-size: 19px;
    };
    justify-content: space-between;

`

const ProfileTxt = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`

const FeedImages = styled.div`
    height: 54vh;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

`
const FeedIcons = styled.div`
    display:flex;
    width:34vw;
    justify-content:space-between;
    height:8vh;
    align-items:center;
    .feedIcon {
        width: 25px;
        height: 25px;
    }
`

const FeedInfo = styled.div`
    display: flex;
    text-align: left;
    justify-content: flex-start;
    gap: 13px;
    font-size: 15px;
    color: gray;
    width: 100%; 
    padding-left: 22px;
`

const FeedContent = styled.div`
    display: flex;
    text-align: left;
    justify-content: flex-start;
    width: 100%; 
    padding-left: 22px;
    margin-top: 10px;
    gap: 8px;
`

const SliderContainer = styled.div`
    width: 37vw;
    max-width: 600px;
    margin: 0 auto;
`;

export default function Feed() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true
    };

    return (
        <div>
            <FeedBox>
                <FeedProfile>
                    <ProfileTxt>
                        <ProfilePhoto>
                            <img src={profilethum} alt="프사" />
                        </ProfilePhoto>
                        <p style={{ fontSize: '21px' }}>moong_52</p>
                        <h3>&</h3>
                        <p style={{ fontSize: '15px', color: 'gray', marginBottom: '-5px' }}>shinshinjeonghun</p>
                    </ProfileTxt>
                    <div style={{ display: 'flex', gap: '15px' }}>
                        <button type="submit" style={{ backgroundColor: '#706EF4', width: '70px', height: '30px', paddingTop: '3px' }}
                            class="flex w-full justify-center rounded-md text-sm font-semibold leading-6 text-white shadow-sm">팔로우</button>
                        <GoKebabHorizontal style={{ width: '30px', height: '30px' }} />
                    </div>
                </FeedProfile>
                <SliderContainer>
                    <Slider {...settings}>
                        <FeedImages>
                            <img src={feedImage} alt="피드사진" />
                        </FeedImages>
                        <FeedImages>
                            <img src={feedImage} alt="피드사진" />
                        </FeedImages>
                        <FeedImages>
                            <img src={feedImage} alt="피드사진" />
                        </FeedImages>
                        <FeedImages>
                            <img src={feedImage} alt="피드사진" />
                        </FeedImages>
                        <FeedImages>
                            <img src={feedImage} alt="피드사진" />
                        </FeedImages>
                        <FeedImages>
                            <img src={feedImage} alt="피드사진" />
                        </FeedImages>
                        <FeedImages>
                            <img src={feedImage} alt="피드사진" />
                        </FeedImages>
                        <FeedImages>
                            <img src={feedImage} alt="피드사진" />
                        </FeedImages>
                        <FeedImages>
                            <img src={feedImage} alt="피드사진" />
                        </FeedImages>
                        <FeedImages>
                            <img src={feedImage} alt="피드사진" />
                        </FeedImages>
                    </Slider>
                </SliderContainer>
                <FeedIcons>
                    <div style={{ display: 'flex', gap: '13px' }}>
                        <IoIosHeartEmpty className='feedIcon' />
                        <FaComment className='feedIcon' />
                        <IoMdShare className='feedIcon' />
                    </div>
                    <FaRegBookmark className='feedIcon' />
                </FeedIcons>
                <FeedInfo>
                    <p>1시간전</p>
                    <p>좋아요 9개</p>
                    <p>댓글 2개</p>
                </FeedInfo>
                <FeedContent>
                    <p>오늘 날씨가 좋아요...</p>
                    <div>
                        <p style={{ fontSize: '15px', color: 'gray' }}>더보기</p>
                    </div>
                </FeedContent>

            </FeedBox >
        </div>
    )
}