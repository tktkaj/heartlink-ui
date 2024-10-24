import React from "react";
import styled from "styled-components";
import Logo from "../image/logo/Logo.png";
import { MdContentCopy } from "react-icons/md";
import kakao from "../image/sns/free-icon-kakao-talk-4494622.png";
import CopyToClipboard from "react-copy-to-clipboard";

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
  width: 13vw;
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

const CodeImg = styled.div`
  width: 20px;
  height: 20px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
`;

const StyledButton = styled.button`
  width: 290px;
  height: 40px;
  background-color: #f9a0bd;
  color: white;
  border: none;
  border-radius: 18px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #ef80a5;
  }
`;

export default function CoupleConnect() {
  return (
    <>
      <SignUpBox>
        <CoupleContainer>
          <LogoImage>
            <img src={Logo} alt="로고" />
          </LogoImage>
          <CodeBox>
            <CodeTxt>
              <p>내 코드: </p>
              <p>3FJ6E1</p>
            </CodeTxt>
            <CopyBox>
              <CopyToClipboard
                text="3FJ6E1"
                onCopy={() => alert("내 코드가 복사되었습니다.")}
              >
                <MdContentCopy />
              </CopyToClipboard>
              <CodeImg>
                <img src={kakao} alt="카카오전달" />
              </CodeImg>
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
                  width: "280px",
                  border: "1px solid #ef80a5",
                  paddingLeft: "3px",
                }}
              ></input>
            </div>
            <div>
              <StyledButton type="submit">등록하기</StyledButton>
            </div>
          </InputBox>
        </CoupleContainer>
      </SignUpBox>
    </>
  );
}
