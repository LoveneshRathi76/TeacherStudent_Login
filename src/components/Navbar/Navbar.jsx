import { Navbar, Nav, NavDropdown, Container, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";


function AppNavbar() {
  return (
    <>
      {["lg"].map((expand) => (
        <Navbar key={expand} bg="dark" variant="dark" expand={expand} fixed="top">
          <Container>
            <Navbar.Brand as={Link} to="/">Student Portal</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"   // right side se open hoga
              className="custom-offcanvas" // 👈 apna class diya
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="ms-auto">
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                  <Nav.Link as={Link} to="/achievers">Achievers</Nav.Link>
                  <NavDropdown title="Login" id="login-dropdown">
                    <NavDropdown.Item as={Link} to="/teacher-login">
                      Teacher Login
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/student-login">
                      Student Login
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default AppNavbar;
