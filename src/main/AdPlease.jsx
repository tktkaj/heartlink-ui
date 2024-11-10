import React, { useState } from "react";
import styled from "styled-components";

const AdPleaseContainer = styled.div`
  width: 21vw;
  padding: 13px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 13px;
  h1 {
    font-size: 19px;
    margin-bottom: 1px;
  }
  button {
    font-size: 14px;
    color: blue;
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  width: 400px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  input,
  textarea {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  button {
    padding: 10px;
    background: #706ef4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background: #5e5cd4;
    }
  }
`;

export default function AdPlease() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    business: "",
    details: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setIsModalOpen(false);
    setFormData({
      name: "",
      phone: "",
      business: "",
      details: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <AdPleaseContainer>
        <h1>
          광고 협업을 원하신다면,
          <br /> 지금 문의하세요!
        </h1>
        더 큰 효과를 창출할 수 있는 기회를 놓치지 마세요.
        <br />
        <button onClick={() => setIsModalOpen(true)}>문의하기 &gt;</button>
      </AdPleaseContainer>

      {isModalOpen && (
        <>
          <Overlay onClick={() => setIsModalOpen(false)} />
          <Modal>
            <Form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="이름"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="전화번호"
                value={formData.phone}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="business"
                placeholder="업종"
                value={formData.business}
                onChange={handleChange}
                required
              />
              <textarea
                name="details"
                placeholder="상세내용"
                value={formData.details}
                onChange={handleChange}
                rows="4"
                required
              />
              <button type="submit">제출하기</button>
            </Form>
          </Modal>
        </>
      )}
    </>
  );
}
