import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Condition() {
  const [radioChecked, setRadioChecked] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const navigate = useNavigate();

  const ConditionBox = styled.div`
    width: 1100px;
    height: 600px;
    border-radius: 20px;
    border: 2px solid #f0f0f0;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `;

  const AgreementLabel = styled.label`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
  `;
  const AgreementInput = styled.input`
    margin-right: 5px;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 10px;
    cursor: pointer;
    transition: border-color 0.3s ease;
    &:focus {
      border-color: #706ef4;
    }
    &:checked {
      accent-color: #706ef4; /* 체크된 상태일 때 색상 변경 */
    }
  `;

  const AgreementSpan = styled.span`
    font-size: 0.8rem;
    margin-right: auto;
    color: #333;
  `;

  const AgreementTitle = styled.div`
    display: flex;
    font-size: 1.2rem;
    color: #333;
    margin-top: 20px;
    margin-right: auto;
  `;

  const PersonalInfoAgreement = styled.div`
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 20px;
  `;

  const AgreementBox = styled.div`
    width: 900px;
    background-color: #ececec79;
    border-radius: 10px;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 15px;
    overflow-y: auto;
    max-height: 115px;
  `;

  const AgreementCheckboxLabel = styled.label`
    display: flex;
    align-items: center;
    cursor: pointer;
  `;
  const AgreementRadioLabel = styled.div`
    font-size: 0.8rem;
    margin-right: auto;
    color: #333;
  `;

  const NextButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 10px;
    width: 250px;
    height: 30px;
    color: white;
    background-color: ${(props) => (props.disabled ? "#ccc" : "#706EF4")};
    border-radius: 5px;
    border: none;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    font-size: 1rem;
    font-weight: bold;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px;
  `;

  let str = ` 








수집하는 개인정보 항목
필수 항목: 성명, 생년월일, 연락처(이메일, 전화번호), 로그인 정보(아이디, 비밀번호)
선택 항목: 주소, 성별, 직업
개인정보 수집 및 이용 목적

회원 가입 및 관리: 서비스 이용을 위한 본인 확인, 회원 식별 및 관리
서비스 제공: 맞춤형 서비스 제공 및 이용자 간의 커뮤니케이션
마케팅 및 광고: 서비스 홍보, 이벤트 정보 제공
서비스 개선 및 분석: 서비스 이용 현황 분석 및 품질 개선
개인정보 보유 및 이용 기간

회원 탈퇴 시 즉시 파기 (단, 법령에 따라 보존이 필요한 경우 관련 법령에 따라 일정 기간 보유)
마케팅 및 광고 목적의 개인정보는 동의 철회 시까지 보유 및 이용`;

  const handleNext = () => {
    if (!allChecked || !radioChecked) {
      toast.error("모든 약관에 동의해주세요.");
      return;
    }
    navigate("/user/join");
  };

  return (
    <ConditionBox>
      <PersonalInfoAgreement>개인정보 활용동의</PersonalInfoAgreement>
      <AgreementLabel>
        <AgreementTitle>약관동의</AgreementTitle>
        <AgreementBox>
          <div style={{ marginRight: "auto" }}>
            <AgreementInput
              type="checkbox"
              style={{ marginRight: "5px" }}
              checked={allChecked}
              onChange={(e) => setAllChecked(e.target.checked)}
            />
            <AgreementSpan style={{ fontSize: "0.9rem" }}>
              모두동의합니다.
            </AgreementSpan>
          </div>
          <div style={{ marginRight: "auto", marginTop: "5px" }}>
            <AgreementSpan>
              수집하는 개인정보 항목 필수 항목: 성명, 생년월일, 연락처(이메일,
              전화번호) 선택 항목: 주소, 성별, 직업 개인정보 수집 및 이용 목적
              회원 가입 및 관리: 본인 확인, 회원 식별 서비스 제공: 맞춤형 서비스
              제공 및 이용자 간의 커뮤니케이션
            </AgreementSpan>
          </div>
        </AgreementBox>
      </AgreementLabel>
      <AgreementLabel>
        <AgreementTitle style={{ marginTop: "10px" }}>
          [필수]민간정보 수집이용
        </AgreementTitle>
        <AgreementBox
          style={{
            border: "2px solid #706EF4",
            opacity: "0.49",
            background: "white",
          }}
        >
          <AgreementSpan>
            <pre>{str}</pre>
          </AgreementSpan>
        </AgreementBox>
      </AgreementLabel>
      <AgreementBox style={{ flexDirection: "row", marginBottom: "25px" }}>
        <AgreementRadioLabel>
          민감정보 수집 및 이용에 대한 안내 사항을 읽고 동의합니다.
        </AgreementRadioLabel>
        <AgreementCheckboxLabel
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <AgreementInput
            type="radio"
            checked={!radioChecked}
            onChange={() => setRadioChecked(!radioChecked)}
          />
          <AgreementSpan style={{ fontSize: "0.8rem", marginRight: "5px" }}>
            동의하지 않음
          </AgreementSpan>
          <AgreementInput
            type="radio"
            checked={radioChecked}
            onChange={() => setRadioChecked(!radioChecked)}
          />
          <AgreementSpan style={{ fontSize: "0.8rem" }}>동의</AgreementSpan>
        </AgreementCheckboxLabel>
      </AgreementBox>
      <div>
        <NextButton
          onClick={handleNext}
          disabled={!allChecked || !radioChecked}
        >
          회원가입
        </NextButton>
      </div>
    </ConditionBox>
  );
}
