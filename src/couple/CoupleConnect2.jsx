import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../image/logo/Logo.png";
import downArrow from "../image/couple/arrow.png";
import { getAuthAxios } from "../api/authAxios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { getNewRefreshToken } from "../api/refresh";

const SignUpBox = styled.form`
  background-color: white;
  width: 900px;
  height: 550px;
  border-radius: 20px;
  border: 2px solid #f0f0f0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10vh;
  box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px,
    rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px,
    rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px,
    rgba(42, 51, 70, 0.04) 0px 6px 6px -3px,
    rgba(14, 63, 126, 0.04) 0px 12px 12px -6px,
    rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;
`;

const LogoImage = styled.div`
  width: 13vw;
  height: 12vh;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  margin-bottom: 4vh;
`;

const CoupleTxt = styled.div`
  font-size: 15px;
  text-align: center;
  letter-spacing: 0px;
`;

const LinkMatchDrop = styled.div`
  display: flex;
  width: 18vw;
  justify-content: space-between;
  gap: 20px;
  margin-top: 3vh;
`;
const StyledButton = styled.button`
  width: 280px;
  height: 40px;
  background-color: #f9a0bd;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1.5vh;
  margin-bottom: 4vh;

  &:hover {
    background-color: #ef80a5;
  }
`;

export default function CoupleConnect2() {
  const navigate = useNavigate();
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [partnerInfo, setPartnerInfo] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2024");
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedDay, setSelectedDay] = useState("01");

  useEffect(() => {
    const fetchPartnerInfo = async () => {
      try {
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const response = await authAxios.get("/user/couple");
        setPartnerInfo(response.data);
        console.log("파트너 정보:", response.data);
      } catch (error) {
        console.error("파트너 정보 가져오기 실패:", error);
      }
    };

    fetchPartnerInfo();
  }, []);

  const toggleDropdown1 = () => {
    setIsOpen1((prev) => !prev);
  };
  const toggleDropdown2 = () => {
    setIsOpen2((prev) => !prev);
  };
  const toggleDropdown3 = () => {
    setIsOpen3((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);
      const date = `${selectedYear}-${selectedMonth.padStart(
        2,
        "0"
      )}-${selectedDay.padStart(2, "0")}`;

      await authAxios.post(`/couple/dday?date=${date}`);

      const { accessToken, refreshToken } = await getNewRefreshToken();
      localStorage.setItem("access", accessToken);
      localStorage.setItem("refresh", refreshToken);

      // 새로운 토큰을 바로 사용하도록 상태 업데이트
      authAxios.defaults.headers["Authorization"] = `Bearer ${accessToken}`;

      console.log("커플 해지 취소 후 토큰", localStorage.getItem("access"));
      console.log("커플 해지 취소 후 토큰", localStorage.getItem("refresh"));

      toast.success("D-day 설정에 성공했습니다!");
      navigate("/home");
    } catch (error) {
      console.error("D-day 설정 실패:", error);
    }
  };

  return (
    <>
      <SignUpBox onSubmit={handleSubmit}>
        <LogoImage>
          <img src={Logo} alt="로고" />
        </LogoImage>
        <CoupleTxt>
          <p>{partnerInfo?.coupleNickname} 님과 매칭되었습니다.</p>
          <p>D-DAY를 설정해보세요.</p>
        </CoupleTxt>
        <LinkMatchDrop>
          <div class="relative inline-block text-left">
            <div>
              <button
                type="button"
                onClick={toggleDropdown1}
                class="inline-flex w-full justify-space-around  rounded-2xl bg-white px-6 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                id="menu-button"
                aria-expanded="true"
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
                className="absolute mt-1 ml-3 w-13 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
                tabIndex="-1"
              >
                <div className="py-1" role="none">
                  <div className="max-h-48 overflow-y-auto">
                    {[
                      "2016",
                      "2017",
                      "2018",
                      "2019",
                      "2020",
                      "2021",
                      "2022",
                      "2023",
                      "2024",
                    ].map((year, index) => (
                      <a
                        href="#"
                        key={index}
                        className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        tabIndex="-1"
                        id={`menu-item-${index}`}
                        onClick={() => {
                          setSelectedYear(year);
                          setIsOpen1(false);
                        }}
                      >
                        {year}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: "5px" }}>
            <div class="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  onClick={toggleDropdown2}
                  class="inline-flex w-full justify-space-between  rounded-2xl bg-white px-6 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  {selectedMonth}
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
                  className="absolute mt-1 ml-3 w-19 origin-top-right  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <div className="max-h-48 overflow-y-auto">
                      {[
                        "01",
                        "02",
                        "03",
                        "04",
                        "05",
                        "06",
                        "07",
                        "08",
                        "09",
                        "10",
                        "11",
                        "12",
                      ].map((month, index) => (
                        <a
                          href="#"
                          key={index}
                          className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          tabIndex="-1"
                          id={`menu-item-${index}`}
                          onClick={() => {
                            setSelectedMonth(month);
                            setIsOpen2(false);
                          }}
                        >
                          {month}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div class="relative inline-block text-left">
              <div>
                <button
                  type="button"
                  onClick={toggleDropdown3}
                  class="inline-flex w-full justify-space-around  rounded-2xl bg-white px-6 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  id="menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  {selectedDay}
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
              {isOpen3 && (
                <div
                  className="absolute mt-1 ml-3 w-19 origin-top-right  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex="-1"
                >
                  <div className="py-1" role="none">
                    <div className="max-h-48 overflow-y-auto">
                      {Array.from({ length: 31 }, (_, i) =>
                        (i + 1).toString().padStart(2, "0")
                      ).map((day, index) => (
                        <a
                          href="#"
                          key={index}
                          className="block px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          tabIndex="-1"
                          id={`menu-item-${index}`}
                          onClick={() => {
                            setSelectedDay(day);
                            setIsOpen3(false);
                          }}
                        >
                          {day}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </LinkMatchDrop>
        <StyledButton type="submit">하트링크 시작하기</StyledButton>
      </SignUpBox>
    </>
  );
}
