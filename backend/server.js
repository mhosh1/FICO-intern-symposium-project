// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'data', 'users.json');

// Initialize users.json if it doesn't exist
if (!fs.existsSync(USERS_FILE)) {
  fs.mkdirSync(path.dirname(USERS_FILE), { recursive: true });
  fs.writeFileSync(USERS_FILE, '[]');
}

app.use(cors());
app.use(bodyParser.json());

// Helper functions
const readUsers = () => JSON.parse(fs.readFileSync(USERS_FILE));
const writeUsers = (users) => fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

// Routes
app.get('/api/users', (req, res) => {
  res.json(readUsers());
});

// server.js
app.get('/api/users/check-username/:username', (req, res) => {
  try {
    const users = readUsers();
    const exists = users.some(u => u.username === req.params.username);
    res.json(exists);
  } catch (error) {
    console.error('Error checking username:', error);
    res.status(500).json(false);
  }
});

app.get('/api/users/check-email/:email', (req, res) => {
  try {
    const users = readUsers();
    const exists = users.some(u => u.email === req.params.email);
    res.json(exists);
  } catch (error) {
    console.error('Error checking email:', error);
    res.status(500).json(false);
  }
});

app.post('/api/users', (req, res) => {
  try {
    const users = readUsers();
    const newUser = {
      ...req.body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    writeUsers(users);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save user' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});