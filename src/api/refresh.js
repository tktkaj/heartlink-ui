import axios from "axios";

export const getNewRefreshToken = async () => {
  const accessToken = localStorage.getItem("access");
  const refreshToken = localStorage.getItem("refresh");
  const result = await axios.post(
    "http://localhost:9090/reissue",
    {
      refreshToken,
    },
    {
      headers: {
        Authorization: accessToken,
      },
    }
  );
  return result.data;
};
