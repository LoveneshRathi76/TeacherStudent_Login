import React, { useState, useEffect } from "react";
import { Container, Form, Table, Button } from "react-bootstrap";

const AttendanceSheet = () => {
  const [students, setStudents] = useState([]);
  const [month, setMonth] = useState("January");
  const [attendanceData, setAttendanceData] = useState({});

  // LocalStorage से students fetch
  useEffect(() => {
    const savedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(savedStudents);

    const savedAttendance = JSON.parse(localStorage.getItem("attendance")) || {};
    setAttendanceData(savedAttendance);
  }, []);

  // attendance change handler
  const handleAttendanceChange = (studentPhone, value) => {
    setAttendanceData((prev) => ({
      ...prev,
      [month]: {
        ...prev[month],
        [studentPhone]: value, // सिर्फ percentage save करेंगे
      },
    }));
  };

  // save data in localStorage
  const saveAttendance = () => {
    localStorage.setItem("attendance", JSON.stringify(attendanceData));
    alert("✅ Attendance Saved Successfully!");
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">📅 Attendance Sheet</h2>

      {/* Month Selector */}
      <Form.Group className="mb-3">
        <Form.Label>Select Month</Form.Label>
        <Form.Select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option>January</option>
          <option>February</option>
          <option>March</option>
          <option>April</option>
          <option>May</option>
          <option>June</option>
          <option>July</option>
          <option>August</option>
          <option>September</option>
          <option>October</option>
          <option>November</option>
          <option>December</option>
        </Form.Select>
      </Form.Group>

      {/* Attendance Table */}
      <Table bordered hover>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Class</th>
            <th>Phone</th>
            <th>Attendance (%)</th>
          </tr>
        </thead>
        <tbody>
          {students.map((stu, index) => (
            <tr key={index}>
              <td>{stu.name}</td>
              <td>{stu.class}</td>
              <td>{stu.phone}</td>
              <td>
                <Form.Control
                  type="number"
                  min="0"
                  max="100"
                  value={attendanceData[month]?.[stu.phone] || ""}
                  onChange={(e) =>
                    handleAttendanceChange(stu.phone, e.target.value)
                  }
                />{" "}
                %
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button variant="success" onClick={saveAttendance}>
        💾 Save Attendance
      </Button>
    </Container>
  );
};

export default AttendanceSheet;
