import axios from "axios";

let hasAlerted = false;

export const getNewRefreshToken = async () => {
  console.log("토큰 갱신해야됨");
  const refreshToken = localStorage.getItem("refresh");

  if (!refreshToken) {
    console.error("Refresh token이 없습니다.");
    throw new Error("Refresh token이 없습니다.");
  }

  try {
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

    // 새 토큰 반환
    return result.data;
  } catch (error) {
    console.error(
      "토큰 갱신 실패:",
      error.response ? error.response.data : error.message
    );
    if (
      error.response &&
      error.response.data.error === "invalid refresh token" &&
      !hasAlerted
    ) {
      hasAlerted = true; // 알림 표시 상태 업데이트
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    }
    throw error;
  }
};
