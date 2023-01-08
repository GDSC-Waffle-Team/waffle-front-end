import axios from 'axios';
import React, { ChangeEvent, MouseEvent, FormEvent } from 'react';
import { useState, useEffect } from 'react';

const Apitest = () => {
  const onClick = async () => {
    if (localStorage.getItem('logintoken') === undefined) {
      return;
    }
    alert(localStorage.getItem('logintoken'));

    const memberget = async () => {
      await axios
        .get(`/api/member`, {
          headers: {
            Authorization: 'Bearer' + localStorage.getItem('logintoken'),
          },
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
    };
    memberget();
  };
  const [id, setId] = useState<string>('');
  const onchange = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const [pass, setPass] = useState<string>('');
  const [token, settoken] = useState<string>('');
  const onchangepass = (event: ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  const onsubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const login = async () => {
      const response = await axios
        .post('/api/main', {
          memberId: id,
          password: pass,
        })
        .then((responses) => {
          alert(responses.data.accessToken);
          if (
            responses.data.accessToken &&
            localStorage.getItem('logintoken') !== 'undefined'
          ) {
            localStorage.setItem(
              'logintoken',
              JSON.stringify(responses.data.accessToken)
            );
          }
        })
        .catch((e) => alert(e));
      //hyesungoh
    };
    alert(login());
  };
  return (
    <div>
      <form onSubmit={onsubmit}>
        <input type="text" onChange={onchange}></input>
        <input type="text" onChange={onchangepass}></input>
        <button type="submit">temp</button>
      </form>
      <button onClick={onClick}>불러오기</button>
    </div>
  );
};

export default Apitest;
