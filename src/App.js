import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import WriteLetter from "./components/WriteLetter";
import ViewLetter from "./components/ViewLetter";
import Achievements from "./components/Achievements";
import CommunityPage from "./components/CommunityPage";
import "./App.css";  // Import main CSS for App

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/write-letter" element={<WriteLetter />} />
              <Route path="/view-letters" element={<ViewLetter />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/community" element={<CommunityPage />} />
          </Routes>
      </Router>
  );
};

export default App;
