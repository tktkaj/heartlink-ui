import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAuthAxios } from "../api/authAxios";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  z-index: 999;
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 38vw;
  height: 80vh;
  padding: 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const MissionList = styled.div`
  display: flex;
  flex-direction: column;
  height: 65vh;
  gap: 15px;
  overflow-y: auto;
  padding-right: 15px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
`;

const MissionItem = styled.div`
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const QuestionWrapper = styled.div`
  flex: 1;
`;

const QuestionTitle = styled.h3`
  margin: 0;
  color: #495057;
  font-size: 16px;
  margin-bottom: 10px;
`;

const AnswerWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Answer = styled.p`
  margin: 0;
  color: #495057;
`;

const Date = styled.span`
  color: #868e96;
  font-size: 14px;
  min-width: 100px;
  text-align: right;
`;

function LinkMatchRecord({ closeRecord }) {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const response = await authAxios.get("/couple/missionmatch/answerList");
        setMissions(response.data);
        console.log("매치답변들", response.data);
      } catch (error) {
        console.error("미션 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchMissions();
  }, []);

  return (
    <>
      <Backdrop onClick={closeRecord} />
      <Container>
        <Title>링크매치 기록</Title>
        <MissionList>
          {missions.map((mission, index) => (
            <MissionItem key={index}>
              <img
                src={require(mission?.myAnswer?.myChoice ===
                  mission?.partnerAnswer?.partnerChoice
                  ? "../image/couple/linkhearts.png"
                  : "../image/couple/hearts.png")}
                alt="하트"
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              />
              <QuestionWrapper>
                <QuestionTitle>
                  {mission?.match1} vs {mission?.match2}
                </QuestionTitle>
                <AnswerWrapper>
                  <Answer>
                    내 답변 :{" "}
                    {mission.myChoice == -1
                      ? "미답변"
                      : mission.myChoice == 0
                      ? mission.match1
                      : mission.match2}
                  </Answer>
                  <Answer>
                    짝꿍 답변 :{" "}
                    {mission.partnerChoice == -1
                      ? "미답변"
                      : mission.partnerChoice == 0
                      ? mission.match1
                      : mission.match2}
                  </Answer>
                </AnswerWrapper>
              </QuestionWrapper>
              <Date>{mission.date}</Date>
            </MissionItem>
          ))}
        </MissionList>
      </Container>
    </>
  );
}

export default LinkMatchRecord;
