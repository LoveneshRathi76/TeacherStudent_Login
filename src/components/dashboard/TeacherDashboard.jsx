import React, { useState, useEffect } from "react";
import { Container, Form, Button, Table, Modal, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const TEACHER_PASSWORD = "gujjar@12";

  const subjectsByClass = {
    "9": ["Math", "English", "Science"],
    "10": ["Math", "English", "Science"],
    "11": ["Physics", "Chemistry", "Math"],
    "12": ["Physics", "Chemistry", "Math"]
  };

  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    class: "",
    email: "",
    phone: "",
    password: "",
    photo: "",
    marks: {}
  });
  const [teacherPasswordInput, setTeacherPasswordInput] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedStudentIdx, setSelectedStudentIdx] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("January");

  const [showStudentUpdateModal, setShowStudentUpdateModal] = useState(false);
  const [updateForm, setUpdateForm] = useState({});

  // ---------------- FETCH STUDENTS ----------------
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/students");
        const data = await response.json();
        setStudents(data.students || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStudents();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("teacherLoggedIn");
    navigate("/teacher-login");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "class") {
      const subj = subjectsByClass[value] || [];
      const emptyMarks = {};
      subj.forEach((s) => (emptyMarks[s] = ""));
      setFormData((prev) => ({
        ...prev,
        marks: { "January": { ...emptyMarks, attendance: { ...emptyMarks } } }
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // ---------------- ADD STUDENT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (teacherPasswordInput !== TEACHER_PASSWORD) {
      alert("❌ Incorrect teacher password!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/teacher/add-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (data.success) {
        setStudents(data.students);
        alert("✅ Student Added Successfully!");
        setFormData({ name: "", fatherName: "", class: "", email: "", phone: "", password: "", photo: "", marks: {} });
        setTeacherPasswordInput("");
      } else {
        alert("❌ Failed to add student!");
      }
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }
  };

  // ---------------- UPDATE MARKS ----------------
  const handleOpenUpdate = (index) => {
    setSelectedStudentIdx(index);
    setSelectedMonth("January");
    setShowUpdateModal(true);
  };

  const handleMarksChange = (subject, value) => {
    const updatedStudents = [...students];
    const student = updatedStudents[selectedStudentIdx];
    if (!student.marks[selectedMonth]) student.marks[selectedMonth] = {};
    student.marks[selectedMonth][subject] = Number(value);
    setStudents(updatedStudents);
  };

  const handleAttendanceChange = (subject, value) => {
    const updatedStudents = [...students];
    const student = updatedStudents[selectedStudentIdx];
    if (!student.marks[selectedMonth]) student.marks[selectedMonth] = {};
    if (!student.marks[selectedMonth].attendance) student.marks[selectedMonth].attendance = {};
    student.marks[selectedMonth].attendance[subject] = Number(value);
    setStudents(updatedStudents);
  };

  const handleSaveUpdate = async () => {
    const student = students[selectedStudentIdx];
    try {
      const response = await fetch("http://localhost:5000/api/teacher/add-student-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: student.id, marks: [student.marks[selectedMonth]] })
      });
      const data = await response.json();
      if (data.success) {
        alert("✅ Marks & Attendance Updated Successfully!");
        setShowUpdateModal(false);
        setStudents(data.students);
      }
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }
  };

  const handleDeleteMonth = () => {
    if (selectedStudentIdx === null || !selectedMonth) return;
    const confirmDelete = window.confirm(`Are you sure you want to delete marks & attendance for ${selectedMonth}?`);
    if (!confirmDelete) return;

    const updatedStudents = [...students];
    const student = updatedStudents[selectedStudentIdx];
    if (student.marks[selectedMonth]) {
      const { [selectedMonth]: removed, ...restMarks } = student.marks;
      student.marks = restMarks;
      setStudents(updatedStudents);
      alert(`✅ Marks & Attendance for ${selectedMonth} deleted!`);
      setSelectedMonth("");
      setShowUpdateModal(false);
    } else {
      alert("No marks found for this month!");
    }
  };

  const handleDeleteStudent = async (index) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete student ${students[index].name}?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/teacher/delete-student/${students[index].id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.success) setStudents(data.students);
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }
  };

  // ---------------- UPDATE STUDENT INFO ----------------
  const handleOpenStudentUpdate = (index) => {
    setSelectedStudentIdx(index);
    setUpdateForm({ ...students[index] });
    setShowStudentUpdateModal(true);
  };

  const handleStudentInfoChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm({ ...updateForm, [name]: value });
  };

  const handleStudentPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdateForm((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveStudentUpdate = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/teacher/update-student", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateForm)
      });
      const data = await response.json();
      if (data.success) {
        setStudents(data.students);
        setShowStudentUpdateModal(false);
        alert("✅ Student details updated successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }
  };

  return (
    <Container className="mt-4">
      {/* HEADER */}
      <Row className="mb-4 align-items-center">
        <Col><h2 className="text-primary mt-5">👨‍🏫 Teacher Dashboard</h2></Col>
        <Col className="text-end">
          <Button variant="outline-danger mt-5" onClick={handleLogout}>🚪 Logout</Button>
        </Col>
      </Row>

      {/* ADD STUDENT */}
      <Card className="mb-4 shadow-sm">
        <Card.Header className="bg-primary text-white">➕ Add New Student</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            {/* Name & Father's Name */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Student Name</Form.Label>
                  <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Father's Name</Form.Label>
                  <Form.Control type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>

            {/* Class, Email, Password */}
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Class</Form.Label>
                  <Form.Select name="class" value={formData.class} onChange={handleChange} required>
                    <option value="">Select Class</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="password" value={formData.password || ""} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>

            {/* Phone, Photo, Teacher Password */}
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Photo (Passport)</Form.Label>
                  <Form.Control type="file" accept="image/*" onChange={handlePhotoChange} />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Teacher Password</Form.Label>
                  <Form.Control type="password" placeholder="Enter teacher password" value={teacherPasswordInput} onChange={(e) => setTeacherPasswordInput(e.target.value)} required />
                </Form.Group>
              </Col>
            </Row>

            <Button type="submit" variant="success">Add Student</Button>
          </Form>
        </Card.Body>
      </Card>

      {/* STUDENTS TABLE */}
      <Card className="shadow-sm">
        <Card.Header className="bg-success text-white">📋 Student List</Card.Header>
        <Card.Body className="p-0">
          <Table striped bordered hover responsive className="mb-0">
            <thead className="table-primary">
              <tr>
                <th>Photo</th>
                <th>Name</th>
                <th>Father's Name</th>
                <th>Class</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Password</th>
                <th>Marks & Attendance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((stu, idx) => (
                <tr key={idx}>
                  <td>{stu.photo ? <img src={stu.photo} alt={stu.name} style={{ width: "50px", height: "50px", borderRadius: "50%" }} /> : "No Photo"}</td>
                  <td>{stu.name}</td>
                  <td>{stu.fatherName}</td>
                  <td>{stu.class}</td>
                  <td>{stu.email}</td>
                  <td>{stu.phone}</td>
                  <td>{stu.password}</td>
                  <td>
                    {Object.entries(stu.marks || {}).map(([month, marksObj]) => (
                      <div key={month} className="mb-2">
                        <strong>{month}:</strong>
                        {subjectsByClass[stu.class]?.map((subj) => (
                          <div key={subj} className="ms-3">
                            {subj} → Marks: {marksObj[subj] ?? "-"} | Attendance: {marksObj.attendance?.[subj] ?? "-"}%
                          </div>
                        ))}
                      </div>
                    ))}
                  </td>
                  <td>
                    <Button variant="info" size="sm" onClick={() => handleOpenStudentUpdate(idx)} className="me-2">✏️ Update Info</Button>
                    <Button variant="warning" size="sm" onClick={() => handleOpenUpdate(idx)} className="me-2">📊 Update Marks</Button>
                    <Button variant="danger" size="sm" onClick={() => handleDeleteStudent(idx)}>🗑 Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* UPDATE MARKS MODAL */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton className="bg-info text-white">
          <Modal.Title>Update Marks & Attendance - {students[selectedStudentIdx]?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudentIdx !== null && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Month</Form.Label>
                <Form.Select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                  {["January","February","March","April","May","June","July","August","September","October","November","December"].map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              {subjectsByClass[students[selectedStudentIdx].class]?.map((subj) => (
                <div key={subj} className="mb-3">
                  <Form.Label>{subj} Marks</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    max="100"
                    value={students[selectedStudentIdx].marks[selectedMonth]?.[subj] || ""}
                    onChange={(e) => handleMarksChange(subj, e.target.value)}
                  />
                  <Form.Label>{subj} Attendance (%)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    max="100"
                    value={students[selectedStudentIdx].marks[selectedMonth]?.attendance?.[subj] || ""}
                    onChange={(e) => handleAttendanceChange(subj, e.target.value)}
                  />
                </div>
              ))}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteMonth}>🗑 Delete Month</Button>
          <Button variant="success" onClick={handleSaveUpdate}>💾 Save</Button>
        </Modal.Footer>
      </Modal>

      {/* UPDATE STUDENT INFO MODAL */}
      <Modal show={showStudentUpdateModal} onHide={() => setShowStudentUpdateModal(false)}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title>Update Student Info - {updateForm.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={updateForm.name || ""} onChange={handleStudentInfoChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Father's Name</Form.Label>
              <Form.Control type="text" name="fatherName" value={updateForm.fatherName || ""} onChange={handleStudentInfoChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Class</Form.Label>
              <Form.Select name="class" value={updateForm.class || ""} onChange={handleStudentInfoChange}>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={updateForm.email || ""} onChange={handleStudentInfoChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="text" name="phone" value={updateForm.phone || ""} onChange={handleStudentInfoChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" name="password" value={updateForm.password || ""} onChange={handleStudentInfoChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Update Photo</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleStudentPhotoChange} />
              {updateForm.photo && <img src={updateForm.photo} alt="preview" style={{ width: "80px", height: "80px", borderRadius: "10px", marginTop: "10px" }} />}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSaveStudentUpdate}>💾 Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TeacherDashboard;
