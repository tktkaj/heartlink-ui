import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./api/AuthContext";
import SideMenu from "./sideMenu/SideMenu";
import { getMyPage } from "./api/mypage";
import { useEffect, useState } from "react";
import { getNewRefreshToken } from "./api/refresh";

function App() {
  const [userId, setUserId] = useState(null);
  const location = useLocation();

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
