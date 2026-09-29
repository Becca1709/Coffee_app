import { Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router";
import ReactDOM from "react-dom";
import { useRef } from "react";

export function NavBar({ menu }) {
  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">Office Coffee</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link onClick={menu}>Menu</Nav.Link>
            <Nav.Link>About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
