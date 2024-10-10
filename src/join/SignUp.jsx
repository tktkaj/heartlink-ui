import React, { useState } from 'react'
import styled from 'styled-components'
import { toast, ToastContainer} from 'react-toastify';

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

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [emailPreffix, setEmailPreffix] = useState('');
  const [emailSuffix, setEmailSuffix] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordChk, setPasswordChk] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [idError, setIdError] = useState('');
  const [errorColor, setErrorColor] = useState('red');
  const [idErrorColor, setIdErrorColor] = useState('red');


  // email select에서 option대로 suffixinput 변경해주는 함수
  const handleEmailSuffixChange = (e) => {
    const value = e.target.value;
    if (value === 'gmail.com' || value === 'naver.com' || value === 'hanmail.com' || value === 'yahoo.com'|| value === 'outlook.com'|| value === 'daum.net') {
      setEmailSuffix(value);
    } else {
      setEmailSuffix('');
    }
  }
  
  // 비밀번호 정규화 확인하는 함수
  const handlePassword = (e) => {

    if(e){
      const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*(_|[^\w])).{7,16}$/;

      if (!passwordRegex.test(e)) {
        setErrorColor('red');
        setPasswordError('8~16자 사이의 영문, 숫자, 특수문자가 포함된 비밀번호만 사용 가능합니다.');
        return;
      }
  
      setPasswordError('사용 가능합니다.');
      setErrorColor('green');
    }

  }

  const handlePasswordChk = (e) => {

    if(e){
      if (password !== e) {
        setErrorColor('red');
        setPasswordError('비밀번호가 일치하지 않습니다.');
        console.log(passwordChk);
        return;
      }
      setPasswordError('비밀번호가 일치합니다');
      setErrorColor('green');
    }

  }

  // 입력창 빈칸 check하는 함수
  const checkForm = () => {
    if (!id || !name || !emailPreffix || !emailSuffix || !nickname || !password || !passwordChk || !birth || !gender) {
      toast.error('필수 항목이 비어 있습니다. 확인해 주세요.');
      return;
    }
  }

  // id길이 체크
  const checkIdLength = () =>{

    if(id.length < 4){
      setIdErrorColor('red');
      setIdError('5~15자 이내의 아이디만 가능합니다.');
    }
    else{
      setIdErrorColor('green');
      setIdError('사용가능한 아이디입니다.');
    }
  }

  return (
    <SignUpBox>
      <ToastContainer
                position="top-center"
                limit={1}
                closeButton={true}
                hideProgressBar
            />
      <SignUpTitle>회원정보 입력</SignUpTitle>
      <SignUpForm>
        <SignUpLabel><RequiredMark>*</RequiredMark>아이디<div style={{ color: idErrorColor, fontSize: '0.6rem', display:'inline-block', paddingLeft: '150px'}}>{idError}</div></SignUpLabel>
        <SignUpInput type="text" minLength={5} maxLength={15} value={id} onChange={(e) => {setId(e.target.value);checkIdLength(e.target.value)}} placeholder="5~15자 이내의 아이디를 입력해주세요" required/>
        <SignUpLabel><RequiredMark>*</RequiredMark>이메일</SignUpLabel>
        <div style={{display:'flex', gap:'9px', alignItems: 'center'}}>
          <SignUpInput type="text" value={emailPreffix} style={{width:'100px'}} onChange={(e) => setEmailPreffix(e.target.value)} required/>
          <div style={{paddingBottom:'5px'}}>@</div>
          <SignUpInput type="text" value={emailSuffix} style={{width:'100px'}} onChange={(e) => setEmailSuffix(e.target.value)} required/>
          <SignUpSelect type="text"  style={{width:'120px'}} onChange={handleEmailSuffixChange}>
            <option value="null">직접 입력</option>
            <option value="gmail.com">gmail.com</option>
            <option value="naver.com">naver.com</option>
            <option value="hanmail.com">hanmail.com</option>
            <option value="yahoo.com">yahoo.com</option>
            <option value="outlook.com">outlook.com</option>
            <option value="daum.net">daum.net</option>
          </SignUpSelect>
        </div>
        <div style={{display: 'flex', gap:'10px'}}>
          <div style={{display: 'flex', flexDirection:'column'}}>
        <SignUpLabel><RequiredMark>*</RequiredMark>이름</SignUpLabel>
        <SignUpInput type="text" value={name} style={{width: '175px'}} onChange={(e) => setName(e.target.value)} />
        </div>
        <div style={{display: 'flex', flexDirection:'column'}}>
        <SignUpLabel><RequiredMark>*</RequiredMark>닉네임</SignUpLabel>
        <SignUpInput type="text" value={nickname} style={{width: '175px'}} placeholder="1~10자 이내의 닉네임" maxLength={10}  onChange={(e) => setNickname(e.target.value)} />
        </div>
        </div>
        <SignUpLabel><RequiredMark>*</RequiredMark>휴대폰 번호</SignUpLabel>
        <div style={{display:'flex', gap:'9px', alignItems: 'center'}}>
        <SignUpInput type="text" value={birth} style={{width: '270px'}} onChange={(e) => setBirth(e.target.value)} />
          <div style={{paddingBottom:'8px'}}>
          <button type='button' style={{width: '80px', backgroundColor: '#706EF4', padding: '9px 5px', borderRadius:'5px',  color: 'white', fontSize: '0.9rem'}}>인증하기</button>
          </div>
        </div>
        <SignUpLabel><RequiredMark>*</RequiredMark>비밀번호<div style={{ color: errorColor, fontSize: '0.6rem', display: 'inline-block'}}>{passwordError}</div></SignUpLabel>
        {/* 정규식 검증 통과 못할 시 에러나오는 곳 */}
        <SignUpInput type="password" value={password} placeholder="8~16자 이내의 특수문자, 영문, 숫자를 포함시켜주세요" onChange={(e) => {setPassword(e.target.value);handlePassword(e.target.value)}} />   
        <SignUpLabel><RequiredMark>*</RequiredMark>비밀번호 확인</SignUpLabel>
        <SignUpInput type="password" value={passwordChk} onChange={(e) => {setPasswordChk(e.target.value);handlePasswordChk(e.target.value)}}/>
        <GenderRadioBox style={{marginTop:'10px'}}>
        <SignUpLabel><RequiredMark>*</RequiredMark>성별</SignUpLabel>
          <div style={{display: 'flex'}}>
            <div>
            <GenderInput type="radio" name="gender" value="male" checked={gender === 'male'} onChange={() => setGender('male')} />
            </div>
            <GenderSpan style={{marginRight: '10px'}}>남성</GenderSpan>
            <div>
            <GenderInput type="radio" name="gender" value="female" checked={gender === 'female'} onChange={() => setGender('female')} />
            </div>
            <GenderSpan>여성</GenderSpan>
          </div>
        </GenderRadioBox>
        <SignUpButton onClick={(e) => {e.preventDefault(); checkForm(); handlePassword();checkIdLength();}}>회원가입</SignUpButton>
      </SignUpForm>
    </SignUpBox>
  )
}

export default SignUp;
