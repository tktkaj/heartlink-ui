import React, { useState } from "react";
import styled from "styled-components";
import { getAuthAxios } from "../api/authAxios";
import { IoClose } from "react-icons/io5";

const ReportModal = styled.div`
  position: absolute;
  width: 400px;
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  top: ${(props) => props.position.top}px;
  left: ${(props) => props.position.left}px;
  transform: translate(-50%, 0);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #706ef4;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;

  &:hover {
    color: #5b59c9;
  }
`;

const ReportOption = styled.div`
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }

  &.selected {
    background-color: #706ef4;
    color: white;
    border-color: #706ef4;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #706ef4;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 15px;
  cursor: pointer;

  &:hover {
    background-color: #5b59c9;
  }
`;

const CustomInput = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  display: ${(props) => (props.show ? "block" : "none")};
`;

const Report = ({ closeModal, position, post }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");

  const reportReasons = [
    "스팸/광고성 게시물",
    "폭력/혐오 또는 학대",
    "스캠/사기 게시물",
    "선정적인 게시물",
    "기타",
  ];

  const handleSubmit = async () => {
    if (!selectedReason) {
      alert("신고 사유를 선택해주세요.");
      return;
    }

    if (selectedReason === "기타" && !customReason) {
      alert("기타 사유를 입력해주세요.");
      return;
    }

    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);

      // 현재 접속한 사용자의 userId 가져오기
      const userIdRes = await authAxios.get("/user/profile");
      const currentUserId = userIdRes.data;

      // API 엔드포인트 수정
      const response = await authAxios.post("/report", {
        userId: currentUserId,
        postId: post.postId,
        reason: selectedReason === "기타" ? customReason : selectedReason,
      });

      if (response.status === 201 || response.status === 200) {
        alert("신고가 성공적으로 접수되었습니다.");
        closeModal();
      }
    } catch (error) {
      console.error("신고 접수 중 오류:", error);
      if (error.response?.status === 400) {
        alert("이미 신고한 게시물입니다.");
      } else {
        alert("신고 접수 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return (
    <ReportModal position={position}>
      <CloseButton onClick={closeModal}>
        <IoClose />
      </CloseButton>
      <h2 style={{ textAlign: "center", fontWeight: "bold" }}>신고하기</h2>
      {reportReasons.map((reason) => (
        <ReportOption
          key={reason}
          className={selectedReason === reason ? "selected" : ""}
          onClick={() => setSelectedReason(reason)}
        >
          {reason}
        </ReportOption>
      ))}
      <CustomInput
        show={selectedReason === "기타"}
        placeholder="신고 사유를 입력해주세요"
        value={customReason}
        onChange={(e) => setCustomReason(e.target.value)}
      />
      <Button onClick={handleSubmit}>신고하기</Button>
    </ReportModal>
  );
};

export default Report;
