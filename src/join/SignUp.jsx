import React, { useState } from "react";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const SignUpBox = styled.form`
  width: 1100px;
  height: 700px;
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

const SignUpTitle = styled.div`
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignUpLabel = styled.label`
  font-size: 0.8rem;
  margin-bottom: 5px;
  margin-right: auto;
  display: flex;
`;

const SignUpInput = styled.input`
  width: 360px;
  height: 40px;
  font-size: 0.8rem;
  margin-bottom: 8px;
  padding: 10px;
  border: 0.15rem solid rgba(112, 110, 244, 0.49);
  border-radius: 5px;

  ::placeholder {
    color: #333;
  }
`;

const SignUpSelect = styled.select`
  width: 350px;
  height: 40px;
  font-size: 0.8rem;
  margin-bottom: 8px;
  padding: 10px;
  border: 0.15rem solid rgba(112, 110, 244, 0.49);
  border-radius: 5px;
`;

const SignUpButton = styled.button`
  margin-top: 30px;
  width: 250px;
  height: 45px;
  background-color: #706ef4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const RequiredMark = styled.p`
  color: red;
  display: inline-block;
  margin-right: 3px;
`;

const GenderLabel = styled.label`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

const GenderInput = styled.input`
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
    accent-color: #706ef4;
  }
`;

const GenderSpan = styled.span`
  font-size: 0.8rem;
  margin-right: auto;
  color: #333;
`;

const GenderRadioBox = styled.div`
  display: flex;
  margin-right: auto;
  align-items: center;
  gap: 230px;
`;

const CheckButton = styled.button`
  width: 80px;
  background-color: #706ef4;
  padding: 9px 5px;
  border-radius: 5px;
  color: white;
  font-size: 0.9rem;
  border: none;
  cursor: pointer;
`;

const VerificationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const VerificationContainer = styled.div`
  width: 400px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VerificationTitle = styled.h2`
  margin-bottom: 20px;
`;

const VerificationInput = styled.input`
  width: 200px;
  height: 40px;
  margin: 20px 0;
  padding: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const VerificationButton = styled.button`
  width: 100px;
  height: 40px;
  background-color: #706ef4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SignUp = () => {
  // 입력값 상태관리, 이메일은 axios사용시 합쳐서 사용할 것
  const [loginId, setLoginId] = useState("");
  const [name, setName] = useState("");
  const [emailPreffix, setEmailPreffix] = useState("");
  const [emailSuffix, setEmailSuffix] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChk, setPasswordChk] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  // 경고 및 검증 문구 관련 상태관리
  const [passwordError, setPasswordError] = useState("");
  const [passwordCheckError, setPasswordCheckError] = useState("");
  const [idError, setIdError] = useState("");
  const [passwordColor, setPasswordColor] = useState("red");
  const [passCheckColor, setPassCheckColor] = useState("red");
  const [idErrorColor, setIdErrorColor] = useState("red");

  // email select에서 option대로 suffixinput 변경해주는 함수
  const handleEmailSuffixChange = (e) => {
    const value = e.target.value;
    if (
      value === "gmail.com" ||
      value === "naver.com" ||
      value === "hanmail.com" ||
      value === "yahoo.com" ||
      value === "outlook.com" ||
      value === "daum.net"
    ) {
      setEmailSuffix(value);
    } else {
      setEmailSuffix("");
    }
  };

  // 비밀번호 정규화 확인하는 함수
  const handlePassword = (e) => {
    if (e.length === 0) {
      setPasswordError("");
    } else {
      const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*(_|[^\w])).{7,16}$/;

      if (!passwordRegex.test(e)) {
        setPasswordColor("red");
        setPasswordError(
          "8~16자 사이와 영문, 숫자, 특수문자가 포함되야 합니다."
        );
        return;
      }

      setPasswordError("사용 가능합니다.");
      setPasswordColor("green");
    }
  };

  const handlePasswordChk = (e) => {
    if (e.length === 0) {
      setPasswordCheckError("");
    } else {
      if (password !== e) {
        setPassCheckColor("red");
        setPasswordCheckError("비밀번호가 일치하지 않습니다.");
        return;
      }
      setPasswordCheckError("비밀번호가 일치합니다.");
      setPassCheckColor("green");
    }
  };

  // 입력창 빈칸 check하는 함수
  const checkForm = () => {
    if (!isIdChecked) {
      toast.error("아이디 중복확인을 해주세요.");
      return;
    }

    if (!isPhoneVerified) {
      toast.error("휴대폰 인증이 필요합니다.");
      return;
    }

    if (
      !loginId ||
      !name ||
      !emailPreffix ||
      !emailSuffix ||
      !nickname ||
      !password ||
      !passwordChk ||
      !phone ||
      !gender
    ) {
      toast.error("필수 항목이 비어 있습니다. 확인해 주세요.");
      return;
    }
    handleJoin();
  };

  // id길이 체크
  const checkIdLength = (e) => {
    let str = e;
    setIsIdChecked(false);

    if (str.length === 0) {
      setIdError("");
    } else if (str.length < 5) {
      setIdErrorColor("red");
      setIdError("5~15자 이내의 아이디만 가능합니다.");
    } else {
      setIdError("");
    }
  };

  // 아이디 중복 체크
  const checkIdDuplicate = async () => {
    if (loginId.length < 5) {
      toast.error("아이디는 5자 이상이어야 합니다.");
      return;
    }

    try {
      console.log(loginId);
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/user/idcheck",
        {
          loginId: loginId,
        }
      );
      console.log("response", response);

      if (response.status === 200) {
        toast.success("사용 가능한 아이디입니다.");
        setIsIdChecked(true);
      } else if (response.status === 400) {
        toast.error("이미 가입된 회원이 있습니다.");
        setIsIdChecked(false);
      }
    } catch (error) {
      toast.error("이미 가입된 회원이 있습니다.");
      console.error(error);
    }
  };

  // 휴대폰 번호 포맷팅
  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneLength = phoneNumber.length;

    if (phoneLength <= 3) return phoneNumber;
    if (phoneLength <= 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    if (phoneLength <= 11) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(
        3,
        7
      )}-${phoneNumber.slice(7)}`;
    }
  };

  // 휴대폰 번호 입력 핸들러
  const handlePhoneChange = (e) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  // 휴대폰 인증하기
  const handlePhoneVerification = async () => {
    if (phone.length !== 13) {
      toast.error("올바른 휴대폰 번호를 입력해주세요.");
      return;
    }
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + `/user/sms/send?phoneNumber=${phone}`
      );
      console.log("인증번호 전송", response.data);
      if (response.status === 200) {
        toast.success("인증번호가 전송되었습니다.");
        setShowVerification(true);
      }
    } catch (error) {
      toast.error("인증번호 전송에 실패했습니다.");
      console.error(error);
    }
  };

  // 인증번호 확인
  const validateVerificationCode = async () => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/user/sms/validate",
        {
          phone: phone,
          code: verificationCode,
        }
      );

      if (response.status === 200) {
        toast.success("인증이 완료되었습니다.");
        setIsPhoneVerified(true);
        setShowVerification(false);
      }
    } catch (error) {
      toast.error("인증번호가 일치하지 않습니다.");
      console.error(error);
    }
  };

  // 회원가입 axios
  const handleJoin = async () => {
    // 아이디 길이 확인
    if (loginId.length < 5) {
      toast.error("아이디는 5자~15자로 입력해주세요.");
      return;
    }

    // 아이디 영문 확인
    const idRegex = /^[a-zA-Z0-9]*$/;
    if (!idRegex.test(loginId)) {
      toast.error("아이디는 영문 및 숫자만 가능합니다.");
      return;
    }

    // 한국 이름 확인
    const nameRegex = /^[가-힣]+$/;
    if (!nameRegex.test(name)) {
      toast.error("이름은 한글만 입력해주세요.");
      return;
    }

    // 이메일 검증
    const eamilRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+$/;
    if (
      !eamilRegex.test(
        emailPreffix + "@" + emailSuffix.substring(0, emailSuffix.length - 4)
      )
    ) {
      toast.error("이메일을 확인해주세요.");
      return;
    }

    // 비밀번호, 비밀번호 확인 일치 여부
    if (password !== passwordChk) {
      toast.error("비밀번호와 비빌번호확인이 다릅니다. 확인해 주세요.");
      return;
    }

    const phoneNumber = phone.replace(/-/g, "");
    if (phoneNumber.length !== 11) {
      toast.error("핸드폰번호를 올바르게 입력해주세요");
      return;
    }

    if (!isPhoneVerified) {
      toast.error("휴대폰 인증이 필요합니다.");
      return;
    }

    const data = {
      loginId: loginId,
      name: name,
      email: emailPreffix + "@" + emailSuffix,
      nickname: nickname,
      password: password,
      phone: phone,
      gender: gender,
    };

    try {
      const response = await axios.post(
        process.env.REACT_APP_API_URL + "/user/join",
        data
      );
      if (response.status === 201) {
        console.log(data);
        console.log(response.status);
        alert("회원가입 성공");
        window.location.href = "/login";
      } else if (response.status === 400) {
        alert("회원가입 실패: 잘못된 요청입니다.");
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data;
        console.error("에러 응답:", errorMessage);
        if (errorMessage.includes("소셜")) {
          alert("이미 소셜로 가입된 회원입니다. 계정을 연동하시겠습니까?");
          const linkingData = {
            phone: phone,
            password: password,
          };
          try {
            const linkingResponse = await axios.patch(
              process.env.REACT_APP_API_URL + "/user/account/linking",
              linkingData
            );
            if (linkingResponse.status === 200) {
              alert("계정 연동 성공. 로그인 해주세요.");
              window.location.href = "/login";
            } else {
              alert("계정 연동 실패: " + linkingResponse.data);
            }
          } catch (linkingError) {
            console.error("계정 연동 실패:", linkingError.message);
            alert("계정 연동 중 오류가 발생했습니다.");
          }
        } else {
          alert("회원가입 실패: " + errorMessage);
        }
      } else {
        console.error("에러 메시지:", error.message);
      }
    }
  };

  return (
    <SignUpBox>
      <ToastContainer
        position="top-center"
        limit={1}
        closeButton={true}
        autoClose={1500}
        hideProgressBar
      />
      {showVerification && (
        <VerificationOverlay>
          <VerificationContainer>
            <VerificationTitle>인증번호 입력</VerificationTitle>
            <VerificationInput
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="인증번호를 입력하세요"
            />
            <ButtonContainer>
              <VerificationButton
                type="button"
                onClick={validateVerificationCode}
              >
                인증
              </VerificationButton>
              <VerificationButton onClick={() => setShowVerification(false)}>
                취소
              </VerificationButton>
            </ButtonContainer>
          </VerificationContainer>
        </VerificationOverlay>
      )}
      <SignUpTitle>회원정보 입력</SignUpTitle>
      <SignUpForm>
        <SignUpLabel>
          <RequiredMark>*</RequiredMark>
          <div>아이디</div>
          <div
            style={{
              color: idErrorColor,
              fontSize: "0.6rem",
              display: "flex",
              justifyContent: "end",
              width: "315px",
            }}
          >
            {idError}
          </div>
        </SignUpLabel>
        <div style={{ display: "flex", gap: "9px", alignItems: "center" }}>
          <SignUpInput
            type="text"
            minLength={5}
            maxLength={15}
            value={loginId}
            onChange={(e) => {
              setLoginId(e.target.value);
              checkIdLength(e.target.value);
            }}
            placeholder="5~15자 이내의 아이디를 입력해주세요"
            required
            style={{ width: "270px" }}
          />
          <div style={{ paddingBottom: "8px" }}>
            <CheckButton type="button" onClick={checkIdDuplicate}>
              중복확인
            </CheckButton>
          </div>
        </div>
        <SignUpLabel>
          <RequiredMark>*</RequiredMark>이메일
        </SignUpLabel>
        <div style={{ display: "flex", gap: "9px", alignItems: "center" }}>
          <SignUpInput
            type="text"
            value={emailPreffix}
            style={{ width: "100px" }}
            onChange={(e) => setEmailPreffix(e.target.value)}
            required
          />
          <div style={{ paddingBottom: "5px" }}>@</div>
          <SignUpInput
            type="text"
            value={emailSuffix}
            maxLength={12}
            style={{ width: "100px" }}
            onChange={(e) => setEmailSuffix(e.target.value)}
            required
          />
          <SignUpSelect
            type="text"
            style={{ width: "120px" }}
            onChange={handleEmailSuffixChange}
          >
            <option value="null">직접 입력</option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="hanmail.com">hanmail.com</option>
            <option value="yahoo.com">yahoo.com</option>
            <option value="outlook.com">outlook.com</option>
            <option value="daum.net">daum.net</option>
          </SignUpSelect>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <SignUpLabel>
              <RequiredMark>*</RequiredMark>이름
            </SignUpLabel>
            <SignUpInput
              type="text"
              value={name}
              style={{ width: "175px" }}
              minLength={2}
              maxLength={20}
              placeholder="한글만 입력해주세요."
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <SignUpLabel>
              <RequiredMark>*</RequiredMark>닉네임
            </SignUpLabel>
            <SignUpInput
              type="text"
              value={nickname}
              style={{ width: "175px" }}
              placeholder="1~10자 이내의 닉네임"
              maxLength={10}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
        </div>
        <SignUpLabel>
          <RequiredMark>*</RequiredMark>휴대폰 번호
        </SignUpLabel>
        <div style={{ display: "flex", gap: "9px", alignItems: "center" }}>
          <SignUpInput
            type="text"
            value={phone}
            maxLength={13}
            placeholder="010-0000-0000"
            style={{ width: "270px" }}
            required
            onChange={handlePhoneChange}
          />
          <div style={{ paddingBottom: "8px" }}>
            <CheckButton
              type="button"
              onClick={handlePhoneVerification}
              style={{
                backgroundColor: isPhoneVerified ? "#ffd6d3" : "#706ef4",
              }}
            >
              {isPhoneVerified ? "인증완료" : "인증하기"}
            </CheckButton>
          </div>
        </div>
        <SignUpLabel>
          <RequiredMark>*</RequiredMark>비밀번호
          <div
            style={{
              color: passwordColor,
              fontSize: "0.6rem",
              display: "inline-block",
              display: "flex",
              justifyContent: "end",
              width: "303px",
            }}
          >
            {passwordError}
          </div>
        </SignUpLabel>
        <SignUpInput
          type="password"
          value={password}
          placeholder="8~16자 이내의 특수문자, 영문, 숫자를 포함시켜주세요"
          onChange={(e) => {
            setPassword(e.target.value);
            handlePassword(e.target.value);
          }}
        />
        <SignUpLabel>
          <RequiredMark>*</RequiredMark>비밀번호 확인
          <div
            style={{
              color: passCheckColor,
              fontSize: "0.6rem",
              display: "inline-block",
              display: "flex",
              justifyContent: "end",
              width: "275px",
            }}
          >
            {passwordCheckError}
          </div>
        </SignUpLabel>
        <SignUpInput
          type="password"
          value={passwordChk}
          onChange={(e) => {
            setPasswordChk(e.target.value);
            handlePasswordChk(e.target.value);
          }}
        />
        <GenderRadioBox style={{ marginTop: "10px" }}>
          <SignUpLabel>
            <RequiredMark>*</RequiredMark>성별
          </SignUpLabel>
          <div style={{ display: "flex" }}>
            <div>
              <GenderInput
                type="radio"
                name="gender"
                value="M"
                checked={gender === "M"}
                onChange={() => setGender("M")}
              />
            </div>
            <GenderSpan style={{ marginRight: "10px" }}>남성</GenderSpan>
            <div>
              <GenderInput
                type="radio"
                name="gender"
                value="F"
                checked={gender === "F"}
                onChange={() => setGender("F")}
              />
            </div>
            <GenderSpan>여성</GenderSpan>
          </div>
        </GenderRadioBox>
        <SignUpButton
          onClick={(e) => {
            e.preventDefault();
            checkForm();
          }}
        >
          회원가입
        </SignUpButton>
      </SignUpForm>
    </SignUpBox>
  );
};

export default SignUp;
