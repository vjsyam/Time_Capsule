const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// Enable CORS
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// Path to the JSON file
const filePath = path.join(__dirname, 'User.json');
console.log('File Path:', filePath); // Debug log

// POST route to add a new user
app.post('/Users', (req, res) => {
  const newUser = req.body;
  console.log('New user data:', newUser); // Debug log

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err && err.code === 'ENOENT') {
      console.log('File does not exist. Creating a new file...');
      return fs.writeFile(filePath, JSON.stringify([newUser], null, 2), (writeErr) => {
        if (writeErr) {
          console.error('Error creating file:', writeErr);
          return res.status(500).json({ message: 'Error creating file', error: writeErr });
        }
        console.log('File created and user added:', newUser);
        res.json({ message: 'User added successfully', user: newUser });
      });
    } else if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Error reading file', error: err });
    }

    let users;
    try {
      users = JSON.parse(data || '[]');
      console.log('Existing users:', users);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return res.status(500).json({ message: 'Error parsing JSON', error: parseError });
    }

    users.push(newUser);
    console.log('Updated users:', users);

    fs.writeFile(filePath, JSON.stringify(users, null, 2), (writeErr) => {
      if (writeErr) {
        console.error('Error writing file:', writeErr);
        return res.status(500).json({ message: 'Error writing file', error: writeErr });
      }
      console.log('File updated with new user:', newUser);
      res.json({ message: 'User added successfully', user: newUser });
    });
  });
});
app.get('/Users', (req, res) => {
  const { email, password } = req.query;
  console.log('GET request received with:', { email, password });

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading User.json:', err);
      return res.status(500).json({ message: 'Error reading user data', error: err });
    }

    let users;
    try {
      users = JSON.parse(data || '[]');
      console.log('Parsed users from file:', users);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return res.status(500).json({ message: 'Error parsing user data', error: parseError });
    }

    // Match user (case-insensitive email, exact password)
    const user = users.find(
      (u) =>
        u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        u.password.trim() === password.trim()
    );

    if (user) {
      console.log('User authenticated successfully:', user);
      return res.json({ message: 'Login successful', user });
    } else {
      console.log('No matching user found for:', { email, password });
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
