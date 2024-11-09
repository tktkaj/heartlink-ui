import axios from "axios";
import { getNewRefreshToken } from "./refresh";

export const getAuthAxios = (token) => {
  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: token,
    },
  });

  authAxios.interceptors.response.use(
    (res) => res, // 응답이 성공적으로 돌아오면 그대로 응답을 반환
    async (error) => {
      try {
        // 401 오류 (액세스 토큰 만료)
        if (error.response.status === 401) {
          console.log("액세스 토큰 만료");

          // 리프레시 토큰으로 갱신
          const { accessToken, refreshToken } = await getNewRefreshToken();

          // 새 토큰을 헤더에 설정
          error.config.headers.Authorization = `Bearer ${accessToken}`;
          error.config.headers.RefreshToken = refreshToken;

          // 갱신된 토큰을 로컬스토리지에 저장
          localStorage.setItem("access", accessToken);
          localStorage.setItem("refresh", refreshToken);

          // 갱신된 토큰으로 요청 재시도
          const retryResponse = await axios(error.config);
          return retryResponse;
        }

        // 403 오류 (리프레시 토큰 만료)
        if (error.response.status === 403) {
          console.log("리프레시 토큰 만료 또는 유효하지 않음");

          // 리프레시 토큰이 만료되었을 경우
          alert("세션이 만료되었습니다. 다시 로그인 해주세요.");
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("loginId");

          // 사용자를 로그인 페이지로 리디렉션
          window.location.href = "/login"; // 로그아웃 후 로그인 페이지로 이동
        }

        // 다른 오류는 그대로 처리
        return Promise.reject(error);
      } catch (err) {
        console.error("인터셉터 오류:", err);
        return Promise.reject(err);
      }
    }
  );

  return authAxios;
};
