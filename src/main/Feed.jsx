import React, { useEffect, useState } from "react";
import styled from "styled-components";
import profilethum from "../image/sidebar/test.png";
import feedImage from "../image/feed/yy.jpg";
import { GoKebabHorizontal } from "react-icons/go";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdShare } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import defaultImg from "../image/logo/fav.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FeedModal from "../layout/FeedModal";
import axios from "axios";
import { getAuthAxios } from "../api/authAxios";

const FeedBox = styled.div`
  width: 37vw;
  height: 84vh;
  border: 1px solid rgba(160, 160, 160, 0.5);
  border-radius: 4%;
  background-color: white;
  margin-left: 150px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfilePhoto = styled.div`
  width: 42px;
  height: 42px;
  overflow: hidden;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FeedProfile = styled.div`
  font-family: "SokchoBadaBatang";
  display: flex;
  align-items: center;
  width: 34vw;
  height: 72px;
  h3 {
    font-family: "SBAggroB";
    color: #706ef4;
    font-size: 19px;
  }
  justify-content: space-between;
`;

const ProfileTxt = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FeedIcons = styled.div`
  display: flex;
  width: 34vw;
  justify-content: space-between;
  height: 7vh;
  align-items: center;
  .feedIcon {
    width: 25px;
    height: 25px;
  }
`;

const FeedInfo = styled.div`
  display: flex;
  text-align: left;
  justify-content: flex-start;
  gap: 13px;
  font-size: 15px;
  color: gray;
  width: 100%;
  padding-left: 22px;
`;

const FeedContent = styled.div`
  display: flex;
  text-align: left;
  justify-content: flex-start;
  width: 100%;
  padding-left: 22px;
  margin-top: 10px;
  gap: 8px;
`;

const SliderContainer = styled.div`
  width: 37vw;
  height: 55vh;
  margin: 0 auto;
  overflow: hidden;
`;

const FeedImages = styled.div`
  height: 55vh;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function Feed() {
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const openModal = (event) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    setModalPosition({
      top: buttonRect.bottom + 10, // 버튼의 아래쪽 위치
      left: buttonRect.left - 50, // 버튼의 왼쪽 위치
    });
    setIsModalOpen(true);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const truncateContent = (content) => {
    return content.length > 15 ? content.slice(0, 15) + "..." : content;
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const result = await authAxios.get("http://localhost:9090/feed/8");
        console.log(result);
        setPosts(result.data.nonFollowedPosts);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {isModalOpen && (
        <FeedModal closeModal={closeModal} position={modalPosition} />
      )}

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {posts.map((post) => (
        <div key={post.postId}>
          <FeedBox>
            <FeedProfile>
              <ProfileTxt>
                <ProfilePhoto>
                  <img src={post.profileImg} alt="프사" />
                </ProfilePhoto>
                <p style={{ fontSize: "21px" }}>{post.loginId}</p>
                <h3>&</h3>
                <p
                  style={{
                    fontSize: "15px",
                    color: "gray",
                    marginBottom: "-5px",
                  }}
                >
                  {post.partnerId}
                </p>
              </ProfileTxt>
              <div style={{ display: "flex", gap: "15px" }}>
                <button
                  type="submit"
                  style={{
                    backgroundColor: "#706EF4",
                    width: "70px",
                    height: "30px",
                    paddingTop: "3px",
                  }}
                  className="flex w-full justify-center rounded-md text-sm font-semibold leading-6 text-white shadow-sm"
                >
                  팔로우
                </button>
                <GoKebabHorizontal
                  style={{ width: "30px", height: "30px", cursor: "pointer" }}
                  onClick={openModal}
                />
              </div>
            </FeedProfile>
            <SliderContainer>
              <Slider {...settings}>
                {post.files.map((image, index) => (
                  <FeedImages key={index}>
                    <img src={image.fileUrl} alt={`피드사진 ${index + 1}`} />
                  </FeedImages>
                ))}
              </Slider>
            </SliderContainer>
            <FeedIcons>
              <div style={{ display: "flex", gap: "20px" }}>
                <IoIosHeartEmpty className="feedIcon" />
                <FiMessageCircle className="feedIcon" />
                <IoMdShare className="feedIcon" />
              </div>
              <FaRegBookmark className="feedIcon" />
            </FeedIcons>
            <FeedInfo>
              <p>{new Date(post.createdAt).toLocaleString()} </p>
              <p>좋아요 {post.likeCount}개</p>
              <p>댓글 {post.commentCount}개</p>
            </FeedInfo>
            <FeedContent>
              <p>{truncateContent(post.content)}</p>
              <div>
                <p style={{ fontSize: "15px", color: "gray" }}>더보기</p>
              </div>
            </FeedContent>
          </FeedBox>
        </div>
      ))}
    </div>
  );
}
