import SideMenu from "../sideMenu/SideMenu";
import styled from "styled-components";
import Feed from "./Feed";
import profilethum from "../image/sidebar/test.png";
import Upload from "../layout/Upload";
import { useAuth } from "../api/AuthContext";
import AlarmRight from "../alarm/AlarmRight";
import { useEffect, useState } from "react";

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
  margin-left: 20vw;
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
  height: 12vh;
  background-color: white;
  border: rgba(160, 160, 160, 0.2) 1px solid;
  border-radius: 15px;
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ProfileThum = styled.div`
  width: 50px;
  height: 50px;
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
  const { token, setToken, authAxios } = useAuth();
  console.log(token);
  const [myInfo, setMyInfo] = useState(null);
  const [partnerInfo, setPartnerInfo] = useState(null);

  useEffect(() => {
    const fetchPartnerInfo = async () => {
      try {
        // 먼저 현재 사용자의 ID를 가져옴
        const userId = await authAxios.get(
          "http://localhost:9090/user/profile"
        );
        const myId = userId.data;

        // 내 정보를 가져옴
        const userResponse = await authAxios.get(
          `http://localhost:9090/user/profile/${myId}`
        );
        setMyInfo(userResponse.data);

        // 내 파트너 정보를 가져옴
        const partnerResponse = await authAxios.get(
          `http://localhost:9090/user/profile/${myInfo.coupleUserId}`
        );
        setPartnerInfo(partnerResponse.data);
        console.log("짝꿍정보", partnerResponse.data);
      } catch (error) {
        console.error("Error fetching partner info:", error);
      }
    };

    fetchPartnerInfo();
  }, [authAxios]);

  return (
    <MainContainer>
      <SideMenu />
      <Container>
        <Feed />
        <StatusContainer>
          <LoveStatus>
            <ProfileThum>
              <img src={partnerInfo?.userimg || profilethum} alt="프사" />
            </ProfileThum>
            <div>
              <p style={{ fontFamily: "SokchoBadaBatang", fontSize: "17px" }}>
                {partnerInfo?.nickname}
              </p>
              <p style={{ fontSize: "15px" }}>접속중</p>
            </div>
          </LoveStatus>
          <AlarmRight />
        </StatusContainer>
      </Container>
      <Upload />
    </MainContainer>
  );
}
