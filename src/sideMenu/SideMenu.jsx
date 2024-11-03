import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../image/logo/logo2.png";
import profilethum from "../image/sidebar/test.png";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import Setting from "./Setting";
import MiniSide from "./MiniSide";
import SearchMenu from "./SearchMenu";
import AlarmMenu from "./AlarmMenu";
import DmListBox from "../dm/DmListBox";
import { getAuthAxios } from "../api/authAxios";
import { useAuth } from "../api/AuthContext";

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
  const { token, setToken, authAxios } = useAuth();
  const refreshToken = localStorage.getItem("refresh");
  console.log("토큰", token);
  console.log("리프레시 토큰", refreshToken);

  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const openSetting = () => {
    setIsSettingOpen(true);
  };
  const closeSetting = () => setIsSettingOpen(false);

  const [userId, setUserId] = useState(null);
  const [profile, setProfile] = useState(null);

  const [isMiniSideVisible, setIsMiniSideVisible] = useState(false);
  const [isSideMenuVisible, setIsSideMenuVisible] = useState(true);
  const [isSearchMenuVisible, setIsSearchMenuVisible] = useState(true);
  const [isAlarmMenuVisible, setIsAlarmMenuVisible] = useState(true);
  const [isDmMenuVisible, setIsDmMenuVisible] = useState(true);

  const toggleSideMenuSearch = () => {
    setIsMiniSideVisible(true);
    setIsSearchMenuVisible(true);
    setIsSideMenuVisible(false);
    setIsAlarmMenuVisible(false);
    setIsDmMenuVisible(false);
  };
  const toggleSideMenuAlarm = () => {
    setIsMiniSideVisible(true);
    setIsAlarmMenuVisible(true);
    setIsSideMenuVisible(false);
    setIsSearchMenuVisible(false);
    setIsDmMenuVisible(false);
  };
  const toggleSideMenuDm = () => {
    setIsMiniSideVisible(true);
    setIsDmMenuVisible(true);
    setIsSideMenuVisible(false);
    setIsAlarmMenuVisible(false);
    setIsSearchMenuVisible(false);
  };

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const res = await authAxios.get("http://localhost:9090/user/profile");
        console.log("로그인한 유저아이디", res.data);
        if (res.data) {
          setUserId(res.data);
          const profileResult = await authAxios.get(
            `http://localhost:9090/user/profile/${res.data}`
          );
          console.log("프로필 데이터!!!", profileResult.data);
          setProfile(profileResult.data);
        }
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId();
  }, []);

  return (
    <>
      {isMiniSideVisible && (
        <MiniSide
          toggleSideMenuSearch={toggleSideMenuSearch}
          toggleSideMenuAlarm={toggleSideMenuAlarm}
          toggleSideMenuDm={toggleSideMenuDm}
        />
      )}
      {isMiniSideVisible && isDmMenuVisible && (
        <DmListBox toggleSideMenuDm={toggleSideMenuDm} id={4} />
      )}
      {isMiniSideVisible && isSearchMenuVisible && (
        <SearchMenu toggleSideMenuSearch={toggleSideMenuSearch} />
      )}
      {isMiniSideVisible && isAlarmMenuVisible && (
        <AlarmMenu toggleSideMenuAlarm={toggleSideMenuAlarm} />
      )}
      {isSideMenuVisible && (
        <Sidebar>
          <Logostyle>
            <Link to="/home">
              <img src={logo} alt="로고" />
            </Link>
          </Logostyle>
          <div>
            <Ulstyle>
              <div>
                <Liststyle to="/home">
                  <IoHomeOutline className="icon" />홈
                </Liststyle>
                <Liststyle onClick={toggleSideMenuSearch}>
                  <LuSearch className="icon" />
                  검색
                </Liststyle>
                <Liststyle to="/couple">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-box2-heart"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 7.982C9.664 6.309 13.825 9.236 8 13 2.175 9.236 6.336 6.31 8 7.982" />
                    <path d="M3.75 0a1 1 0 0 0-.8.4L.1 4.2a.5.5 0 0 0-.1.3V15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V4.5a.5.5 0 0 0-.1-.3L13.05.4a1 1 0 0 0-.8-.4zm0 1H7.5v3h-6zM8.5 4V1h3.75l2.25 3zM15 5v10H1V5z" />
                  </svg>
                  커플
                </Liststyle>
                <Liststyle onClick={toggleSideMenuAlarm}>
                  <FaRegBell className="icon" />
                  알림
                </Liststyle>
                <Liststyle to={"/dm"}>
                  <AiOutlineMessage className="icon" />
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
      )}
      {isSettingOpen && <Setting closeSetting={closeSetting} />}
    </>
  );
}
