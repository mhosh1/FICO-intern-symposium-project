// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();


const app = express();
const db = new sqlite3.Database('./users.db');

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

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }
  
    const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
    db.get(query, [username, password], (err, row) => {
      if (err) {
        console.error('Error querying the database:', err.message);
        return res.status(500).json({ error: 'Internal server error.' });
      }
  
      if (row) {
        // User found
        res.status(200).json({ message: 'Login successful!', user: row });
      } else {
        // User not found
        res.status(401).json({ error: 'Invalid username or password.' });
      }
    });
  });
  // Start the server
  app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });