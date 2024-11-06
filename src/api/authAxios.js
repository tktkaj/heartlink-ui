import axios from "axios";
import { getNewRefreshToken } from "./refresh";

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
        if (error.response.status == 401) {
          // 액세스 토큰이 만료되면 토큰 갱신
          const { accessToken, refreshToken } = await getNewRefreshToken();
          // 헤더에 갱신된 액세스 토큰 설정
          error.config.headers.Authorization = accessToken;
          // 갱신된 토큰들을 로컬스토리지에 저장
          localStorage.setItem("access", accessToken);
          localStorage.setItem("refresh", refreshToken);
        }
        // 갱신된 토큰으로 요청 재시도
        const retryResponse = await axios(error.config);
        if (retryResponse.status === 500) {
          console.error("서버 오류가 발생했습니다:", retryResponse);
          throw new Error(
            "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
          );
        }
        return retryResponse;
      } catch (error) {
        console.error("인터셉터 오류:", error);
      }
      return Promise.reject("세션이 만료되었습니다.");
    }
  );

  return authAxios;
};
