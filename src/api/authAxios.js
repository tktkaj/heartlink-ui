import axios from "axios";
import { getNewRefreshToken } from "./refresh";
import Cookies from "js-cookie";

export const getAuthAxios = (token) => {
  const authAxios = axios.create({
    baseURL: "http://localhost:9090",
    headers: {
      Authorization: token,
    },
  });
  authAxios.interceptors.response.use(
    (res) => res,
    async (error) => {
      try {
        if (error.response.status === 401) {
          // 액세스 토큰이 만료되면 토큰 갱신
          const { accessToken, refreshToken } = await getNewRefreshToken();
          // 헤더에 갱신된 액세스 토큰 설정
          error.config.headers.Authorization = accessToken;
          // 갱신된 리프레시 토큰이 있으면 쿠키나 로컬스토리지에 업데이트
          if (refreshToken) {
            Cookies.set("refreshToken", refreshToken, {
              expires: 7, // 쿠키 만료일, 7일 후 만료
              path: "", // 쿠키 경로
              secure: true, // HTTPS 환경에서만 전송
              sameSite: "Strict", // CSRF 공격 방지
            });
            localStorage.setItem("refresh", refreshToken);
          }
          // 갱신된 토큰으로 요청 재시도
          return axios(error.config);
        }
      } catch (error) {
        console.error("인터셉터 오류:", error);
      }
      return Promise.reject("세션이 만료되었습니다.");
    }
  );
  return authAxios;
};
