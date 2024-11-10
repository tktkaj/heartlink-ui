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
  const lines = bio.split("\n");

  if (lines.length > 2) {
    return `${lines[0]}\n${lines[1]}…`;
  }

  return lines.join("\n");
};

export default function MainPage() {
  const navigate = useNavigate();
  const [partnerInfo, setPartnerInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSoonBreak, setIsSoonBreak] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const coupleCheck = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const userRes = await authAxios.get("/user/profile");
        setUserId(userRes.data);

        const res = await authAxios.get("/couple/checkSoonBreak");
        setIsSoonBreak(res.data);
        console.log("커플유예?", res.data);

        if (res.data) {
          navigate(`/user/profile/${userRes.data}`);
        }
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
        const partnerResponse = await authAxios.get("/user/couple");
        console.log("짝꿍정보 응답", partnerResponse);
        if (!partnerResponse.data) {
          navigate("/coupleConnect");
          return;
        }
        console.log("짝꿍정보", partnerResponse.data);
        setPartnerInfo(partnerResponse.data);
      } catch (error) {
        console.error("Error fetching partner info:", error);
      }
    };

    fetchPartnerInfo();
  }, []);

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
                <p style={{ fontSize: "14px" }}>
                  {" "}
                  {partnerInfo?.coupleBio
                    ? formatBio(partnerInfo?.coupleBio)
                    : ""}{" "}
                </p>
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
