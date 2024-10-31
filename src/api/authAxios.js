import axios from "axios";
import { getNewRefreshToken } from "./refresh";

// 로그아웃 처리를 위한 함수
const handleLogout = () => {
  // 로컬 스토리지의 모든 인증 관련 데이터 제거
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");

  alert("세션이 만료되었습니다. 다시 로그인해주세요.");

  window.location.href = "/login";
};

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
          try {
            const { accessToken, refreshToken } = await getNewRefreshToken();
            error.config.headers.Authorization = accessToken;
            return axios(error.config);
          } catch (refreshError) {
            handleLogout();
            return Promise.reject("세션이 만료되었습니다.");
          }
        }
      } catch (error) {
        console.error("인터셉터 오류:", error);
      }
    }
  );
  return authAxios;
};
