import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./api/AuthContext";
import SideMenu from "./sideMenu/SideMenu";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

function App() {
  const [userId, setUserId] = useState(null);
  const location = useLocation();

  const accessToken = localStorage.getItem("access");

  // 토큰이 유효한지 확인
  if (accessToken && typeof accessToken === "string") {
    try {
      const decodedToken = jwtDecode(accessToken);
      console.log(decodedToken); // 디코딩된 토큰 정보
      console.log(process.env.REACT_APP_API_URL);
    } catch (error) {
      console.error("토큰 디코딩 오류:", error);
    }
  } else {
    console.error("유효하지 않은 액세스 토큰");
  }

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
