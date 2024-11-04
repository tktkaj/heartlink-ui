import styled from "styled-components";
import { FaHeartBroken } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Password from "./Password";
import { getAuthAxios } from "../api/authAxios";

const SettingBox = styled.div`
  background-color: white;
  border: rgba(160, 160, 160, 0.2) 2px solid;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 2vw;
  bottom: 13vh;
  z-index: 2000;
`;
const SettingList = styled.div`
  display: flex;
  .settingIcon {
    width: 23px;
    height: 23px;
    opacity: 0.7;
  }
  padding: 30px 30px;
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

export default function Setting({ closeSetting }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isSoonBreak, setIsSoonBreak] = useState(false);

  const handlePasswordClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(true);
  };

  const handleBreakCouple = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);
      await authAxios.post("http://localhost:9090/couple/checkSoonBreak");
      setIsSoonBreak(true);
    } catch (error) {
      console.error("Error breaking couple:", error);
    }
  };

  const handleImmediateBreak = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);
      await authAxios.post("http://localhost:9090/couple/checkSoonBreak");
      setIsSoonBreak(false);
    } catch (error) {
      console.error("Error immediate breaking couple:", error);
    }
  };

  useEffect(() => {
    const checkSoonBreak = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const response = await authAxios.get(
          "http://localhost:9090/couple/checkSoonBreak"
        );
        setIsSoonBreak(response.data);
      } catch (error) {
        console.error("Error checking soon break status:", error);
      }
    };

    checkSoonBreak();
  }, []);

  return (
    <>
      <SettingBox>
        <ul>
          <SettingList
            onClick={isSoonBreak ? handleImmediateBreak : handleBreakCouple}
          >
            <FaHeartBroken className="settingIcon" />
            <p>{isSoonBreak ? "커플 즉시 해지" : "커플 해지"}</p>
          </SettingList>
          <SettingList onClick={handlePasswordClick}>
            <RiLockPasswordFill className="settingIcon" />
            <p>비밀번호 변경</p>
          </SettingList>
          <Link to="/alertLogout">
            <SettingList>
              <IoLogOut className="settingIcon" />
              <p>로그아웃</p>
            </SettingList>
          </Link>
        </ul>
      </SettingBox>
      <Canvas onClick={closeSetting} />
      {showPassword && <Password onClose={() => setShowPassword(false)} />}
    </>
  );
}
