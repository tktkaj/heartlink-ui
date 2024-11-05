import styled from "styled-components";
import Feed from "./Feed";
import profilethum from "../image/sidebar/test.png";
import Upload from "../layout/Upload";
import UploadModal from "../layout/UploadModal";
import AdPlease from "./AdPlease";
import AlarmRight from "../alarm/AlarmRight";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthAxios } from "../api/authAxios";
import axios from "axios";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  overflow-y: auto;

  /* 스크롤바 숨기기 */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-bottom: 20vh;
  display: flex;
  padding-left: 20vw;
`;

const MainContainer = styled.div`
  background-color: #f8f8fa;
  display: flex;
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 80px;
  gap: 10px;
  position: fixed;
  right: 10vw;
`;

const LoveStatus = styled.div`
  width: 21vw;
  height: 14.8vh;
  background-color: white;
  border: rgba(160, 160, 160, 0.2) 1px solid;
  border-radius: 15px;
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
`;
const ProfileThum = styled.div`
  width: 60px;
  height: 60px;
  overflow: hidden;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  margin-right: 15px;
`;

const ProfileTxt = styled.div`
  width: 11vw;
`;
const formatBio = (bio) => {

  const lines = bio.split('\n');

  if (lines.length > 2) {
    return `${lines[0]}\n${lines[1]}…`;
  }

  return lines.join('\n');
};

export default function MainPage() {
  const navigate = useNavigate();
  const [partnerInfo, setPartnerInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSoonBreak, setIsSoonBreak] = useState(false);

  // /reissue 요청 보내는 함수
  const reissueToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:9090/reissue", // 리프레시 토큰을 요청하는 엔드포인트
        {},
        {
          withCredentials: true, // 쿠키를 자동으로 보내도록 설정
        }
      );
      if (response.data.accessToken) {
        // 새 액세스 토큰을 로컬 스토리지에 저장
        localStorage.setItem("access", response.data.accessToken);
        console.log("새 액세스 토큰:", response.data.accessToken);
      }
    } catch (error) {
      console.error("리프레시 토큰 재발급 실패:", error);
      navigate("/login");
    }
  };
  // 액세스 토큰이 유효한지 확인하는 함수
  const checkAccessToken = () => {
    const accessToken = localStorage.getItem("access");
    if (!accessToken) {
      return false; // 액세스 토큰이 없으면 유효하지 않음
    }

    // 만약 액세스 토큰이 있다면, 실제로 그 토큰이 유효한지 서버에서 확인할 수 있음 (선택 사항)
    return true;
  };

  useEffect(() => {
    // 액세스 토큰이 유효하지 않거나 없다면 리프레시 토큰으로 새로운 액세스 토큰을 요청
    if (!checkAccessToken()) {
      reissueToken();
    }
  }, []); // 한 번만 실행되도록 빈 배열 전달

  useEffect(() => {
    const coupleCheck = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const res = await authAxios.get(
          "http://localhost:9090/couple/checkSoonBreak"
        );
        setIsSoonBreak(res.data);
        console.log("커플유예?", res.data);
      } catch (error) {
        console.error("Error breaking couple:", error);
      }
    };
    coupleCheck();
  }, [isSoonBreak]);

  useEffect(() => {
    const fetchPartnerInfo = async () => {
      try {
        const access = localStorage.getItem("access");

        if (!access) {
          await reissueToken(); // 액세스 토큰이 없으면 /reissue로 새 토큰을 발급받음
        }

        const authAxios = getAuthAxios(access);
        const partnerResponse = await authAxios.get(
          "http://localhost:9090/user/couple"
        );
        if (!partnerResponse.data) {
          navigate("/coupleConnect");
          return;
        }
        setPartnerInfo(partnerResponse.data);
        console.log("짝꿍정보", partnerResponse.data);
      } catch (error) {
        console.error("Error fetching partner info:", error);
        navigate("/coupleConnect");
      }
    };

    fetchPartnerInfo();
  }, [isSoonBreak]);

  return (
    <MainContainer>
      <Container>
        <Feed />
        <StatusContainer>
          {!isSoonBreak ? (
            <LoveStatus>
              <ProfileThum>
                <img src={partnerInfo?.coupleImg || profilethum} alt="프사" />
              </ProfileThum>
              <ProfileTxt>
                <p style={{ fontFamily: "SokchoBadaBatang", fontSize: "18px" }}>
                  {partnerInfo?.coupleNickname}
                </p>
                <p style={{ fontSize: "14px" }}>  {partnerInfo?.coupleBio ? formatBio(partnerInfo?.coupleBio) : ''} </p>
              </ProfileTxt>
            </LoveStatus>
          ) : (
            <LoveStatus>
              <ProfileTxt>
                <p style={{ fontFamily: "SokchoBadaBatang", fontSize: "17px" }}>
                  커플 없음
                </p>
              </ProfileTxt>
            </LoveStatus>
          )}
          <AlarmRight />
        <AdPlease />
        </StatusContainer>
      </Container>
      <Upload onClick={() => setIsModalOpen(true)} />
      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </MainContainer>
  );
}
