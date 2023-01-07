import React, { ChangeEvent, FormEvent, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useRouter } from 'next/router';

const LoginBox = () => {
  const router = useRouter();
  //  아이디 변수
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');

  const handleInputId = (e: ChangeEvent<HTMLInputElement>) => {
    setInputId(e.target.value);
  };
  const handleInputPw = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPw(e.target.value);
  };

  // request
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push({ pathname: '/Logincheck', query: { id: inputId, pw: inputPw } });
  };

  return (
    <>
      <Container onSubmit={onSubmit}>
        <h1>Waffle</h1>
        <Input type='id' name='id' value={inputId} onChange={handleInputId} placeholder='아이디를 입력해주세요' />
        <Input type='password' name='pw' value={inputPw} onChange={handleInputPw} placeholder='비밀번호를 입력해주세요' />
        <Button type='submit'>log in</Button>
      </Container>
    </>
  );
};

export default LoginBox;

const Container = styled.form`
  margin-top: 100px;
  padding: 20px;
  width: 300px;
`;

const Input = styled.input`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px;
  margin: 0 0 8px;
  padding: 5px 39px 5px 11px;
  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
`;

const Button = styled.button`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 16px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0;
  background-color: #bbad79;
`;
