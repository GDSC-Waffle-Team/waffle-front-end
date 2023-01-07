//관리자 페이지 구현

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import mockdata from '../../api/Admin/mockdata';
import styled from 'styled-components';
import { Navbar, Nav } from 'react-bootstrap';
export default function DarkTable() {
  return (
    <>
      <div>
        <header>
          <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">관리자 계정</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">홈</Nav.Link>
            </Nav>
          </Navbar>
        </header>
      </div>
      <StyledtableBody>
        <BootstrapTable
          data={mockdata}
          hover={true}
          striped
          searchPlaceholder="이름이나 역할을 검색해주세요"
          condensed
          pagination
          search
          bodyStyle={{ color: '#ffd58b' }}
          headerStyle={{ color: '#ffd58b' }}
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
