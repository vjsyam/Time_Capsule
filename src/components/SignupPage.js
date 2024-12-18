import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './SignupPage.css';

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [signedUp, setSignedUp] = useState(false);

  // Field-level validation
  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        return value.length > 3 ? '' : 'Name must be greater than 3 characters';
      case 'age':
        return value >= 15 && value <= 64 ? '' : 'Age must be between 15 and 64';
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email address';
      case 'phone':
        return /^[0-9]{10}$/.test(value) ? '' : 'Phone number must be 10 digits';
      case 'username':
        return /^[a-zA-Z0-9]{4,15}$/.test(value)
          ? ''
          : 'Username must be 4-15 alphanumeric characters';
      case 'password':
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(value)
          ? ''
          : 'Password must include 8 characters, an uppercase letter, a lowercase letter, a digit, and a special character';
      default:
        return '';
    }
  };

  // Validate all fields
  const validate = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Real-time validation
    setErrors({ ...errors, [name]: validateField(name, value) });
  };

  const handleSignUp = () => {
    if (!validate()) return;

    // Send POST request to the server
    axios
      .post('http://localhost:5000/Users', formData)
      .then((response) => {
        console.log('User added successfully:', response.data);
        setFormData({
          name: '',
          age: '',
          email: '',
          phone: '',
          username: '',
          password: '',
        });
        setSignedUp(true); // Redirect on success
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
  };

  if (signedUp) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="manner">
      <video autoPlay loop muted playsInline>
        <source src={require('./Login.mp4')} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="signupContainer">
        <h1 className="heading">SIGN UP</h1>
        <div className="inputGroup">
          {['name', 'age', 'email', 'phone', 'username', 'password'].map((field) => (
            <div key={field}>
              <input
                type={
                  field === 'age'
                    ? 'number'
                    : field === 'email'
                    ? 'email'
                    : field === 'password'
                    ? 'password'
                    : 'text'
                }
                name={field}
                className="inputField"
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)}`}
              />
              {errors[field] && <span className="errorMessage">{errors[field]}</span>}
            </div>
          ))}
        </div>
        <button className="signupButton" onClick={handleSignUp}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
