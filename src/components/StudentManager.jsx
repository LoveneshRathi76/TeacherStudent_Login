import React, { useState, useEffect } from "react";

function StudentManager() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "", fatherName: "", school: "", phone: "", attendance: "", marks: ""
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
      if (value.length > 10) return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    if (Object.values(formData).some(v => !v)) {
      alert("⚠️ Fill all fields");
      return;
    }
    if (formData.phone.length !== 10) {
      alert("⚠️ Phone number must be 10 digits");
      return;
    }
    setStudents([...students, formData]);
    setFormData({ name:"", fatherName:"", school:"", phone:"", attendance:"", marks:"" });
  };

  const handleDelete = (i) => setStudents(students.filter((_, idx) => idx !== i));

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>📋 Student List</h3>
      <div style={{ display:"flex", flexWrap:"wrap", gap:"10px", marginBottom:"10px" }}>
        {["name","fatherName","school","phone","attendance","marks"].map(f => (
          <input key={f} name={f} placeholder={f} value={formData[f]} onChange={handleChange} style={{ padding:"6px", flex:"1 1 150px" }} />
        ))}
        <button onClick={handleAdd} style={{ padding:"6px 12px" }}>Add Student</button>
      </div>
      <table style={{ width:"100%", borderCollapse:"collapse" }}>
        <thead>
          <tr style={{ backgroundColor:"#f0f0f0" }}>
            {["Name","Father","School","Phone","Attendance","Marks","Action"].map(h => (
              <th key={h} style={{ border:"1px solid #ccc", padding:"8px", textAlign:"center" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.length ? students.map((s,i)=>(
            <tr key={i}>
              <td style={{ border:"1px solid #ccc", padding:"8px" }}>{s.name}</td>
              <td style={{ border:"1px solid #ccc", padding:"8px" }}>{s.fatherName}</td>
              <td style={{ border:"1px solid #ccc", padding:"8px" }}>{s.school}</td>
              <td style={{ border:"1px solid #ccc", padding:"8px" }}>{s.phone}</td>
              <td style={{ border:"1px solid #ccc", padding:"8px", textAlign:"center" }}>{s.attendance}%</td>
              <td style={{ border:"1px solid #ccc", padding:"8px", textAlign:"center" }}>{s.marks}</td>
              <td style={{ border:"1px solid #ccc", padding:"8px", textAlign:"center" }}>
                <button onClick={()=>handleDelete(i)} style={{ padding:"4px 8px" }}>Delete</button>
              </td>
            </tr>
          )) : <tr><td colSpan="7" style={{ textAlign:"center", padding:"10px", color:"#888" }}>No students added yet.</td></tr>}
        </tbody>
      </table>
    </div>
  );
}

export default StudentManager;
