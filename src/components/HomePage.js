import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  const location = useLocation();
  const email = location.state?.email; // Get email from location state

  return (
    <div>
      <div className="banner">
        <video autoPlay loop muted playsInline>
          <source src={require('./Home.mp4')} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="navbar">
          <div className="nav-links">
            {/* Pass email to Write Letter via state */}
            <Link 
              to="/write-letter" 
              state={{ email }} 
              className="btn btn-primary mx-2"
            >
              Write a Letter
            </Link>
            <Link to="/view-letters"  state={{ email }} className="btn btn-secondary mx-2">
              View Letters
            </Link>
            <Link to="/achievements" className="btn btn-success mx-2">
              Achievements
            </Link>
            <Link to="/community" className="btn btn-info mx-2">
              Community
            </Link>
          </div>
          {/* Display the email in the top-right corner */}
          <div className="email-display">
            {email && <p>{email}</p>}
          </div>
        </div>
        <div className="welcome">
          <h1>Welcome to Letofo</h1>
          <p className="p">
            Capture, cherish, and relive the moments that matter most and keep
            your memories safe with encrypted and cloud-based storage.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
