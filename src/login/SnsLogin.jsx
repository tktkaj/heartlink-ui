import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuthAxios } from "../api/authAxios";

const SnsLogin = () => {
  const navigate = useNavigate();

  // /reissue 요청 보내는 함수
  const reissueToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9090/reissue",
        {},
        {
          withCredentials: true, // 쿠키를 자동으로 보내도록 설정
        }
      );
      console.log("리프레시 토큰 재발급:", response);
      if (response.data.accessToken) {
        // 새 액세스 토큰을 로컬 스토리지에 저장
        localStorage.setItem("access", response.data.accessToken);
        console.log("새 액세스 토큰:", response.data.accessToken);
        localStorage.setItem("refresh", response.data.refreshToken);
        console.log("새 리프레시 토큰:", response.data.refreshToken);
      }
    } catch (error) {
      console.error("리프레시 토큰 재발급 실패:", error);
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("loginId");
      navigate("/login");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await reissueToken();
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const partnerResponse = await authAxios.get(
          "http://localhost:9090/user/couple"
        );
        if (!partnerResponse.data) {
          navigate("/coupleConnect");
        } else {
          // 짝꿍정보가 있으면 /home으로 이동
          navigate("/home");
        }
      } catch (error) {
        console.error("Error fetching partner info:", error);
      }
    };

    fetchData();
  }, []);

  return null;
};

export default SnsLogin;
