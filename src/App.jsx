import React, { useState, useEffect } from 'react';
import './App.css';
import { supabase } from './supabaseClient';

function App() {
  const [students, setStudents] = useState([]);
  const [session, setSession] = useState(null);
  
  // New state for login form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) {
      fetch(import.meta.env.VITE_API_URL)
        .then((res) => res.json())
        .then((data) => setStudents(data))
        .catch((err) => console.error("Error fetching data:", err));
    }
  }, [session]);

  // Updated login handler to use state values
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert(error.message);
    } else {
      // Clear inputs on success
      setEmail('');
      setPassword('');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setStudents([]);
  };

  // Login Screen with actual input fields
  if (!session) {
    return (
      <div className="login-screen">
        <div className="login-card">
          <div className="logo">
            <span className="logo-icon">👥</span> SocialNU
          </div>
          <h1>Welcome Back</h1>
          <p>id:jinwoooh2027@u.northwestern.edu</p>
          <p>pw:disc</p>
          
          <form onSubmit={handleLogin} className="login-form">
            <div className="input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input 
                type="password" 
                placeholder="Enter your password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-submit-btn">
              Log In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Existing main app code... */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="nav-left">
            <div className="logo">
              <div className="logo-icon">👥</div>
              <span>SocialNU</span>
            </div>
            <div className="nav-buttons">
              <button className="nav-btn active">Explore</button>
              <button className="nav-btn">Favorites</button>
            </div>
          </div>
          <button onClick={handleLogout} className="profile-btn">Log Out</button>
        </div>
      </nav>

      <main className="main-wrapper">
        <div className="container">
          <aside className="sidebar">
            <div className="filter-header">
              <div className="filter-title">⚙️ Filter</div>
              <button className="clear-btn">✕ clear</button>
            </div>
            <div className="filter-section"><label>Major/Minor</label><input type="text" placeholder="Search major..." /></div>
            <div className="filter-section"><label>Course</label><input type="text" placeholder="Search course..." /></div>
            <div className="filter-section"><label>Residence Hall</label><input type="text" placeholder="Search dorm..." /></div>
            <div className="filter-section"><label>Clubs & Organizations</label><input type="text" placeholder="Search clubs..." /></div>
          </aside>

          <section className="content-area">
            <div className="page-header">
              <h1>Explore Northwestern Classmates</h1>
              <p>Find and connect with students who share your classes</p>
            </div>
            <div className="student-grid">
              {students.map((student) => (
                <div key={student.id} className="card">
                  <div className="card-header">
                    <div className="avatar" style={{ backgroundColor: '#4B2E83' }}>{student.first_name[0]}{student.last_name[0]}</div>
                    <div className="student-info">
                      <h3>{student.first_name} {student.last_name}</h3>
                      <p className="major">{student.user_profiles?.major || 'Northwestern Student'}</p>
                      <p className="shared">📚 {student.user_profiles?.shared_classes || 0} shared classes</p>
                    </div>
                  </div>
                  <div className="classes-tags">
                    {student.user_profiles?.tags && student.user_profiles.tags.map((tag, index) => (
                      <span key={index} className="class-tag">{tag}</span>
                    ))}
                  </div>
                  <button className="save-btn">♡ Save</button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">© 2026, SocialNU.com. Created for Northwestern University DISC</footer>
    </div>
  );
}

export default App;