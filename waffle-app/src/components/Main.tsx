import axios from 'axios';
import { useRouter } from 'next/router';
import React, { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';

const Main = () => {
  const router = useRouter();
  const [bool, setBool] = useState(false);

  const [id, setId] = useState<string>('');
  const [pass, setPass] = useState<string>('');

  const onchange = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const onchangepass = (event: ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  const onsubmit = () => {
    const login = async () => {
      const response = await axios
        .post('/api/main', {
          memberId: id,
          password: pass,
        })
        .then((responses) => {
          const setlocal = () => {
            localStorage.removeItem('logintoken');
            localStorage.setItem('logintoken', responses.data.accessToken);
          };
          setlocal();
        });
    };
    alert(login());
  };

  return (
    <>
      <form onSubmit={onsubmit} action="/Admin">
        <input type="text" onChange={onchange}></input>
        <input type="text" onChange={onchangepass}></input>
        <button type="submit">temp</button>
      </form>
    </>
  );
};

export default Main;
