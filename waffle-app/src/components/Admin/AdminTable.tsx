//관리자 페이지 구현
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import mockdata from '../../api/Admin/mockdata';
import styled from 'styled-components';
import React from 'react';
import { useRouter } from 'next/router';

export default function DarkTable() {
  // 데이터 셀 클릭시
  const router = useRouter();

  const onclick = (event: React.MouseEvent) => {
    router.push(
      {
        pathname: 'Admin/list',
        query: {
          name: event.name,
          role: event.role,
          emailAddress: event.email,
        },
      },
      'Admin/list'
    );
  };

  return (
    <>
      <StyledtableBody>
        <BootstrapTable
          data={mockdata}
          hover={true}
          striped
          searchPlaceholder="이름이나 역할을 검색해주세요"
          condensed
          pagination
          options={{
            onRowClick: onclick,
          }}
          search
          bodyStyle={{ color: '#ffd58b' }}
          headerStyle={{ color: '#ffd58b' }}
          trStyle={{ cursor: 'pointer' }}
        >
          <TableHeaderColumn
            dataField="role"
            dataAlign="center"
            thStyle={{
              cursor: 'pointer',
              background: '#343a40;',
              color: 'white',
            }}
          >
            역할
          </TableHeaderColumn>
          <TableHeaderColumn
            thStyle={{
              cursor: 'pointer',
              background: '#343a40',
              color: 'white',
            }}
            dataField="name"
            dataSort
            isKey
            dataAlign="center"
          >
            이름
          </TableHeaderColumn>
          <TableHeaderColumn
            thStyle={{
              cursor: 'pointer',
              background: '#343a40;',
              color: 'white',
            }}
            dataField="email"
            dataAlign="center"
          >
            이메일주소
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