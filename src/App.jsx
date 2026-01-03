import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// Navigation component using Link for client-side routing 
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
            {/* Link components allow navigation without page refreshes  */}
            <Link to="/" className="nav-btn">🔍 Explore</Link>
            <Link to="/users" className="nav-btn">👥 All Users</Link>
          </div>
        </div>
        <div className="nav-right">
          <button className="profile-btn">👤 My Profile</button>
        </div>
      </div>
    </nav>
  );
}

// Flexible card component handling both static and API data
function StudentCard({ student, isSaved, onToggleSave }) {
  // Use firstName/lastName for API data, or name for static data
  const displayName = student.name || `${student.firstName} ${student.lastName}`;
  const displayMajor = student.major || "Undecided Major";
  const initials = student.initials || (student.firstName ? student.firstName[0] : "NU");
  const displayClasses = student.classes || [];

  return (
    <div className="card">
      <div className="card-header">
        <div className="avatar" style={{ backgroundColor: student.color || "#4B2E83" }}>
          {initials}
        </div>
        <div className="student-info">
          <h3>{displayName}</h3>
          <p className="major">{displayMajor}</p>
          <p className="shared">📚 {student.sharedClasses || 0} shared classes</p>
        </div>
      </div>

      <div className="classes-tags">
        {displayClasses.map((cls, i) => (
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

// Component for the Static Explore Page
function ExplorePage({ students, savedIds, onToggleSave, filters, setFilters }) {
  return (
    <div className="main-wrapper">
      <div className="container">
        <aside className="sidebar">
          <div className="filter-header">
            <span>⚙️ Filter</span>
            <button className="clear-btn" onClick={() => setFilters({major: "", course: "", residence: "", clubs: ""})}>✕ clear</button>
          </div>
          <div className="filter-section">
            <label>Major/Minor</label>
            <input type="text" value={filters.major} onChange={(e) => setFilters({...filters, major: e.target.value})} />
          </div>
          <div className="filter-section">
            <label>Course</label>
            <input type="text" value={filters.course} onChange={(e) => setFilters({...filters, course: e.target.value})} />
          </div>
          <div className="filter-section">
            <label>Residence Hall</label>
            <input type="text" value={filters.residence} onChange={(e) => setFilters({...filters, residence: e.target.value})} />
          </div>
          <div className="filter-section">
            <label>Clubs & Organizations</label>
            <input type="text" value={filters.clubs} onChange={(e) => setFilters({...filters, clubs: e.target.value})} />
          </div>
        </aside>

        <main className="content-area">
          <header className="page-header">
            <h1>Explore Northwestern Classmates</h1>
            <p>Find and connect with students from your static local data</p>
          </header>
          <div className="student-grid">
            {students.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                isSaved={savedIds.includes(student.id)}
                onToggleSave={onToggleSave}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

// Component for the Dynamic Users Page (API Data) 
function UsersPage() {
  const [apiUsers, setApiUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch users from the server when the component mounts 
  useEffect(() => {
    const getAllUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://disc-assignment-5-users-api-iyct.onrender.com/api/users");
        const data = await response.json();
        setApiUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getAllUsers();
  }, []);

  return (
    <div className="main-wrapper">
      <div className="container">
        <main className="content-area" style={{ width: '100%' }}>
          <header className="page-header">
            <h1>All users in Database</h1>
            <p>Users retrieved from the Ohio API server </p>
          </header>
          
          {isLoading ? (
            <div className="loading-state">
              <h2>Loading real-time user data...</h2>
              <p>Please wait.</p>
            </div>
          ) : (
            <div className="student-grid">
              {apiUsers.map((user) => (
                <StudentCard
                  key={user.id}
                  student={user}
                  isSaved={false}
                  onToggleSave={() => {}}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const [savedIds, setSavedIds] = useState([]);
  const [filters, setFilters] = useState({ major: "", course: "", residence: "", clubs: "" });

  const staticStudents = [
    { id: 1, name: "Ainwoo Oh", initials: "AO", major: "Computer Science", sharedClasses: 3, classes: ["CS 211", "MATH 228-1", "CS 214", "DISC", "+3"], color: "#4B2E83" },
    { id: 2, name: "Binwoo Oh", initials: "BO", major: "Computer Engineering", sharedClasses: 1, classes: ["CS 211", "MATH 228-1", "DISC", "Elder"], color: "#4B2E83" },
    { id: 3, name: "Cinwoo Oh", initials: "CO", major: "Computational Biology", sharedClasses: 2, classes: ["CS 211", "MATH 228-1", "CS 212", "DISC"], color: "#4B2E83" },
    { id: 4, name: "Dinwoo Oh", initials: "DO", major: "Physics", sharedClasses: 1, classes: ["CS 310", "MATH 228-1", "CS 369", "DISC"], color: "#4B2E83" },
    { id: 5, name: "Einwoo Oh", initials: "EO", major: "Biology", sharedClasses: 2, classes: ["CS 211", "MATH 228-1", "CS 333", "DISC"], color: "#4B2E83" },
    { id: 6, name: "Finwoo Oh", initials: "FO", major: "Psychology", sharedClasses: 0, classes: ["CS 112", "MATH 310", "CS 111", "DISC"], color: "#4B2E83" },
  ];

  const handleToggleSave = (id) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <BrowserRouter>
      <div className="app-container">
        <NavBar />
        
        {/* Switch content based on current path  */}
        <Routes>
          <Route path="/" element={
            <ExplorePage 
              students={staticStudents} 
              savedIds={savedIds} 
              onToggleSave={handleToggleSave} 
              filters={filters}
              setFilters={setFilters}
            />
          } />
          <Route path="/users" element={<UsersPage />} />
        </Routes>

        <footer className="footer">
          © 2025, SocialNU.com. Created for Northwestern University DISC
        </footer>
      </div>
    </BrowserRouter>
  );
}