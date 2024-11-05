import axios from "axios";
import Cookies from "js-cookie";

export const login = async (loginId, password) => {
  console.log("로그인");
  try {
    const response = await axios.post("http://localhost:9090/login", {
      loginId,
      password,
    });
    console.log(response);

    // 헤더에서 토큰 저장
    const authorization = response.headers.authorization;
    const refreshToken = response.headers.refreshtoken;
    const headers = { authorization, refreshToken };

    // 리프레시 토큰을 쿠키에 저장
    if (refreshToken) {
      Cookies.set("refreshToken", refreshToken, {
        expires: 7, // 쿠키 만료일, 7일 후 만료
        path: "", // 쿠키 경로
        secure: true, // HTTPS 환경에서만 전송
        sameSite: "Strict", // CSRF 공격 방지
      });
    }

    return headers;
  } catch (error) {
    console.error("Login request failed:", error);
    throw error;
  }
};
