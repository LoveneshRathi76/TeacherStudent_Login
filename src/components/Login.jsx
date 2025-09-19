import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (role === "teacher") {
      if (email === "teacher@example.com" && password === "123456") {
        localStorage.setItem("teacherLoggedIn", "true");
        localStorage.setItem("teacherEmail", email);
        navigate("/teacher-dashboard");
      } else {
        alert("❌ Invalid email or password");
      }
    } else if (role === "student") {
      alert("Student module abhi under development!");
    } else {
      alert("Please select a role!");
    }
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", height:"100vh" }}>
      <h2>Login</h2>
      <select onChange={(e) => setRole(e.target.value)} value={role}>
        <option value="">Select Role</option>
        <option value="teacher">Teacher</option>
        <option value="student">Student</option>
      </select>
      {role === "teacher" && (
        <>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        </>
      )}
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
