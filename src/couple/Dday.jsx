import { useState } from "react";
import styled from "styled-components";
import { getAuthAxios } from "../api/authAxios";

const DdayContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DdayBox = styled.div`
  width: 500px;
  padding: 40px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  color: #ff6b6b;
  margin-bottom: 30px;
  font-size: 24px;
`;

const DateContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 30px;
`;

const Select = styled.select`
  padding: 10px;
  border: 2px solid #ffc2c2;
  border-radius: 8px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #ff6b6b;
  }
`;

const Button = styled.button`
  background-color: #fc8f8f;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #fb8383;
  }
`;

export default function Dday() {
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const years = Array.from({ length: 30 }, (_, i) => 2024 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleSubmit = async () => {
    if (!year || !month || !day) {
      alert("날짜를 모두 선택해주세요!");
      return;
    }

    const formattedMonth = month.toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");
    const dateString = `${year}-${formattedMonth}-${formattedDay}`;

    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);
      const response = await authAxios.put(
        `/couple/dday/update?date=${dateString}`
      );
      console.log("디데이 설정 성공:", response);
      alert("디데이가 수정되었습니다!");
      window.location.href = "/couple";
    } catch (error) {
      console.error("디데이 설정 실패:", error);
      alert("디데이 수정에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <DdayContainer>
      <DdayBox>
        <Title>D-DAY를 설정해주세요💕</Title>
        <DateContainer>
          <Select value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">년도</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}년
              </option>
            ))}
          </Select>
          <Select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value="">월</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}월
              </option>
            ))}
          </Select>
          <Select value={day} onChange={(e) => setDay(e.target.value)}>
            <option value="">일</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}일
              </option>
            ))}
          </Select>
        </DateContainer>
        <Button onClick={handleSubmit}>수정하기</Button>
      </DdayBox>
    </DdayContainer>
  );
}
