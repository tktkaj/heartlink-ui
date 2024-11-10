import React, { useState } from "react";
import { toast } from "react-toastify";
import { getAuthAxios } from "../api/authAxios";
import EditPostModal from "./EditModal";
import styled from "styled-components";

const SettingBox = styled.div`
  background-color: white;
  border: rgba(160, 160, 160, 0.2) 2px solid;
  border-radius: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: ${(props) => (props.position ? props.position.top : 0)}px;
  left: ${(props) => (props.position ? props.position.left : 0)}px;
  z-index: 2000;
`;

const SettingList = styled.div`
  display: flex;
  .settingIcon {
    width: 23px;
    height: 23px;
  }
  padding: 25px 22px;
  height: 6vh;
  gap: 11px;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #e6e6ff;
  }
  transition: background-color 0.4s ease;
`;

const Canvas = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0);
  z-index: 53;
`;

export default function FeedModal({
  closeModal,
  position = { top: 0, left: 0 },
  post,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const files = post?.files || [];

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  /*************** 게시물 삭제 ***************/
  const handlePostDelete = async (post) => {
    // 삭제 확인 알림창
    console.log("post는? ", post);
    const isConfirmed = window.confirm("정말 게시글을 삭제하시겠습니까?");

    if (!isConfirmed) {
      return; // 사용자가 취소한 경우, 아무 동작하지 않음
    }

    try {
      const access = localStorage.getItem("access");
      const axios = getAuthAxios(access);

      const res = await axios.delete(`/feed/${post.postId}/delete`);

      if (res.status === 200) {
        toast.success(res.data, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
        closeModal();
        window.location.href =
          process.env.REACT_APP_API_URL + `/user/profile/${post?.userId}`;
      }
    } catch (e) {
      if (e.response) {
        console.error("서버 오류:", e.response.data);
        alert("내 게시글만 삭제할 수 있습니다.");
      } else {
        console.error("업로드 중 오류 발생:", e.message);
        alert("업로드 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <SettingBox position={position}>
        <ul>
          <SettingList onClick={handleEditClick}>
            <p>게시글 수정</p>
          </SettingList>
          <SettingList onClick={() => handlePostDelete(post)}>
            <p>게시글 삭제</p>
          </SettingList>
        </ul>
      </SettingBox>
      <Canvas onClick={closeModal} />
      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        post={post} // 수정할 게시글 정보 전달
        files={files}
        onSave={(updatedPost) => {
          console.log("Updated Post: ", updatedPost);
          setIsEditModalOpen(false);
        }}
      />
    </>
  );
}
