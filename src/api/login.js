import axios from "axios";

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

    return headers;
  } catch (error) {
    console.error("Login request failed:", error);
    throw error;
  }
};
