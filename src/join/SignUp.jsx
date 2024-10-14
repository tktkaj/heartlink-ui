import React, { useState } from 'react'
import styled from 'styled-components'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'

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

`

const SignUpTitle = styled.div`
  font-size: 1.8rem;
  margin-bottom: 20px;
`

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const SignUpLabel = styled.label`
  font-size: 0.8rem;
  margin-bottom: 5px;
  margin-right: auto;
  display: flex;

`

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
`
const SignUpSelect = styled.select`
  width: 350px;
  height: 40px;
  font-size: 0.8rem;
  margin-bottom: 8px;
  padding: 10px;
  border: 0.15rem solid rgba(112, 110, 244, 0.49);
  border-radius: 5px;

`

const SignUpButton = styled.button`
  margin-top: 30px;
  width: 250px;
  height: 45px;
  background-color: #706EF4;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`

const RequiredMark = styled.p`
    color: red;
    display: inline-block;
    margin-right: 3px;
`;

const GenderLabel = styled.label`
  display: flex;
  align-items: center;
  margin-top: 15px;
`

const GenderInput = styled.input`
  margin-right: 5px;
  width: 0.8rem;
  height: 0.8rem; 
  border-radius: 10px;
  cursor: pointer;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: #706EF4;
  }
  &:checked {
    accent-color: #706EF4; 
  }
`

const GenderSpan = styled.span`
  font-size: 0.8rem;
  margin-right: auto;
  color: #333;
`

const GenderRadioBox = styled.div`
  display: flex;
  margin-right: auto;
  align-items: center;
  gap: 230px;
`

const SignUp = () => {

  // 입력값 상태관리, 이메일은 axios사용시 합쳐서 사용할 것
  const [loginId, setLoginId] = useState('');
  const [name, setName] = useState('');
  const [emailPreffix, setEmailPreffix] = useState('');
  const [emailSuffix, setEmailSuffix] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordChk, setPasswordChk] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');

  // 경고 및 검증 문구 관련 상태관리
  const [passwordError, setPasswordError] = useState('');
  const [passwordCheckError, setPasswordCheckError] = useState('');
  const [idError, setIdError] = useState('');
  const [passwordColor, setPasswordColor] = useState('red');
  const [passCheckColor, setPassCheckColor] = useState('red');
  const [idErrorColor, setIdErrorColor] = useState('red');


  // email select에서 option대로 suffixinput 변경해주는 함수
  const handleEmailSuffixChange = (e) => {
    const value = e.target.value;
    if (value === 'gmail.com' || value === 'naver.com' || value === 'hanmail.com' || value === 'yahoo.com' || value === 'outlook.com' || value === 'daum.net') {
      setEmailSuffix(value);
    } else {
      setEmailSuffix('');
    }
  }

  // 비밀번호 정규화 확인하는 함수
  const handlePassword = (e) => {

    if (e.length === 0) {
      setPasswordError('');
    }
    else {
      const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*(_|[^\w])).{7,16}$/;

      if (!passwordRegex.test(e)) {
        setPasswordColor('red');
        setPasswordError('8~16자 사이와 영문, 숫자, 특수문자가 포함되야 합니다.');
        return;
      }

      setPasswordError('사용 가능합니다.');
      setPasswordColor('green');

    }
   

  }

  const handlePasswordChk = (e) => {

    if (e.length === 0) {
      setPasswordCheckError('');
    }
    else {

      if (password !== e) {
        setPassCheckColor('red');
        setPasswordCheckError('비밀번호가 일치하지 않습니다.');
        return;
      }
      setPasswordCheckError('비밀번호가 일치합니다.');
      setPassCheckColor('green');
    }
  }

  // 입력창 빈칸 check하는 함수
  const checkForm = () => {
    if (!loginId || !name || !emailPreffix || !emailSuffix || !nickname || !password || !passwordChk || !phone || !gender) {
      toast.error('필수 항목이 비어 있습니다. 확인해 주세요.');
      return;
    }
    handleLogin();
  }

  // id길이 체크
  const checkIdLength = (e) => {
    let str = e;

    if (str.length === 0) {
      setIdError('');
    }
    else if (str.length < 5) {
      setIdErrorColor('red');
      setIdError('5~15자 이내의 아이디만 가능합니다.');
    }
    else {
      setIdError('');
    }
  }



  // 회원가입 axios
  const handleLogin = async () => {


    // 아이디 길이 확인
    if (loginId.length < 5) {
      toast.error('아이디는 5자~15자로 입력해주세요.');
      return;
    }

    // 아이디 영문 확인
    const idRegex =  /^[a-zA-Z0-9]*$/;
    if(!idRegex.test(loginId)){
      toast.error('아이디는 영문만 가능합니다.');
      return;
    }

    // 한국 이름 확인
    const nameRegex = /^[가-힣]+$/
    if (!nameRegex.test(name)) {
      toast.error('이름은 한글만 입력해주세요.');
      return;
    }

    // 이메일 검증
    const eamilRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+$/;
    if(!eamilRegex.test(emailPreffix + '@' + emailSuffix.substring(0,emailSuffix.length-4))){
      toast.error('이메일을 확인해주세요.');
      return;
    }

    // 비밀번호, 비밀번호 확인 일치 여부
    if (password !== passwordChk) {
      toast.error('비밀번호와 비빌번호확인이 다릅니다. 확인해 주세요.');
      return;
    }

    if(phone.length!=11){
      toast.error('핸드폰번호를 올바르게 입력해주세요');
      return;
    }

    const data = {
      loginId: loginId,
      name: name,
      email: emailPreffix + '@' + emailSuffix,
      nickname: nickname,
      password: password,
      phone: phone,
      gender: gender
    };

    try {
      const response = await axios.post('https://virtserver.swaggerhub.com/HEEMAN109/HeartLink/1.0.0/user/join', data);
      if (response.status === 201) {
        console.log(data);
        console.log(response.status);
        alert('join successful');
      }
      else if (response.status === 400) {
        alert('join denied');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert('join failed: ' + error.response.data);
      } else {
        console.error('Error message:', error.message);
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
      <SignUpTitle>회원정보 입력</SignUpTitle>
      <SignUpForm>
        <SignUpLabel><RequiredMark>*</RequiredMark><div>아이디</div><div style={{ color: idErrorColor, fontSize: '0.6rem', display: 'flex', justifyContent: 'end', width: '315px' }}>{idError}</div></SignUpLabel>
        <SignUpInput type="text" minLength={5} maxLength={15} value={loginId} onChange={(e) => { setLoginId(e.target.value); checkIdLength(e.target.value) }} placeholder="5~15자 이내의 아이디를 입력해주세요" required />
        <SignUpLabel><RequiredMark>*</RequiredMark>이메일</SignUpLabel>
        <div style={{ display: 'flex', gap: '9px', alignItems: 'center' }}>
          <SignUpInput type="text" value={emailPreffix} style={{ width: '100px' }} onChange={(e) => setEmailPreffix(e.target.value)} required />
          <div style={{ paddingBottom: '5px' }}>@</div>
          <SignUpInput type="text" value={emailSuffix} maxLength={12} style={{ width: '100px' }} onChange={(e) => setEmailSuffix(e.target.value)} required />
          <SignUpSelect type="text" style={{ width: '120px' }} onChange={handleEmailSuffixChange}>
            <option value="null">직접 입력</option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="hanmail.com">hanmail.com</option>
            <option value="yahoo.com">yahoo.com</option>
            <option value="outlook.com">outlook.com</option>
            <option value="daum.net">daum.net</option>
          </SignUpSelect>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SignUpLabel><RequiredMark>*</RequiredMark>이름</SignUpLabel>
            <SignUpInput type="text" value={name} style={{ width: '175px' }} minLength={2} placeholder="한글만 입력해주세요." onChange={(e) => setName(e.target.value)} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <SignUpLabel><RequiredMark>*</RequiredMark>닉네임</SignUpLabel>
            <SignUpInput type="text" value={nickname} style={{ width: '175px' }} placeholder="1~10자 이내의 닉네임" maxLength={10} onChange={(e) => setNickname(e.target.value)} />
          </div>
        </div>
        <SignUpLabel><RequiredMark>*</RequiredMark>휴대폰 번호</SignUpLabel>
        <div style={{ display: 'flex', gap: '9px', alignItems: 'center' }}>
          <SignUpInput type="text" value={phone} maxLength={11} placeholder="숫자만 입력해주세요." style={{ width: '270px' }} onChange={(e) => setPhone(e.target.value)} />
          <div style={{ paddingBottom: '8px' }}>
            <button type='button' style={{ width: '80px', backgroundColor: '#706EF4', padding: '9px 5px', borderRadius: '5px', color: 'white', fontSize: '0.9rem' }}>인증하기</button>
          </div>
        </div>
        <SignUpLabel><RequiredMark>*</RequiredMark>비밀번호<div style={{ color: passwordColor, fontSize: '0.6rem', display: 'inline-block', display: 'flex', justifyContent: 'end', width: '303px' }}>{passwordError}</div></SignUpLabel>
        {/* 정규식 검증 통과 못할 시 에러나오는 곳 */}
        <SignUpInput type="password" value={password} placeholder="8~16자 이내의 특수문자, 영문, 숫자를 포함시켜주세요" onChange={(e) => { setPassword(e.target.value); handlePassword(e.target.value); }} />
        <SignUpLabel><RequiredMark>*</RequiredMark>비밀번호 확인<div style={{ color: passCheckColor, fontSize: '0.6rem', display: 'inline-block', display: 'flex', justifyContent: 'end', width: '275px' }}>{passwordCheckError}</div></SignUpLabel>
        <SignUpInput type="password" value={passwordChk} onChange={(e) => { setPasswordChk(e.target.value); handlePasswordChk(e.target.value) }} />
        <GenderRadioBox style={{ marginTop: '10px' }}>
          <SignUpLabel><RequiredMark>*</RequiredMark>성별</SignUpLabel>
          <div style={{ display: 'flex' }}>
            <div>
              <GenderInput type="radio" name="gender" value="M" checked={gender === 'M'} onChange={() => setGender('M')} />
            </div>
            <GenderSpan style={{ marginRight: '10px' }}>남성</GenderSpan>
            <div>
              <GenderInput type="radio" name="gender" value="F" checked={gender === 'F'} onChange={() => setGender('F')} />
            </div>
            <GenderSpan>여성</GenderSpan>
          </div>
        </GenderRadioBox>
        <SignUpButton onClick={(e) => { e.preventDefault();checkForm();}}>회원가입</SignUpButton>
      </SignUpForm>
    </SignUpBox>
  )
}

export default SignUp;
