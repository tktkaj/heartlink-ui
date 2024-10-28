import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SideMenu from "../sideMenu/SideMenu";
import downArrow from "../image/couple/arrow.png";
import Upload from "../layout/Upload";
import axios from "axios";
import { getAuthAxios } from "../api/authAxios";

const MainContainer = styled.div`
  background-color: #f8f8fa;
  display: flex;
`;

const Container = styled.div`
  width: 100vw;
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
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  const toggleDropdown1 = () => {
    setIsOpen1((prev) => !prev);
  };
  const toggleDropdown2 = () => {
    setIsOpen2((prev) => !prev);
  };

  const [couple, setCouple] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [themes, setThemes] = useState([]);

  const fetchMissionTags = async (year, month) => {
    try {
      const response = await axios.get(
        "http://localhost:9090/couple/missionslink",
        {
          params: { year, month },
        }
      );
      setThemes(response.data);
    } catch (error) {
      console.error("미션 태그 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    const access = localStorage.getItem("access");
    const authAxios = getAuthAxios(access);

    const fetchData = async () => {
      setLoading(true);
      try {
        // 미션태그 가져오기
        await fetchMissionTags(selectedYear, selectedMonth);

        const match = await authAxios.get(
          "http://localhost:9090/couple/missionmatch/questions"
        );
        console.log(match);
        setCouple(match.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedYear, selectedMonth]); // year와 month가 변경될 떄마다 호출

  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setIsOpen1(false);
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setIsOpen2(false);
  };
  return (
    <>
      <MainContainer>
        <SideMenu />
        <Container>
          <FeedBox>
            <LoveHeader>
              <p>🩷+ 365</p>
              <LinkMatch>Link Match</LinkMatch>
              <ButtonContainer>
                <RecordButton>기록보기</RecordButton>
                <ButtonShadow></ButtonShadow>
              </ButtonContainer>
            </LoveHeader>
            <LinkMatchContent>
              <Match>
                <MatchTxt>
                  <p>{couple.match1}</p>
                </MatchTxt>
              </Match>
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>V S</p>
              <Match>
                <MatchTxt>
                  <p>{couple.match2}</p>
                </MatchTxt>
              </Match>
            </LinkMatchContent>
            <div style={{ display: "flex", margin: "auto", width: "35vw" }}>
              <LinkMission>
                <MissionHeader>
                  <LinkMatch>Link Mission</LinkMatch>
                  <LinkMatchDrop>
                    <div class="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          onClick={toggleDropdown1}
                          class="inline-flex w-full justify-space-around rounded-md bg-white px-2 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          id="menu-button"
                          aria-expanded={isOpen1}
                          aria-haspopup="true"
                        >
                          {selectedYear}
                          <img
                            src={downArrow}
                            alt="아래화살표"
                            style={{
                              width: "15px",
                              height: "15px",
                            }}
                          />
                        </button>
                      </div>
                      {isOpen1 && (
                        <div
                          className="absolute mt-1 w-13 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="menu-button"
                          tabIndex="-1"
                        >
                          <div className="py-1" role="none">
                            {["2022", "2023", "2024"].map((year, index) => (
                              <a
                                href="#"
                                key={index}
                                onClick={() => handleYearSelect(year)}
                                className="block px-3 py-0.5 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                                tabIndex="-1"
                                id={`menu-item-${index}`}
                              >
                                {year}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <div class="relative inline-block text-left">
                      <div>
                        <button
                          type="button"
                          onClick={toggleDropdown2}
                          class="inline-flex w-full justify-space-around rounded-md bg-white px-2 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          id="menu-button"
                          aria-expanded={isOpen2}
                          aria-haspopup="true"
                        >
                          {
                            [
                              "1",
                              "2",
                              "3",
                              "4",
                              "5",
                              "6",
                              "7",
                              "8",
                              "9",
                              "10",
                              "11",
                              "12",
                            ][selectedMonth - 1]
                          }
                          <img
                            src={downArrow}
                            alt="아래화살표"
                            style={{
                              width: "15px",
                              height: "15px",
                            }}
                          />
                        </button>
                      </div>
                      {isOpen2 && (
                        <div
                          className="absolute mt-1 w-13 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="menu-button"
                          tabIndex="-1"
                        >
                          <div className="py-1">
                            {[
                              "1",
                              "2",
                              "3",
                              "4",
                              "5",
                              "6",
                              "7",
                              "8",
                              "9",
                              "10",
                              "11",
                              "12",
                            ].map((month, index) => (
                              <a
                                href="#"
                                key={index}
                                onClick={() => handleMonthSelect(index + 1)}
                                className="block px-3 py-0.5 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                                tabIndex="-1"
                                id={`menu-item-${index}`}
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
                  {themes.map((theme, index) => (
                    <BingoCell
                      key={index}
                      image={`url/to/image${index + 1}.jpg`}
                    >
                      {theme}
                    </BingoCell>
                  ))}
                </BingoBoard>
              </LinkMission>
              <Graph></Graph>
            </div>
          </FeedBox>
          <Advert>
            <p>광고입니다</p>
          </Advert>
        </Container>
        <Upload />
      </MainContainer>
    </>
  );
}
