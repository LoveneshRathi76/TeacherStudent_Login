import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Clock, CameraVideo } from "react-bootstrap-icons";

const teachers = [
  {
    name: "Ms. Jyoti Thakur",
    qualification: "M.A., B.Sc., BTC, CTET",
    experience: "More than 5 years of experience",
    subject: "Maths (VI - VIII)",
    duration: "1hr 00 Min",
    schedule: "Daily",
    photo: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Mr. Rohan Singh",
    qualification: "M.Sc., B.Ed",
    experience: "More than 7 years of experience",
    subject: "Science (VI - VIII)",
    duration: "1hr 30 Min",
    schedule: "Mon-Fri",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Ms. Priya Sharma",
    qualification: "M.A., B.Ed, CTET",
    experience: "More than 6 years of experience",
    subject: "English (VI - VIII)",
    duration: "1hr 15 Min",
    schedule: "Tue-Thu",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Mr. Ajay Kumar",
    qualification: "M.Sc., B.Ed",
    experience: "More than 8 years of experience",
    subject: "Maths (IX - X)",
    duration: "1hr 30 Min",
    schedule: "Daily",
    photo: "https://randomuser.me/api/portraits/men/45.jpg",
  },
];

function TeacherSection() {
  return (
    <section className="teacher-section py-5" style={{ backgroundColor: "#f8f9fa" }}>
      <Container>
        <h2 className="text-center mb-5 fw-bold" style={{ color: "#343a40" }}>
          Our Expert Teachers
        </h2>
        <Row className="justify-content-center">
          {teachers.map((teacher, idx) => (
            <Col key={idx} lg={4} md={6} sm={12} className="mb-4 d-flex justify-content-center">
              <Card
                className="teacher-card h-100 border-0 shadow-sm text-center overflow-hidden"
                style={{ maxWidth: "340px" }}
              >
                {/* Full-width image */}
                <Card.Img
                  variant="top"
                  src={teacher.photo}
                  style={{
                    width: "100%", // Full width of card
                    height: "180px",
                    objectFit: "cover",
                  }}
                />

                <Card.Body>
                  <Card.Title className="fw-bold mb-1">{teacher.name}</Card.Title>
                  <Card.Text className="text-muted mb-1">{teacher.qualification}</Card.Text>
                  <Card.Text className="text-secondary mb-2">{teacher.experience}</Card.Text>
                  <Card.Text className="fw-semibold text-primary mb-3">{teacher.subject}</Card.Text>

                  <div className="d-flex justify-content-center align-items-center mb-3 gap-3 text-muted">
                    <span className="d-flex align-items-center">
                      <Clock className="me-1" /> {teacher.duration}
                    </span>
                    <span className="d-flex align-items-center">
                      <CameraVideo className="me-1" /> {teacher.schedule}
                    </span>
                  </div>

                  <Button variant="primary" className="w-75 mx-auto rounded-pill shadow-sm">
                    Join Batch
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default TeacherSection;
