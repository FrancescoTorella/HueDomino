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
  const { username, password, email } = req.body;

  // Check email format
  const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).send('Invalid email format');
  }

  // Check password length
  if (password.length < 8) {
    return res.status(400).send('Password must be at least 8 characters');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Store the user in the database
  try {
    const result = await pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, hashedPassword, email]); 
    res.cookie('loggedIn', 'true', { maxAge: 900000 });
    res.status(201).send('User created');
  } catch (err) {
    if (err.code === '23505') {
      if (err.detail.includes('username')) {
        res.status(409).send('Username already in use');
      } else if (err.detail.includes('email')) {
        res.status(409).send('Email already in use');
      }
    } else {
      console.error(err);
      res.status(500).send('Server error');
    }
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $1', [username]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        res.cookie('loggedIn', 'true', { maxAge: 900000 });
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Incorrect username or password');
      }
    } else {
      res.status(401).send('Incorrect username or password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});