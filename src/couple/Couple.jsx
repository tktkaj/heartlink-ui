import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SideMenu from "../sideMenu/SideMenu";
import downArrow from "../image/couple/arrow.png";
import Upload from "../layout/Upload";
import axios from "axios";
import { getAuthAxios } from "../api/authAxios";
import LinkMatchRecord from "./LinkMatchRecord";
import { useAuth } from "../api/AuthContext";
import CoupleGraph from "./CoupleGraph";
const MainContainer = styled.div`
  background-color: #f8f8fa;
  display: flex;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  margin-left: 20vw;
  gap: 3.5vw;
`;

const FeedBox = styled.div`
  width: 40vw;
  height: 84vh;
  border: 1px solid rgba(160, 160, 160, 0.5);
  border-radius: 4%;
  background-color: white;
  margin-left: 150px;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Advert = styled.div`
  width: 15vw;
  height: 60vh;
  background-color: white;
  border: rgba(160, 160, 160, 0.2) 1px solid;
  border-radius: 20px;
  margin-top: 60px;
`;

const LoveHeader = styled.div`
  width: 100%;
  height: 9vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #eee;
  gap: 9vw;
  z-index: 3;
`;

const LinkMatch = styled.div`
  font-size: 20px;
  font-family: "SANGJUGyeongcheonIsland";
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 3px;
    height: 9px;
    background-color: #f48589;
    opacity: 0.3;
  }
`;

const ButtonContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const RecordButton = styled.div`
  width: 70px;
  height: 30px;
  font-size: 14px;
  background-color: #fff9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  cursor: pointer;
  z-index: 1;
  &:hover {
    transform: translate(1px, 1px);
  }
`;

const ButtonShadow = styled.div`
  position: absolute;
  bottom: -3px;
  right: -3px;
  width: 100%;
  height: 100%;
  background-color: #fed3d3;
  z-index: -1; /* 버튼 뒤에 배치 */
  border-radius: 10px;
`;

const LinkMatchContent = styled.div`
  width: 100%;
  height: 27vh;
  background-color: #fab7cd26;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5vw;
`;

const Match = styled.div`
  width: 13.8vw;
  height: 19vh;
  background: #eaeaff;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const MatchTxt = styled.div`
  width: 13vw;
  p {
    font-size: 18px;
    text-align: center;
  }
`;

const LinkMission = styled.div``;
const MissionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;
const LinkMatchDrop = styled.div`
  display: flex;
  gap: 5px;
`;

const BingoBoard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
  width: 260px;
  margin: 0 auto;
`;

const BingoCell = styled.div`
  background-color: #dcdcdc;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  font-size: 14px;
  background-image: url(${(props) => props.image});
  background-size: cover;
  background-position: center;
`;

const Graph = styled.div`
  width: 300px;
  height: 300px;
`;

export default function Couple() {
  const { token, setToken, authAxios } = useAuth();
  console.log(token);

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const toggleDropdown1 = () => setIsOpen1((prev) => !prev);
  const toggleDropdown2 = () => setIsOpen2((prev) => !prev);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [mission, setMission] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [themes, setThemes] = useState([]);

  const [selectedMatch, setSelectedMatch] = useState(null);

  const [dday, setDday] = useState(null);

  useEffect(() => {
    const fetchYearMonth = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const response = await authAxios.get(
          "http://localhost:9090/couple/missionAllList"
        );
        const { years, months } = response.data;
        setYears(years);
        setMonths(months.map((month) => month.toString()));

        // D-day 조회
        const ddayResponse = await authAxios.get(
          "http://localhost:9090/couple/dday"
        );
        setDday(ddayResponse.data);
        console.log("dday", ddayResponse.data);
      } catch (error) {
        console.error("연도 및 월 가져오기 중 오류 발생:", error);
      }
    };

    fetchYearMonth();
  }, []);

  useEffect(() => {
    const savedMatch = localStorage.getItem("selectedMatch");
    if (savedMatch) {
      setSelectedMatch(Number(savedMatch)); // 저장된 매치를 숫자로 변환
      console.log(selectedMatch);
    }

    const access = localStorage.getItem("access");
    const authAxios = getAuthAxios(access);

    const fetchData = async () => {
      setLoading(true);
      try {
        await fetchMissionTags(selectedYear, selectedMonth);
        const match = await authAxios.get(
          "http://localhost:9090/couple/missionmatch/questions"
        );
        console.log(match);
        setMission(match.data);
      } catch (err) {
        setError("API 호출 중 오류 발생: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedYear, selectedMonth]);

  const handleMatchSelect = async (couple) => {
    const questionId = mission.linkMatchId;
    if (questionId === null) {
      console.error("질문 ID가 없습니다.");
      return;
    }

    localStorage.setItem("selectedMatch", couple);

    const matchAnswer = { questionId, selectedOption: couple };
    console.log(matchAnswer);

    try {
      const access = localStorage.getItem("access");
      const response = await axios.post(
        "http://localhost:9090/couple/missionmatch/questions/choose",
        matchAnswer,
        {
          headers: {
            Authorization: access,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error);
      setError("매칭을 저장하는 중 오류 발생: " + error.message);
    }
    setSelectedMatch(couple);
  };

  const fetchMissionTags = async (year, month) => {
    try {
      const access = localStorage.getItem("access");
      const response = await axios.get(
        "http://localhost:9090/couple/missionslink",
        { params: { year, month } },
        {
          headers: {
            Authorization: access,
          },
        }
      );
      console.log(response.data);
      setThemes(response.data);
    } catch (error) {
      console.error("미션 태그 가져오는 중 오류 발생:", error);
    }
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setIsOpen1(false);
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setIsOpen2(false);
  };

  const [isLinkMatchOpen, setIsLinkMatchOpen] = useState(false);
  const openRecord = () => setIsLinkMatchOpen(true);
  const closeRecord = () => setIsLinkMatchOpen(false);

  return (
    <>
      <MainContainer>
        <Container>
          <FeedBox>
            <LoveHeader>
              <p>🩷+ {dday}</p>
              <LinkMatch>Link Match</LinkMatch>
              <ButtonContainer>
                <RecordButton onClick={openRecord}>기록보기</RecordButton>
                <ButtonShadow></ButtonShadow>
              </ButtonContainer>
            </LoveHeader>
            <LinkMatchContent>
              <Match
                onClick={() => handleMatchSelect(0)}
                style={{
                  border: selectedMatch === 0 ? "5px dotted pink" : "none",
                }}
              >
                <MatchTxt>
                  <p>{mission.match1}</p>
                </MatchTxt>
              </Match>
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>V S</p>
              <Match
                onClick={() => handleMatchSelect(1)}
                style={{
                  border: selectedMatch === 1 ? "5px dotted pink" : "none",
                }}
              >
                <MatchTxt>
                  <p>{mission.match2}</p>
                </MatchTxt>
              </Match>
            </LinkMatchContent>
            <div style={{ display: "flex", margin: "auto", width: "35vw" }}>
              <LinkMission>
                <MissionHeader>
                  <LinkMatch>Link Mission</LinkMatch>
                  <LinkMatchDrop>
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          onClick={toggleDropdown1}
                          className="inline-flex w-full justify-space-around rounded-md bg-white px-2 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          id="menu-button"
                          aria-expanded={isOpen1}
                          aria-haspopup="true"
                        >
                          {selectedYear}
                          <img
                            src={downArrow}
                            alt="아래화살표"
                            style={{ width: "15px", height: "15px" }}
                          />
                        </button>
                      </div>
                      {isOpen1 && (
                        <div className="absolute mt-1 w-13 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {years.map((year, index) => (
                              <a
                                href="#"
                                key={index}
                                onClick={() => handleYearSelect(year)}
                                className="block px-3 py-0.5 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                              >
                                {year}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          onClick={toggleDropdown2}
                          className="inline-flex w-full justify-space-around rounded-md bg-white px-2 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          id="menu-button"
                          aria-expanded={isOpen2}
                          aria-haspopup="true"
                        >
                          {selectedMonth}
                          <img
                            src={downArrow}
                            alt="아래화살표"
                            style={{ width: "15px", height: "15px" }}
                          />
                        </button>
                      </div>
                      {isOpen2 && (
                        <div className="absolute mt-1 w-13 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {months.map((month, index) => (
                              <a
                                href="#"
                                key={index}
                                onClick={() => handleMonthSelect(month)}
                                className="block px-3 py-0.5 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                              >
                                {month}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </LinkMatchDrop>
                </MissionHeader>
                <BingoBoard>
                  {themes.map((theme) => (
                    <BingoCell
                      key={theme.missionId}
                      image={`url/to/image${theme.missionId}.jpg`}
                    >
                      {theme.linkTag}
                    </BingoCell>
                  ))}
                </BingoBoard>
              </LinkMission>
              <CoupleGraph></CoupleGraph>
            </div>
          </FeedBox>
          <Advert>
            <p>광고입니다</p>
          </Advert>
        </Container>
        <Upload />
        {isLinkMatchOpen && <LinkMatchRecord closeRecord={closeRecord} />}
      </MainContainer>
    </>
  );
}
