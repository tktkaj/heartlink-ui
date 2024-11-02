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
import { format } from 'date-fns';

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
    width: 99.6%;
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
        const result = await authAxios.get("http://localhost:9090/feed", {
          headers: {
            Authorization: access,
          },
        });
        // followingPosts와 nonFollowedPosts를 합쳐서 순서대로 보여주기
        const allPosts = [
          ...(result.data.followingPosts || []),
          ...(result.data.nonFollowedPosts || []),
        ];
        setPosts(allPosts);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  /*************** 유저 팔로우 ***************/
  const handleFollow = (userId, e) => {

    const token = localStorage.getItem('access');
// post, header에 토큰 값
  axios.post(`http://localhost:9090/follow/${userId}`, 
  {},
  {
    headers: {
      Authorization: `${token}`
    }
  }
)
      .then((res)=>{
        switch (res.status) {
          case 201:
            alert(res.data);
            break;
          case 404:
            alert(res.data);
            break;
          case 500:
            alert("서버에 오류가 생겼어요ㅠㅠ");
            break;
        }
      })
      .catch((e)=>{
        console.log(e);
      })
  }

  /*************** 게시물 삭제 ***************/
  // 게시물 삭제는 이벤드를 어디에 달아야하는지 얘기가 필요함.
  const handlePostDelete = (postId, e) =>{

    const token = localStorage.getItem('access');
// delete, header에 토큰 값
  axios.delete(`http://localhost:9090/feed/${postId}/delete`, 
  {},
  {
    headers: {
      Authorization: `${token}`
    }
  }
)
      .then((res)=>{
        if (res.status = 201) {
            alert(res.data);
        }
      })
      .catch((e)=>{
        switch(e.status){
          case 404:
            alert("권한이 존재하지않아요ㅠㅜ");
            break;
          case 500:
            alert("서버에 오류가 생겼습니다ㅜㅠ");
            break;
        }
      })
  }

  /*************** 게시물 좋아요 ***************/
  // 좋아요는 commentId가 계속 null로 나오고 있어 방법이 필요함
  const handlePostLike = async (postId, e) =>{

    const token = localStorage.getItem('access');

    // like, header에 토큰 값
      axios.post("http://localhost:9090/like/toggle", null,
      {
        params: {postId: postId, commentId: 5},
        headers: {
          Authorization: `${token}`
        }
 
      }
    )
          .then((res)=>{
            if(res.status==200) {
                alert(res.data);
            }
          })
          .catch((e)=>{
            switch(e.status){
              case 404:
                alert("권한이 존재하지않아요ㅠㅜ");
                break;
              case 500:
                alert("서버에 오류가 생겼습니다ㅜㅠ");
                break;
            }
          })

  }

  /*************** 게시물 공유 ***************/

  const handlePostShare =() =>{
    const token = localStorage.getItem('access');
    // 나중에 게시물 상세페이지 주소로 전환할 것.
    const shareLink = window.location.href;
    navigator.clipboard.writeText(shareLink)
    .then(()=>{
      console.log("성공");
    })
    .catch(()=>{
      console.log("복사 실패!");
    })
  }

  /*************** 게시물 북마크 ***************/

  const handlePostBookmark = (postId, e) =>{

    const token = localStorage.getItem('access');
// delete, header에 토큰 값
  axios.post(`http://localhost:9090/bookmark/${postId}`, 
  {},
  {
    headers: {
      Authorization: `${token}`
    }
  }
)
      .then((res)=>{
        switch (res.status) {
          case 201:
            alert(res.data);
            break;
        }
      })
      .catch((e)=>{
        switch(e.status){
          case 404:
            alert("권한이 존재하지않아요ㅠㅜ");
            break;
          case 500:
            alert("서버에 오류가 생겼습니다ㅜㅠ");
            break;
        }
      })
  }

  return (
    <div>
  
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {posts.map((post) => (
        <div key={post.postId}>
          <FeedBox>
            {isModalOpen && (
              <FeedModal closeModal={closeModal} position={modalPosition}/>
            )}
            <FeedProfile>
              <ProfileTxt>
                <a
                  href={`http://localhost:3000/user/profile/${post.userId}`}
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <ProfilePhoto>
                    <img src={post.profileImg} alt="프사" />
                  </ProfilePhoto>
                  <p style={{ fontSize: "21px", cursor: "pointer" }}>
                    {post.loginId}
                  </p>
                </a>
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
                  style={{
                    backgroundColor: "#706EF4",
                    width: "70px",
                    height: "30px",
                    paddingTop: "3px",
                  }}
                  className="flex w-full justify-center rounded-md text-sm font-semibold leading-6 text-white shadow-sm"
                  onClick={(e)=>{handleFollow(post.userId, e)}}
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
                <IoIosHeartEmpty className="feedIcon" style={{cursor:'pointer'}} onClick={(e)=>{handlePostLike(post.postId, e)}}/>
                <FiMessageCircle className="feedIcon" style={{cursor:'pointer'}} />
                <IoMdShare className="feedIcon" style={{cursor:'pointer'}} onClick={handlePostShare} />
              </div>
              <FaRegBookmark className="feedIcon" style={{cursor:'pointer'}} />
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
