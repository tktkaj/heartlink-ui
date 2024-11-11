import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "../image/logo/Logo.png";
import { MdContentCopy } from "react-icons/md";
import CopyToClipboard from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { getAuthAxios } from "../api/authAxios";
import { toast, ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";

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
const CoupleContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 5vh;
`;

const LogoImage = styled.div`
  width: 14vw;
  height: 12vh;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  margin-bottom: 5.5vh;
`;

const CodeBox = styled.div`
  display: flex;
  width: 18vw;
  justify-content: space-between;
`;

const CodeTxt = styled.div`
  display: flex;
  gap: 5px;
  font-size: 18px;
`;

const CopyBox = styled.div`
  display: flex;
  gap: 7px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const InputBox = styled.div`
  width: 300px;
  height: 20vh;
  align-items: center;
  margin-top: 5px;
`;

const StyledButton = styled.button`
  width: 300px;
  height: 40px;
  background-color: #f9a0bd;
  color: white;
  border: none;
  border-radius: 18px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #ef80a5;
  }
`;

export default function CoupleConnect() {
  const [code, setCode] = useState(null);
  const [inputCode, setInputCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkCoupleStatus = async () => {
      try {
        const accessToken = localStorage.getItem("access");

        // JWT 토큰 디코딩해서 역할 추출
        const decodedToken = jwtDecode(accessToken);
        const userRole = decodedToken.role; // "ROLE_USER", "ROLE_COUPLE", "ROLE_SINGLE" 등

        // ROLE_USER일 때만 페이지에 그대로 있어야 함
        if (userRole === "ROLE_COUPLE" || userRole === "ROLE_SINGLE") {
          navigate("/home");
          return;
        }

        // 여전히 ROLE_USER라면, 여기에 맞는 로직 실행
        const access = localStorage.getItem("access");
        const authAxios = getAuthAxios(access);
        const mycode = await authAxios.get("/couple/match/code");
        console.log("내 코드:", mycode);
        setCode(mycode.data);
      } catch (err) {
        console.error("Error checking couple status:", err);
      }
    };

    checkCoupleStatus();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const access = localStorage.getItem("access");
      const authAxios = getAuthAxios(access);
      const response = await authAxios.post(
        `/couple/match/code/link?code=${inputCode}`
      );

      // 201 응답을 처리할 때
      if (response.status === 201) {
        toast.success("커플 연결에 성공했습니다!");
        navigate("/coupleConnect2");
      } else {
        // 예상하지 못한 상태 코드 처리
        toast.error("예상하지 못한 오류가 발생했습니다.");
      }
    } catch (error) {
      toast.error("서버와의 연결에 실패했습니다.");
    }
  };
  return (
    <>
      <ToastContainer />
      <SignUpBox>
        <CoupleContainer>
          <LogoImage>
            <img src={Logo} alt="로고" />
          </LogoImage>
          <CodeBox>
            <CodeTxt>
              <p>내 코드: </p>
              <p>{code}</p>
            </CodeTxt>
            <CopyBox>
              <CopyToClipboard
                text={code}
                onCopy={() => toast.success("내 코드가 복사되었습니다.")}
              >
                <MdContentCopy />
              </CopyToClipboard>
            </CopyBox>
          </CodeBox>
          <InputBox>
            <div>
              <input
                type="text"
                placeholder="상대코드를 입력하세요."
                required
                class="block w-full rounded-md border-0 py-1.5  placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-none"
                style={{
                  width: "290px",
                  border: "1px solid #ef80a5",
                  paddingLeft: "5px",
                  marginLeft: "5px",
                }}
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              ></input>
            </div>
            <div>
              <StyledButton onClick={handleSubmit}>등록하기</StyledButton>
            </div>
          </InputBox>
        </CoupleContainer>
      </SignUpBox>
    </>
  );
}
