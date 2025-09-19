import React, { useState } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const students = JSON.parse(localStorage.getItem("students")) || [];
    
    const student = students.find(
      (s) =>
        s.email.toLowerCase().trim() === email.toLowerCase().trim() &&
        s.password === password
    );

    if (student) {
      localStorage.setItem("studentLoggedIn", true);
      localStorage.setItem("student", JSON.stringify(student));
      navigate("/student-dashboard");
    } else {
      alert("❌ Invalid email or password!");
    }
  };

  return (
    <Container fluid className="vh-100 d-flex justify-content-center align-items-center bg-light">
      <Row>
        <Col>
          <Card className="shadow-lg p-4" style={{ minWidth: "350px", maxWidth: "450px" }}>
            <Card.Body>
              <h2 className="text-center mb-4 text-primary">👩‍🎓 Student Login</h2>
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-2 fw-bold"
                >
                  Login
                </Button>
              </Form>
            </Card.Body>
            <Card.Footer className="text-center text-muted mt-2">
              Forgot password? Contact your teacher.
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default StudentLogin;
