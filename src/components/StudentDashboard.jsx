import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Table, Card, Row, Col } from "react-bootstrap";

function StudentDashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("studentLoggedIn");
    if (!loggedIn) {
      navigate("/student-login");
    } else {
      const s = JSON.parse(localStorage.getItem("student"));
      setStudent(s);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("studentLoggedIn");
    localStorage.removeItem("student");
    navigate("/student-login");
  };

  if (!student) {
    return <h3 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h3>;
  }

  return (
    <Container className="mt-5 mb-5 p-4">
      
      {/* Greeting + Photo Section */}
      <Card className="shadow-lg mb-4 p-4">
        <Row className="align-items-center">
          <Col md="auto">
            {student.photo && (
              <img
                src={student.photo}
                style={{
                  width: "200px",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  marginBottom: "10px"
                }}
                alt="Student"
              />
            )}
          </Col>
          <Col className="d-flex flex-column justify-content-center">
            <h1 className="text-primary">Hello, {student.name} 👋</h1>
            <p className="text-muted mb-1">Welcome to your Student Dashboard</p>
            <p className="mb-1">
              <strong>Class:</strong> {student.class}
            </p>
            <p className="mb-1">
              <strong>Father's Name:</strong> {student.fatherName}
            </p>
            <Button variant="danger" onClick={handleLogout} className="mt-2">
              🚪 Logout
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Marks & Attendance Table */}
      <Card className="shadow-sm">
        <Card.Header className="bg-info text-white">
          📋 Your Marks & Attendance
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="table-primary">
              <tr>
                <th>Month</th>
                <th>Subject</th>
                <th>Marks</th>
                <th>Attendance (%)</th>
              </tr>
            </thead>
            <tbody>
              {student.marks && Object.keys(student.marks).length > 0 ? (
                Object.entries(student.marks).map(([month, subjects]) => 
                  Object.keys(subjects).map((subj) => {
                    if (subj === "attendance") return null; // skip attendance key
                    return (
                      <tr key={month + subj}>
                        <td>{month}</td>
                        <td>{subj}</td>
                        <td>{subjects[subj] ?? "-"}</td>
                        <td>{subjects.attendance?.[subj] ?? "-"}</td>
                      </tr>
                    );
                  })
                )
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted">
                    No marks or attendance added
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default StudentDashboard;
