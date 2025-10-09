import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TeacherLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ------------------ Backend-connected login ------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Login request
      const response = await fetch("http://localhost:5000/api/teacher/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        // Login success
        localStorage.setItem("teacherLoggedIn", "true");
        localStorage.setItem("teacher", JSON.stringify(data.teacher));
        navigate("/teacher-dashboard"); // Redirect to dashboard
      } else {
        // Login failed
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <Card className="p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center mb-4">👨‍🏫 Teacher Login</h2>
        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">Login</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default TeacherLogin;
