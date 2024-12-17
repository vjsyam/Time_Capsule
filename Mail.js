const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 5001; // Use a different port to avoid conflicts

// Enable CORS
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json()); 

// Path to the Message.json file
const filePath = path.join(__dirname, 'Message.json');

// POST route to store a message
app.post('/messages', (req, res) => {
    const { email, mood, theme, message, date, attachments } = req.body;

    if (!email || !message) {
      return res.status(400).json({ message: 'Email and message are required' });
    }

    const newMessage = { email, mood, theme, message, date, attachments };

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err && err.code === 'ENOENT') {
        return fs.writeFile(filePath, JSON.stringify([newMessage], null, 2), (writeErr) => {
          if (writeErr) {
            return res.status(500).json({ message: 'Error creating message file', error: writeErr });
          }
          res.json({ message: 'Message saved successfully', data: newMessage });
        });
      } else if (err) {
        return res.status(500).json({ message: 'Error reading message file', error: err });
      }

      let messages;
      try {
        messages = JSON.parse(data || '[]');
      } catch (parseError) {
        return res.status(500).json({ message: 'Error parsing message file', error: parseError });
      }

      messages.push(newMessage);

      fs.writeFile(filePath, JSON.stringify(messages, null, 2), (writeErr) => {
        if (writeErr) {
          return res.status(500).json({ message: 'Error updating message file', error: writeErr });
        }
        res.json({ message: 'Message saved successfully', data: newMessage });
      });
    });
  });

 // GET route to fetch messages
app.get('/messages', (req, res) => {
  const { email } = req.query; // Get email query parameter if provided

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Error reading message file', error: err });
    }

    let messages;
    try {
      messages = JSON.parse(data || '[]');
    } catch (parseError) {
      return res.status(500).json({ message: 'Error parsing message file', error: parseError });
    }

    // Filter messages by email if email query is provided
    const filteredMessages = email
      ? messages.filter((msg) => msg.email === email)
      : messages;

    res.json({ message: 'Messages fetched successfully', data: filteredMessages });
  });
});

  
// Start the server
app.listen(port, () => {
  console.log(`Mail backend server running at http://localhost:${port}`);
});

