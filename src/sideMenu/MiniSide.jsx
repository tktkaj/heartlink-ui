import React, { useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../image/logo/fav.png";
import profilethum from "../image/sidebar/test.png";
import { IoHomeOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { AiOutlineMessage } from "react-icons/ai";
import { LuSearch } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import Setting from "./Setting";
import { Link } from "react-router-dom";

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

export default function MiniSide({
  toggleSideMenuSearch,
  toggleSideMenuAlarm,
  toggleSideMenuDm,
}) {
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const openSetting = () => setIsSettingOpen(true);
  const closeSetting = () => setIsSettingOpen(false);

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
              <IoHomeOutline className="icon" />
            </Liststyle>
            <Liststyle onClick={toggleSideMenuSearch}>
              <LuSearch className="icon" />
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
            </Liststyle>
            <Liststyle onClick={toggleSideMenuAlarm}>
              <FaRegBell className="icon" />
            </Liststyle>
            <Liststyle onClick={toggleSideMenuDm}>
              <AiOutlineMessage className="icon" />
            </Liststyle>
            <Liststyle to="/user/profile/${userid}">
              <ProfileThum>
                <img src={profilethum} alt="" />
              </ProfileThum>
              <p style={{ fontFamily: "SokchoBadaBatang" }}></p>
            </Liststyle>
          </div>
          <div>
            <Liststyle onClick={openSetting}>
              <IoSettingsOutline className="icon" />
            </Liststyle>
          </div>
        </Ulstyle>
      </MiniContainer>
      {isSettingOpen && <Setting closeSetting={closeSetting} />}
    </>
  );
}
