import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppNavbar from "./components/Navbar";
import Home from "./components/Home";
import Contact from "./components/Contact";
import Achievers from "./components/Achievers";
import TeacherLogin from "./components/TeacherLogin";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentLogin from "./components/StudentLogin";
import StudentDashboard from "./components/StudentDashboard";

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
        <Route
          path="*"
          element={<h2 style={{ textAlign: "center", marginTop: "50px" }}>Page Not Found</h2>}
        />
      </Routes>
    </Router>
  );
}

export default App;
