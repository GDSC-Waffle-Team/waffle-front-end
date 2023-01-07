import { Navbar, Nav } from 'react-bootstrap';

export default function AdminNav() {
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">관리자 계정</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/">홈</Nav.Link>
        </Nav>
      </Navbar>
    </header>
  );
}
