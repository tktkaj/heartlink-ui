import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAuthAxios } from "../api/authAxios";

const PasswordPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 20vw;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin: 0;
  padding: 0;
  margin-top: -5px;
  margin-bottom: 5px;
`;

const Button = styled.button`
  padding: 7px 20px;
  margin: 5px;
  border: none;
  border-radius: 5px;
  background-color: #706ef4;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #5856e4;
  }
`;

function Password({ onClose }) {
  const [beforePassword, setCurrentPassword] = useState("");
  const [afterPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const response = await authAxios.get("/user/profile");
        setUserId(response.data);
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
      }
    };
    fetchUserId();
  }, []);
  const handlePasswordChange = async () => {
    try {
      setCurrentPasswordError("");
      setNewPasswordError("");

      if (afterPassword !== confirmPassword) {
        setNewPasswordError("새 비밀번호가 일치하지 않습니다.");
        return;
      }

      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);

      const response = await authAxios.patch(
        `/user/profile/${userId}/update/password`,
        {
          beforePassword,
          afterPassword,
        }
      );

      if (response.status === 200) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        onClose();
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setError("존재하지 않는 사용자입니다.");
      } else if (error.response?.status === 403) {
        setError("비밀번호 수정 권한이 없습니다.");
      } else if (error.response?.status === 401) {
        setCurrentPasswordError("현재 비밀번호가 일치하지 않습니다.");
      } else {
        setError("비밀번호 변경 중 오류가 발생했습니다.");
      }
      console.error("비밀번호 변경 실패:", error);
    }
  };

  return (
    <PasswordPopup>
      <h2>비밀번호 변경</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Input
        type="password"
        placeholder="현재 비밀번호"
        value={beforePassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      {currentPasswordError && (
        <ErrorMessage>{currentPasswordError}</ErrorMessage>
      )}
      <Input
        type="password"
        placeholder="새 비밀번호"
        value={afterPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <Input
        type="password"
        placeholder="새 비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      {newPasswordError && <ErrorMessage>{newPasswordError}</ErrorMessage>}
      <div style={{ textAlign: "center" }}>
        <Button onClick={handlePasswordChange}>변경</Button>
        <Button onClick={onClose} style={{ backgroundColor: "#6c757d" }}>
          취소
        </Button>
      </div>
    </PasswordPopup>
  );
}

export default Password;
