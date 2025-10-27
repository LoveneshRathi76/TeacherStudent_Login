import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AppNavbar.css";

function AppNavbar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={handleClose}>
          Student Portal
        </Navbar.Brand>

        <Navbar.Toggle onClick={handleShow} />
        <Navbar.Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          className="custom-offcanvas"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="ms-auto text-center text-lg-start">
              <Nav.Link as={Link} to="/" onClick={handleClose}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" onClick={handleClose}>
                Contact
              </Nav.Link>
              <Nav.Link as={Link} to="/achievers" onClick={handleClose}>
                Achievers
              </Nav.Link>

              <NavDropdown title="Login" id="login-dropdown">
                <NavDropdown.Item as={Link} to="/teacher-login" onClick={handleClose}>
                  Teacher Login
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/student-login" onClick={handleClose}>
                  Student Login
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;
