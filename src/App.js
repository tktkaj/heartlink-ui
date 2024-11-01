import { Outlet } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./api/AuthContext";
import SideMenu from "./sideMenu/SideMenu";
import { getMyPage } from "./api/mypage";
import { useEffect, useState } from "react";
import { getNewRefreshToken } from "./api/refresh";

function App() {
  const isLoggedIn = () => {
    return localStorage.getItem("access") !== null;
  };

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await getMyPage();
      if (res && res.profile) {
        setUserId(res.profile.userId);
      }
    };

    const refreshToken = async () => {
      if (isLoggedIn()) {
        try {
          await getNewRefreshToken(); // 토큰 갱신 시도
        } catch (error) {
          console.error("토큰 갱신 실패:", error);
          // 로그아웃 처리 또는 에러 메시지 표시 등의 추가 로직
        }
      }
    };

    fetchUserData();
    refreshToken();
  }, []);

  return (
    <AuthProvider>
      <div style={{ display: "flex" }}>
        {" "}
        <SideMenu userId={userId} />
        <div style={{ flexGrow: 1 }}>
          {" "}
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
