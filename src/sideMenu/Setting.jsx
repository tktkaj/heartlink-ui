import styled from "styled-components";
import { FaHeartBroken } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Password from "./Password";
import { getAuthAxios } from "../api/authAxios";
import { BsHeartPulseFill } from "react-icons/bs";

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
  const [isSoonBreak, setIsSoonBreak] = useState();

  const handlePasswordClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(true);
  };

  useEffect(() => {
    const coupleCheck = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const res = await authAxios.get(
          "http://localhost:9090/couple/checkSoonBreak"
        );
        setIsSoonBreak(res.data);
        console.log("커플유예?", res.data);
      } catch (error) {
        console.error("Error breaking couple:", error);
      }
    };
    coupleCheck();
  }, [isSoonBreak]);

  const handleCancelBreak = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm("커플 해지를 취소하시겠습니까?")) {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        await authAxios.put("http://localhost:9090/couple/unlink/cancel");
        setIsSoonBreak(false);
        window.location.reload();
        console.log("해지취소?", isSoonBreak);
      } catch (error) {
        console.error("Error canceling break:", error);
      }
    }
  };

  const handleFinalBreak = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (window.confirm("커플을 즉시 해지하시겠습니까? 되돌릴 수 없습니다.")) {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        await authAxios.delete("http://localhost:9090/couple/finalNowUnlink");
        setIsSoonBreak(false);
        window.location.reload();
      } catch (error) {
        console.error("Error immediate breaking couple:", error);
      }
    }
  };

  return (
    <>
      <SettingBox>
        <ul>
          {isSoonBreak && (
            <SettingList onClick={handleCancelBreak}>
              <BsHeartPulseFill className="settingIcon" />
              <p>커플해지 취소</p>
            </SettingList>
          )}
          {!isSoonBreak && (
            <Link to="/alertCouple">
              <SettingList>
                <FaHeartBroken className="settingIcon" />
                <p>커플 해제</p>
              </SettingList>
            </Link>
          )}
          {isSoonBreak && (
            <SettingList onClick={handleFinalBreak}>
              <FaHeartBroken className="settingIcon" />
              <p>커플 즉시해제</p>
            </SettingList>
          )}
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
