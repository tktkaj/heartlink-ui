import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import EditPostModal from "./EditModal";


const SettingBox = styled.div`
  background-color: white;
  border: rgba(160, 160, 160, 0.2) 2px solid;
  border-radius: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: ${(props) =>
    props.position ? props.position.top : 0}px; /* 기본값 설정 */
  left: ${(props) =>
    props.position ? props.position.left : 0}px; /* 기본값 설정 */
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
  post
}) {

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const post = { content: "Sample post content", files: [] };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };
  return (
    <>
      <SettingBox position={position}>
        <ul>
        <SettingList onClick={handleEditClick}>
            <p>게시글 수정</p>
          </SettingList>
          <Link to="/deleteAlert">
            <SettingList>
              <p>게시글 삭제</p>
            </SettingList>
          </Link>
        </ul>
      </SettingBox>
      <Canvas onClick={closeModal} />
      <EditPostModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        post={post} // 수정할 게시글 정보 전달
        onSave={(updatedPost) => {
          console.log("Updated Post: ", updatedPost);
          setIsEditModalOpen(false);
        }}
      />
    </>
  );
}