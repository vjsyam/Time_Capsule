import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./ViewLetter.css";

const ViewLetter = () => {
  const [letters, setLetters] = useState([]);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null); // Timer state
  const [inputTime, setInputTime] = useState(""); // Input for timer
  const [isTimerRunning, setIsTimerRunning] = useState(false); // Timer running state

  const location = useLocation();
  const email = location.state?.email; // Retrieve email from location state

  // Email Sending Logic
  const handleSendEmails = useCallback(async () => {
    if (letters.length === 0) {
      alert("No letters to send.");
      return;
    }

    for (let letter of letters) {
      const emailDetails = {
        to: letter.email,
        subject: letter.mood,
        text: letter.message,
      };

      try {
        await axios.post("http://localhost:5002/send-email", emailDetails);
        console.log(`Email sent to: ${emailDetails.to}`);
        alert(`Email sent to: ${emailDetails.to}`);
      } catch (error) {
        console.error("Error sending email:", error);
        alert("Failed to send email to: " + emailDetails.to);
      }
    }
  }, [letters]);

  // Timer Logic
  useEffect(() => {
    if (!isTimerRunning) return;

    const targetTime = new Date().getTime() + timeLeft; // Calculate target time
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const remainingTime = targetTime - now;
      if (remainingTime <= 0) {
        clearInterval(interval);
        setTimeLeft(0);
        setIsTimerRunning(false);
        handleSendEmails(); // Trigger email sending when time reaches 0
      } else {
        setTimeLeft(remainingTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, handleSendEmails]);

  // Fetch Messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!email) {
        setError("No email provided. Please return to the home page and try again.");
        return;
      }
      try {
        const { data } = await axios.get("http://localhost:5001/messages", {
          params: { email }, // Pass the email as a query parameter
        });
        setLetters(data.data); // Access the 'data' field in the response
      } catch (err) {
        console.error("Error fetching messages:", err);
        setError("Failed to load messages. Please try again later.");
      }
    };

    fetchMessages();
  }, [email]);

  const startTimer = () => {
    const timeInMs = parseInt(inputTime, 10) * 1000; // Convert seconds to milliseconds
    if (!isNaN(timeInMs) && timeInMs > 0) {
      setTimeLeft(timeInMs);
      setIsTimerRunning(true);
    } else {
      alert("Please enter a valid time in seconds.");
    }
  };

  return (
    <div className="view-letters">
      <h1>View Letters</h1>

      <div className="timer-controls">
        <input
          type="number"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          placeholder="Set time in seconds"
        />
        <button onClick={startTimer}>Start Timer</button>
      </div>

      {timeLeft !== null && timeLeft > 0 && (
        <p>Time until emails are sent: {Math.floor(timeLeft / 1000)} seconds</p>
      )}

      {error ? (
        <p>{error}</p>
      ) : letters.length > 0 ? (
        letters.map((letter, index) => (
          <div className="letter" key={index}>
            <h2>{letter.mood}</h2>
            <p dangerouslySetInnerHTML={{ __html: letter.message }}></p>
            <p>Date: {new Date(letter.date).toLocaleString()}</p>
            {letter.attachments && letter.attachments.length > 0 ? (
              <p>Attachments: {letter.attachments.join(", ")}</p>
            ) : (
              <p>Attachments: None</p>
            )}
          </div>
        ))
      ) : (
        <p>No letters available.</p>
      )}
    </div>
  );
};

export default ViewLetter;
