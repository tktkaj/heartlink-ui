import axios from "axios";

export const getNewRefreshToken = async () => {
  console.log("토큰 갱신해야됨");
  const refreshToken = localStorage.getItem("refresh");

  if (!refreshToken) {
    console.error("Refresh token이 없습니다.");
    throw new Error("Refresh token이 없습니다.");
  }

  try {
    const result = await axios.post(
      "http://localhost:9090/reissue",
      null, // 본문은 비워두거나 필요에 따라 수정
      {
        headers: {
          RefreshToken: refreshToken,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("갱신된 토큰:", result.data);

    // 새 토큰을 로컬 스토리지에 저장
    localStorage.setItem("access", result.data.accessToken);
    localStorage.setItem("refresh", result.data.refreshToken);

    // 새 토큰 반환
    return result.data;
  } catch (error) {
    console.error(
      "토큰 갱신 실패:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
