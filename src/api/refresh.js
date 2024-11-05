import axios from "axios";
import Cookies from "js-cookie";

export const getNewRefreshToken = async () => {
  console.log("토큰 갱신해야됨");

  // 먼저 쿠키에서 리프레시토큰 가져오기
  const refreshTokenFromCookie = Cookies.get("RefreshToken");
  console.log("쿠키에서 리프레시토큰 가져오기:", refreshTokenFromCookie);
  // 만약 쿠키에 없으면 로컬 스토리지에서 리프레시토큰 가져오기
  const refreshToken =
    refreshTokenFromCookie || localStorage.getItem("refresh");

  console.log("리프레시토큰:", refreshToken);

  if (!refreshToken) {
    console.error("Refresh token이 없습니다.");
    throw new Error("Refresh token이 없습니다.");
  }

  try {
    // 리프레시 토큰을 헤더에 담아 서버에 전달해서 새로운 액세스 토큰을 발급받음
    const result = await axios.post("http://localhost:9090/reissue", null, {
      headers: {
        RefreshToken: refreshToken,
        "Content-Type": "application/json",
      },
    });
    console.log("갱신된 토큰:", result.data.accessToken);

    // 새 토큰을 로컬 스토리지에 저장
    localStorage.setItem("access", result.data.accessToken);
    localStorage.setItem("refresh", result.data.refreshToken);
    Cookies.set("refreshToken", result.data.refreshToken, {
      expires: 7, // 쿠키 만료일, 7일 후 만료
      path: "/", // 쿠키 경로
      secure: false, // HTTPS 환경에서만 전송
      sameSite: "None", // CSRF 공격 방지
      HttpOnly: false,
    });

    // 새 토큰 반환
    return result.data;
  } catch (error) {
    console.error(
      "토큰 갱신 실패:",
      error.response ? error.response.data : error.message
    );
    if (error.response && error.response.data.error === "invalid refresh token")
      throw error;
  }
};
