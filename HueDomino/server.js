const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');

const app = express();
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'HueDomino',
  password: 'Gesco122002',
  port: 5432,
});

const saltRounds = 10;

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Check password length
    if (password.length < 8) {
        return res.status(400).send('Password must be at least 8 characters');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);

    console.log(`Username: ${username}, Password: ${password}`);
    res.sendStatus(201);
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (passwordMatches) {
          // La password è corretta, il login è riuscito
          res.json({ success: true });
        } else {
          // La password è sbagliata, il login è fallito
          res.json({ success: false });
        }
      } else {
        // L'utente non esiste, il login è fallito
        res.json({ success: false });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
});

app.listen(3000, () => {
    console.log('Server avviato sulla porta 3000');
});