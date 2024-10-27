import axios from "axios";

export const login = async (loginId, password) => {
  console.log("로그인");
  try {
    const response = await axios.post("http://localhost:9090/login", {
      loginId,
      password,
    });
    console.log(response);
    const authorization = response.headers.authorization;
    const refreshToken = response.headers.refreshtoken;
    //const userId = response.data.userId;
    const headers = { authorization, refreshToken };

    return headers;
  } catch (error) {
    console.error("Login request failed:", error);
    throw error;
  }
};
