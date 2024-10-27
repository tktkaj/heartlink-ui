import { Outlet } from "react-router-dom";
import "./App.css";
import { AuthProvider } from "./api/AuthContext";

function App() {
  const isLoggedIn = () => {
    return localStorage.getItem("access") !== null;
  };

  // 사용 예시
  if (!isLoggedIn()) {
    console.log("로그아웃 상태입니다.");
  } else {
    console.log("로그인 상태입니다.");
  }

  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}

export default App;
