import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import swal from 'sweetalert';
import { useRouter } from 'next/router';
const Main = () => {
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
    const login = async () => {
      const response = await axios
        .post('http://waffle2.duckdns.org/main', {
          memberId: inputId,
          password: inputPw,
        })
        .then((response) => {
          localStorage.setItem('logintoken', response.data.accessToken);
        });
    };

    login()
      .then(() => {
        swal('로그인 되었습니다!');
        router.push('/Admin');
      })
      .catch(() => swal('정보를 다시 입력해주세요'));

    // 확인용 alert
  };

  return (
    <>
      <ContainerForm onSubmit={onSubmit}>
        <Styledh1>Waffle</Styledh1>
        <Loginbox>
          <Boxcontent>
            <Input
              value={inputId}
              onChange={handleInputId}
              placeholder="아이디를 입력하세요"
            />
            <Input
              value={inputPw}
              onChange={handleInputPw}
              placeholder="비밀번호를 입력하세요"
            />
          </Boxcontent>
          <Boxcontent>
            <Button type="submit">
              <Span>Login</Span>
            </Button>
          </Boxcontent>
        </Loginbox>
      </ContainerForm>
    </>
  );
};

const Boxcontent = styled.div`
  display: inline-block;
`;

const Loginbox = styled.div`
  display: flex;
`;
const Styledh1 = styled.h1`
  display: flex;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #858585;
`;
const ContainerForm = styled.form`
  margin: 100px auto;
  padding: 20px;
  width: 400px;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 250px;
  height: 45px;
  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
  margin-bottom: 18px;
  padding-left: 10px;
  border-radius: 10px;
  transition: all 0.3s;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  :hover {
    background-color: #ffd58b;
  }
`;
const Span = styled.div``;
const Button = styled.button`
  font-size: 24px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  width: 126px;
  height: 108px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 20px;
  background-color: #3b4047;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  ${Span}:hover {
    transform: translateY(-3px);
    transition: all 0.3s;
    color: #ffd58b;
  }
`;

export default Main;
