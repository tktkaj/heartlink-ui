import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const getNewRefreshToken = async () => {
  console.log("토큰 갱신해야됨");

  // 로컬 스토리지에서 리프레시 토큰 가져오기
  const refreshToken = localStorage.getItem("refresh");

  if (!refreshToken) {
    console.error("Refresh token이 없습니다.");
    throw new Error("Refresh token이 없습니다.");
  }

  try {
    // 리프레시 토큰을 헤더에 담아 서버에 전달해서 새로운 액세스 토큰을 발급받음
    const result = await axios.post(
      process.env.REACT_APP_API_URL + "/reissue",
      {},
      {
        headers: {
          RefreshToken: refreshToken,
          "Content-Type": "application/json",
        },
      }
    );

    // 발급된 새 액세스 토큰과 리프레시 토큰
    const accessToken = result.data.accessToken;
    const newRefreshToken = result.data.refreshToken;

    console.log("갱신된 액세스 토큰:", accessToken);
    console.log("갱신된 리프레시 토큰:", newRefreshToken);

    // 새로운 토큰을 로컬 스토리지에 저장
    localStorage.setItem("access", accessToken);
    localStorage.setItem("refresh", newRefreshToken);

    // 액세스 토큰을 디코딩해서 역할(role) 등 정보를 확인할 수 있음
    const decoded = jwtDecode(accessToken);
    console.log("디코딩된 액세스 토큰 정보:", decoded);

    return { accessToken, refreshToken: newRefreshToken };
  } catch (error) {
    console.error(
      "토큰 갱신 실패:",
      error.response ? error.response.data : error.message
    );

    // 리프레시 토큰이 만료된 경우
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

    throw error; // 에러 발생시 호출한 곳으로 에러를 던져서 처리할 수 있도록
  }
};
