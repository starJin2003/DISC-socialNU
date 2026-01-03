import { useEffect, useState } from "react";
import "./App.css";

// Navigation bar component
function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="nav-left">
          <div className="logo">
            <div className="logo-icon">👥</div>
            <span>SocialNU</span>
          </div>
          <div className="nav-buttons">
            <button className="nav-btn active">🔍 Explore</button>
            <button className="nav-btn">❤️ Favorites</button>
          </div>
        </div>
        <div className="nav-right">
          <button className="profile-btn">👤 My Profile</button>
        </div>
      </div>
    </nav>
  );
}

// Card component for individual student profiles
function StudentCard({ student, isSaved, onToggleSave }) {
  return (
    <div className="card">
      <div className="card-header">
        <div className="avatar" style={{ backgroundColor: student.color }}>
          {student.initials}
        </div>
        <div className="student-info">
          <h3>{student.name}</h3>
          <p className="major">{student.major}</p>
          <p className="shared">📚 {student.sharedClasses} shared classes</p>
        </div>
      </div>

      <div className="classes-tags">
        {student.classes.map((cls, i) => (
          <span key={i} className="class-tag">{cls}</span>
        ))}
      </div>

      <button
        className={`save-btn ${isSaved ? "saved" : ""}`}
        onClick={() => onToggleSave(student.id)}
      >
        {isSaved ? "❤️ Saved" : "🤍 Save"}
      </button>
    </div>
  );
}

export default function App() {
  const [savedIds, setSavedIds] = useState([]);
  
  // 4 state variables for the requested filters
  const [major, setMajor] = useState("");
  const [course, setCourse] = useState("");
  const [residence, setResidence] = useState("");
  const [clubs, setClubs] = useState("");

  const students = [
    { id: 1, name: "Ainwoo Oh", initials: "AO", major: "Computer Science", sharedClasses: 3, classes: ["CS 211", "MATH 228-1", "CS 214", "DISC", "+3"], color: "#4B2E83" },
    { id: 2, name: "Binwoo Oh", initials: "BO", major: "Computer Engineering", sharedClasses: 1, classes: ["CS 211", "MATH 228-1", "DISC", "Elder"], color: "#4B2E83" },
    { id: 3, name: "Cinwoo Oh", initials: "CO", major: "Computational Biology", sharedClasses: 2, classes: ["CS 211", "MATH 228-1", "CS 212", "DISC"], color: "#4B2E83" },
    { id: 4, name: "Dinwoo Oh", initials: "DO", major: "Physics", sharedClasses: 1, classes: ["CS 310", "MATH 228-1", "CS 369", "DISC"], color: "#4B2E83" },
    { id: 5, name: "Einwoo Oh", initials: "EO", major: "Biology", sharedClasses: 2, classes: ["CS 211", "MATH 228-1", "CS 333", "DISC"], color: "#4B2E83" },
    { id: 6, name: "Finwoo Oh", initials: "FO", major: "Psychology", sharedClasses: 0, classes: ["CS 112", "MATH 310", "CS 111", "DISC"], color: "#4B2E83" },
  ];

  // Logs the savedIds whenever the list changes
  useEffect(() => {
    console.log("Saved student list:", savedIds);
  }, [savedIds]);

  const toggleSave = (id) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const clearAllFilters = () => {
    setMajor(""); setCourse(""); setResidence(""); setClubs("");
  };

  return (
    <div className="app-container">
      <NavBar />
      
      <div className="main-wrapper">
        <div className="container">
          <aside className="sidebar">
            <div className="filter-header">
              <span>⚙️ Filter</span>
              <button className="clear-btn" onClick={clearAllFilters}>✕ clear</button>
            </div>

            <div className="filter-section">
              <label>Major/Minor</label>
              <input type="text" value={major} onChange={(e) => setMajor(e.target.value)} />
            </div>
            <div className="filter-section">
              <label>Course</label>
              <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} />
            </div>
            <div className="filter-section">
              <label>Residence Hall</label>
              <input type="text" value={residence} onChange={(e) => setResidence(e.target.value)} />
            </div>
            <div className="filter-section">
              <label>Clubs & Organizations</label>
              <input type="text" value={clubs} onChange={(e) => setClubs(e.target.value)} />
            </div>
          </aside>

          <main className="content-area">
            <header className="page-header">
              <h1>Explore Northwestern Classmates</h1>
              <p>Find and connect with students who share your classes</p>
            </header>
            
            <div className="student-grid">
              {students.map((student) => (
                <StudentCard
                  key={student.id}
                  student={student}
                  isSaved={savedIds.includes(student.id)}
                  onToggleSave={toggleSave}
                />
              ))}
            </div>
          </main>
        </div>
      </div>

      <footer className="footer">
        © 2025, SocialNU.com. Created for Northwestern University DISC
      </footer>
    </div>
  );
}