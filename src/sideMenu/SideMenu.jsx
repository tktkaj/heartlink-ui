import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../image/logo/logo2.png";
import profilethum from "../image/sidebar/test.png";
import { BiSearch } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { useLocation, Link } from "react-router-dom";
import { AiOutlineHome, AiFillHome } from "react-icons/ai";
import Setting from "./Setting";
import {
  RiUserHeartLine,
  RiUserHeartFill,
  RiMessage3Line,
} from "react-icons/ri";
import { BiBell, BiSolidBell } from "react-icons/bi";
import { getAuthAxios } from "../api/authAxios";
import AlarmMenu from "./AlarmMenu";
import MiniSide from "./MiniSide";

const Sidebar = styled.div`
  width: 20vw;
  height: 100vh;
  padding-top: 30px;
  border-right: rgba(160, 160, 160, 0.2) 2px solid;
  background-color: #ffffff;
  position: absolute;
`;

const Logostyle = styled.div`
  width: 170px;
  margin-left: 26px;
  padding-bottom: 30px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  cursor: pointer;
`;

const Ulstyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: space-between;
`;

const Liststyle = styled(Link)`
  display: flex;
  height: 69.5px;
  font-size: 17px;
  gap: 16px;
  align-items: center;
  justify-content: flex-start;
  padding-left: 31px;
  .icon {
    width: 26px;
    height: 26px;
  }
  transition: background-color 0.4s ease;
  cursor: pointer;
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  &:hover {
    background-color: #e6e6ff;
  }
`;

const ProfileThum = styled.div`
  width: 28px;
  height: 28px;
  overflow: hidden;
  border-radius: 50%;
  border: 1px solid #6b6b6b;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function SideMenu() {
  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isAlarmOpen, setIsAlarmOpen] = useState(false);
  const [showMiniSide, setShowMiniSide] = useState(false);

  const openSetting = () => {
    setIsSettingOpen(true);
  };

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
  const isActiveHome = location.pathname === "/home";
  const isActiveCouple = location.pathname === "/couple";

  const getActiveStatus = (path) => location.pathname === path;

  if (showMiniSide) {
    return (
      <>
        <MiniSide />
        {isAlarmOpen && <AlarmMenu />}
      </>
    );
  }

  return (
    <>
      <Sidebar>
        <Logostyle>
          <Link to="/home">
            <img src={logo} alt="로고" />
          </Link>
        </Logostyle>
        <div>
          <Ulstyle>
            <div>
              <Liststyle to="/home" isActive={getActiveStatus("/home")}>
                {isActiveHome ? (
                  <AiFillHome className="icon" />
                ) : (
                  <AiOutlineHome className="icon" />
                )}
                <span>홈</span>
              </Liststyle>
              <Liststyle to="/search">
                <BiSearch className="icon" />
                검색
              </Liststyle>
              <Liststyle to="/couple" isActive={getActiveStatus("/couple")}>
                {isActiveCouple ? (
                  <RiUserHeartFill className="icon" />
                ) : (
                  <RiUserHeartLine className="icon" />
                )}
                커플
              </Liststyle>
              <Liststyle as="div" onClick={toggleAlarm}>
                <BiBell className="icon" />
                알림
              </Liststyle>
              {isAlarmOpen && <AlarmMenu />}
              <Liststyle to="/dm" isActive={getActiveStatus("/dm")}>
                <RiMessage3Line className="icon" />
                메시지
              </Liststyle>
              <Liststyle to={`/user/profile/${userId}`}>
                <ProfileThum>
                  <img src={profile ? profile.userimg : profilethum} alt="" />
                </ProfileThum>
                <p style={{ fontFamily: "SokchoBadaBatang" }}>
                  {profile ? profile.loginId : "사용자 정보 없음"}
                </p>
              </Liststyle>
            </div>
            <div>
              <Liststyle as="div" onClick={openSetting}>
                <IoSettingsOutline className="icon" />
                설정
              </Liststyle>
            </div>
          </Ulstyle>
        </div>
      </Sidebar>
      {isSettingOpen && <Setting closeSetting={closeSetting} />}
    </>
  );
}
