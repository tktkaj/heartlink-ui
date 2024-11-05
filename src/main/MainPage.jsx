import styled from "styled-components";
import Feed from "./Feed";
import profilethum from "../image/sidebar/test.png";
import Upload from "../layout/Upload";
import UploadModal from "../layout/UploadModal";
import { useAuth } from "../api/AuthContext";
import AlarmRight from "../alarm/AlarmRight";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthAxios } from "../api/authAxios";

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
  width: 19vw;
  height: 15vh;
  background-color: white;
  border: rgba(160, 160, 160, 0.2) 1px solid;
  border-radius: 15px;
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
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

export default function MainPage() {
  const navigate = useNavigate();
  const [partnerInfo, setPartnerInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSoonBreak, setIsSoonBreak] = useState(false);

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
              <div>
                <p style={{ fontFamily: "SokchoBadaBatang", fontSize: "17px" }}>
                  {partnerInfo?.coupleNickname}
                </p>
                <p style={{ fontSize: "15px" }}>접속중</p>
              </div>
            </LoveStatus>
          ) : (
            <LoveStatus>
              <div>
                <p style={{ fontFamily: "SokchoBadaBatang", fontSize: "17px" }}>
                  커플 없음
                </p>
              </div>
            </LoveStatus>
          )}
          <AlarmRight />
        </StatusContainer>
      </Container>
      <Upload onClick={() => setIsModalOpen(true)} />
      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </MainContainer>
  );
}
