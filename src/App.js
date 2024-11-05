import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./api/AuthContext";
import SideMenu from "./sideMenu/SideMenu";
import { getMyPage } from "./api/mypage";
import { useEffect, useState } from "react";
import { getNewRefreshToken } from "./api/refresh";

function App() {
  const [userId, setUserId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // accessToken 유무 확인
  const isLoggedIn = () => {
    return localStorage.getItem("access") !== null;
  };

  // 새로운 refreshToken을 받아오는 함수
  const refreshToken = async () => {
    if (isLoggedIn()) {
      try {
        const response = await getNewRefreshToken(); // 새로 갱신
        if (response && response.accessToken && response.refreshToken) {
          // accessToken과 refreshToken을 localStorage에 저장
          localStorage.setItem("accessToken", response.accessToken);
          localStorage.setItem("RefreshToken", response.refreshToken);
          console.log("새로운 accessToken과 refreshToken을 받았습니다.");
        }
      } catch (error) {}
    }
  };
  // 유저 데이터를 fetch하는 함수
  const fetchUserData = async () => {
    try {
      const res = await getMyPage();
      if (res && res.profile) {
        setUserId(res.profile.userId);
      }
    } catch (error) {
      console.error("유저 데이터 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    // 1. 유저 데이터를 가져옵니다.
    if (isLoggedIn()) {
      fetchUserData();
    }
    // 2. 로그인 상태라면 refreshToken을 갱신합니다.
    if (isLoggedIn()) {
      refreshToken();
    }
  }, [location]);

  const showSideMenu =
    location.pathname === "/home" ||
    location.pathname === "/couple" ||
    /^\/user\/profile\/\w+$/.test(location.pathname);

  return (
    <AuthProvider>
      <div style={{ display: "flex" }}>
        {showSideMenu && <SideMenu userId={userId} />}
        <div style={{ flexGrow: 1 }}>
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
