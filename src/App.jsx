// src/App.jsx
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar/Navbar";
import Home from "./components/Pages/Home";
import Contact from "./components/Pages/Contact";
import Achievers from "./components/Pages/Achievers";
import TeacherLogin from "./components/auth/TeacherLogin";
import TeacherDashboard from "./components/dashboard/TeacherDashboard";
import StudentLogin from "./components/auth/StudentLogin";
import StudentDashboard from "./components/dashboard/StudentDashboard";

import "./App.css";

function App() {
  return (
    <Router>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/achievers" element={<Achievers />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        {/* Agar koi unknown route ho to Home pe redirect */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
