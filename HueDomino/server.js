const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');

const app = express();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'HueDomino',
  password: 'Gesco122002',
  port: 5432,
});

const saltRounds = 10;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

// Serve static files from the "public" directory
app.use(express.static('public'));

app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Check password length
  if (password.length < 8) {
    return res.status(400).send('Password must be at least 8 characters');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Store the user in the database
  try {
    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
    res.status(201).send('User created');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Retrieve the user from the database
  try {
    const result = await pool.query('SELECT password FROM users WHERE username = $1', [username]);
    if (result.rows.length > 0) {
      const hashedPassword = result.rows[0].password;

      // Check the password
      if (await bcrypt.compare(password, hashedPassword)) {
        res.send('Login successful');
      } else {
        res.status(401).send('Incorrect password');
      }
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});