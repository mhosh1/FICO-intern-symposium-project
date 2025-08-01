const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;
const USERS_FILE = path.join(__dirname, 'users.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Load existing users
let users = [];
if (fs.existsSync(USERS_FILE)) {
  users = JSON.parse(fs.readFileSync(USERS_FILE, 'utf-8'));
}

// Save users to JSON file
function saveUsers() {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// API: Get all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// API: Add a new user
app.post('/api/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  saveUsers();
  res.json({ success: true, message: 'User saved!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});