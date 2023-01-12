//관리자 페이지 구현
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';
import React from 'react';
import { useRouter } from 'next/router';
import { list, fine } from '../../constants';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function DarkTable() {
  // 데이터 셀 클릭시

  const router = useRouter();

  const [data, setalldata] = useState<list[]>([]);
  const init = (datas: list[]) => {
    datas.forEach((eachdata) => {
      setalldata([...data, eachdata]);
    });
  };
  useEffect(() => {
    adminget();
  }, []);

  const onClick = (row: list) => {
    router.push(
      {
        pathname: 'Admin/list',
        query: { id: row.memberId, name: row.nickname, part: row.part },
      },
      'detail'
    );
  };

  const adminget = async () => {
    const headerstr =
      'Bearer ' + localStorage.getItem('logintoken')?.replace(/\"/gi, '');
    await axios
      .get('/api/admin', {
        headers: {
          Authorization: headerstr,
        },
      })
      .then((res) => setalldata(res.data))
      .catch((e) => router.push('/Member'));
  };

  return (
    <>
      <StyledtableBody>
        <BootstrapTable
          data={data}
          hover={true}
          searchPlaceholder="이름이나 역할을 검색해주세요"
          pagination
          search
          bodyStyle={{ color: '#ffd58b' }}
          headerStyle={{ color: '#ffd58b' }}
          trStyle={{ cursor: 'pointer' }}
          options={{
            onRowClick: onClick,
          }}
        >
          <TableHeaderColumn
            dataField="memberId"
            isKey={true}
            dataAlign="center"
            dataSort={true}
            thStyle={{
              cursor: 'pointer',
              background: '#343a40',
              color: 'white',
            }}
          >
            아이디
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="nickname"
            dataAlign="center"
            dataSort={true}
            thStyle={{
              cursor: 'pointer',
              background: '#343a40',
              color: 'white',
            }}
          >
            이름
          </TableHeaderColumn>
          <TableHeaderColumn
            dataField="part"
            dataAlign="center"
            dataSort={true}
            thStyle={{
              cursor: 'pointer',
              background: '#343a40',
              color: 'white',
            }}
          >
            파트
          </TableHeaderColumn>
        </BootstrapTable>
      </StyledtableBody>
    </>
  );
}

const StyledtableBody = styled.div`
  width: 50%;
  margin: 2% auto;
  gap: 10px;
  flex-direction: column;
  display: flex;
  background: white;
  color: #ffd58b;
`;
