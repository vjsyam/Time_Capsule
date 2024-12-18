import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleLogin = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    try {
      const response = await fetch(
        `http://localhost:5000/Users?email=${trimmedUsername}&password=${trimmedPassword}`
      );

      if (!response.ok) {
        if (response.status === 401) {
          setError('Invalid email or password');
        } else {
          setError('Something went wrong. Please try again.');
        }
        return;
      }

      const data = await response.json();
      console.log('Login successful:', data);
      setLoggedIn(true); // Set to true when login is successful
    } catch (err) {
      console.error('Error during login:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  if (loggedIn) {
    return <Navigate to="/home" state={{ email: username }} />; // Pass email in state
  }

  return (
    <div>
      {isLogin ? (
        <div className="manner">
          <video autoPlay loop muted playsInline>
            <source src={require('./Login.mp4')} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="loginContainer">
            <h1 className="heading">LOGIN</h1>
            <div className="inputGroup">
              <p style={{ color: 'white' }}>
                Email
                <input
                  className="inputField"
                  type='text'
                  placeholder='Enter Email'
                  value={username}
                  onChange={handleUsernameChange}
                />
              </p>
              <p style={{ color: 'white' }}>
                Password
                <input
                  className="inputField"
                  type='password'
                  placeholder='Enter Password'
                  value={password}
                  onChange={handlePasswordChange}
                />
              </p>
            </div>
            {error && <p className="errorMessage">{error}</p>}
            <div>
              <button className="loginButton" onClick={handleLogin}>
                Login
              </button>
            </div>
            <div className="signupLink">
              <p style={{ color: 'white' }}>
                New registration? &nbsp;&nbsp;&nbsp;
                <button
                  className="signupButton"
                  onClick={() => setIsLogin(false)}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to="/signup" />
      )}
    </div>
  );
};

export default LoginPage;
