import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../image/logo/fav.png";
import profilethum from "../image/sidebar/test.png";
import { BiBell, BiSolidBell, BiSearchAlt, BiSearch } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineHome } from "react-icons/ai";
import {
  RiUserHeartLine,
  RiMessage3Line,
  RiMessage3Fill,
} from "react-icons/ri";
import Setting from "./Setting";
import { Link, useLocation } from "react-router-dom";
import { getAuthAxios } from "../api/authAxios";
import AlarmMenu from "./AlarmMenu";

const MiniContainer = styled.div`
  width: 82px;
  height: 100vh;
  background-color: white;
  border-right: rgba(160, 160, 160, 0.2) 2px solid;
  padding-top: 40px;
  position: fixed;
  z-index: 999;
  top: 0;
  @keyframes slideIn {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  animation: slideIn 0.5s forwards;
`;

const Logostyle = styled.div`
  width: 40px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  margin: auto;
  margin-bottom: 4vh;
`;

const Ulstyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: space-between;
  align-items: center;
`;

const Liststyle = styled(Link)`
  display: flex;
  height: 70px;
  align-items: center;
  justify-content: center;
  .icon {
    width: 27px;
    height: 27px;
  }
  transition: background-color 0.4s ease;
  cursor: pointer;
`;

const ProfileThum = styled.div`
  width: 27px;
  height: 27px;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #6b6b6b;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function MiniSide() {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [showMiniSide, setShowMiniSide] = useState(false);

  const openSetting = () => setIsSettingOpen(true);
  const closeSetting = () => setIsSettingOpen(false);

  const toggleAlarm = () => {
    setIsAlarmOpen(!isAlarmOpen);
    setShowMiniSide(!showMiniSide);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const res = await authAxios.get("/user/profile");
        console.log("로그인한 유저아이디", res.data);
        if (res.data) {
          setUserId(res.data);
          const profileResult = await authAxios.get(
            `/user/profile/${res.data}`
          );
          setProfile(profileResult.data);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  const location = useLocation();
  const isActiveDm = location.pathname === "/dm";
  const isActiveSearch = location.pathname === "/search";

  return (
    <>
      <MiniContainer>
        <Logostyle>
          <Link to="/home">
            <img src={logo} alt="로고" />
          </Link>
        </Logostyle>
        <Ulstyle>
          <div>
            <Liststyle to="/home">
              <AiOutlineHome className="icon" />
            </Liststyle>
            <Liststyle to="/search">
              {isActiveSearch ? (
                <BiSearchAlt className="icon" />
              ) : (
                <BiSearch className="icon" />
              )}
            </Liststyle>
            <Liststyle to="/couple">
              <RiUserHeartLine className="icon" />
            </Liststyle>
            <Liststyle as="div" onClick={toggleAlarm}>
              <BiBell className="icon" />
              {isAlarmOpen && <AlarmMenu />}
            </Liststyle>
            <Liststyle to="/dm">
              {isActiveDm ? (
                <RiMessage3Fill className="icon" />
              ) : (
                <RiMessage3Line className="icon" />
              )}
            </Liststyle>
            <Liststyle to={`/user/profile/${userId}`}>
              <ProfileThum>
                <img src={profile ? profile.userimg : profilethum} alt="" />
              </ProfileThum>
              <p style={{ fontFamily: "SokchoBadaBatang" }}></p>
            </Liststyle>
          </div>
          <div>
            <Liststyle as="div" onClick={openSetting}>
              <IoSettingsOutline className="icon" />
            </Liststyle>
          </div>
        </Ulstyle>
      </MiniContainer>
      {isSettingOpen && <Setting closeSetting={closeSetting} />}
    </>
  );
}
