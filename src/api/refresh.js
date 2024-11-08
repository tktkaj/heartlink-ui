import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getNewRefreshToken = async () => {
  console.log("토큰 갱신해야됨");

  // 만약 쿠키에 없으면 로컬 스토리지에서 리프레시토큰 가져오기
  const refreshToken = localStorage.getItem("refresh");

  if (!refreshToken) {
    console.error("Refresh token이 없습니다.");
    throw new Error("Refresh token이 없습니다.");
  }

  try {
    // 리프레시 토큰을 헤더에 담아 서버에 전달해서 새로운 액세스 토큰을 발급받음
    const result = await axios.post(
      "http://localhost:9090/reissue",
      {},
      {
        headers: {
          RefreshToken: refreshToken,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("갱신된 토큰:", result.data.accessToken);
    const accessToken = localStorage.getItem("access"); // accessToken을 가져옵니다.
    const decoded = jwtDecode(accessToken); // JWT를 디코딩

    console.log(decoded); // 디코딩된 내용 확인
    const decodedPayload = jwtDecode(accessToken);
    console.log(decodedPayload.role); // "admin" 또는 "user"와 같은 역할 정보

    // 새 토큰을 로컬 스토리지에 저장
    console.log("새 액세스 토큰", result.data.accessToken);
    console.log("새 리프레시 토큰", result.data.refreshToken);
    localStorage.setItem("access", result.data.accessToken);
    localStorage.setItem("refresh", result.data.refreshToken);

    // 새 토큰 반환
    return result.data;
  } catch (error) {
    console.error(
      "토큰 갱신 실패:",
      error.response ? error.response.data : error.message
    );
    if (
      error.response &&
      error.response.data.error === "invalid refresh token"
    ) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("loginId");
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
      window.location.href = "/login";
    }
  }
};
