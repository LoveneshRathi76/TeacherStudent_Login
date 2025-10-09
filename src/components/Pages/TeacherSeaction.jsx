import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import jyoti from "../../assets/jyoti.JPG";
import manish from "../../assets/manish.jpg";
import "./TeacherSeaction.css";

const teachers = [
  {
    name: "Ms. Jyoti Thakur",
    subject: "Maths (VI - VIII)",
    qualification: "M.A., B.Sc., BTC, CTET",
    experience: "More than 5 years of experience",
    photo: jyoti,
    duration: "1hr 00 Min",
  },
  {
    name: "Mr. Manish Plawat",
    subject: "Mathematics (IX - XII)",
    qualification: "M.Sc (Mathematics), B.Sc., B.Ed, BTC, CTI (Electrician), ITI (Electrician), CTET",
    experience: "More than 5 years of experience",
    photo: manish,
    duration: "1hr 00 Min",
  },
];

function TeacherSection() {
  const [showModal, setShowModal] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState({});

  const handleOpenModal = (teacher) => {
    setSelectedTeacher(teacher);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // form submission logic here (e.g., send to backend)
    alert("Form submitted!");
    handleCloseModal();
  };

  return (
    <Container className="my-5">
      {/* Heading */}
      <div className="teacher-heading text-center mb-5">
        <h2>
          Empower yourself with the key skills <span>every life coach needs</span>
        </h2>
        <p className="sub-text">Learn from our expert teachers and enhance your skills.</p>
      </div>

      {/* Teacher Cards */}
      <Row className="justify-content-center g-2">
        {teachers.map((teacher, index) => (
          <Col md={4} key={index} className="d-flex justify-content-center mb-4">
            <Card className="teacher-card shadow-lg border-0">
              <Card.Img variant="top" src={teacher.photo} className="teacher-img" />
              <Card.Body className="d-flex flex-column">
                <Card.Title className="fw-bold">{teacher.name}</Card.Title>
                <Card.Text className="text-muted small mb-1">{teacher.qualification}</Card.Text>
                <Card.Text className="text-muted small">{teacher.experience}</Card.Text>
                <Card.Text className="fw-semibold text-primary mt-2">{teacher.subject}</Card.Text>
                <div className="d-flex justify-content-between text-muted small my-2">
                  <span>⏰ {teacher.duration}</span>
                  <span>📅 Daily</span>
                </div>
                <Button
                  variant="primary"
                  className="w-100 fw-semibold rounded-4"
                  onClick={() => handleOpenModal(teacher)}
                >
                  Join Batch
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal Form */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Join Batch - {selectedTeacher.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Student Name</Form.Label>
              <Form.Control type="text" placeholder="Enter student name" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Father Name</Form.Label>
              <Form.Control type="text" placeholder="Enter father name" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>School Name</Form.Label>
              <Form.Control type="text" placeholder="Enter school name" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Class</Form.Label>
              <Form.Select required>
                <option value="">Select Class</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="tel" placeholder="Enter mobile number" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Teacher Name</Form.Label>
              <Form.Control type="text" value={selectedTeacher.name || ""} readOnly />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" value={selectedTeacher.subject || ""} readOnly />
            </Form.Group>

            <Button type="submit" variant="success" className="w-100">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default TeacherSection;
