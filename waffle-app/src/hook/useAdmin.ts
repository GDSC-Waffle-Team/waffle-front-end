import { useState } from 'react';
import { data } from '../constants';
import mockdata from '../api/Admin/mockdata';
//모든 멤버 정보를 저장 할 배열

const useAdmin = () => {
  const [alluser, setallUser] = useState<data[]>(mockdata);

  //선택된 멤버 이름
  const [user, setUser] = useState<string>('');

  //선택된 멤버 역할
  const [role, setRole] = useState<string>('');

  //선택된 멤버 이메일
  const [email, setemail] = useState<string>('');

  return { alluser, setallUser, user, setUser, role, setRole, email, setemail };
};

export default useAdmin;
