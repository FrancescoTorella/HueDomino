const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db/db');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');

router.post('/authenticate', async (req, res) => {
    const { username, password } = req.body;
  
    // Get the user from the database by username or email
    const user = await db.getUserByUsername(username) || await db.getUserByEmail(username);
    if (user) {
      // Compare the provided password with the hashed password in the database
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        // Login successful
        res.cookie('loggedIn', true, { maxAge: 60 * 60 * 1000});
        res.cookie('userId', user.id, { maxAge: 60 * 60 * 1000});
        res.status(200).json({ message: 'Login successful' });
        
      } else {
        // Login failed
        res.status(401).json({ message: 'Incorrect password' });
      }
    } else {
      // User not found
      res.status(404).json({ message: 'Incorrect username or email' });
    }
});


// Rotta per registrare un nuovo utente
router.post('/register', async (req, res) => {
    const { username, password, email } = req.body;

    // Controlla se l'username o l'email sono già stati presi
    const existingUser = await db.getUserByUsername(username);
    if (existingUser) {
        return res.status(409).json({ message: 'Username already in use' });
    }

    const existingUserByEmail = await db.getUserByEmail(email);
    if (existingUserByEmail) {
        return res.status(409).json({ message: 'Email already in use' });
    }

    // Prova a registrare il nuovo utente nel database
    try {
        const user = await db.createUser(username, password, email);
        // Registrazione riuscita
        res.cookie('loggedIn', true, { maxAge: 60 * 60 * 1000, httpOnly: true });
        res.cookie('userId', user.id, { maxAge: 60 * 60 * 1000, httpOnly: true });
        res.status(201).json({ message: 'Registrazione riuscita' });
        
    } catch (error) {
        // Registrazione fallita
        if (error.message === 'Invalid email format' || error.message === 'Password must be at least 8 characters') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Errore durante la registrazione' });
        }
    }
});


router.get('/checkPlayable', async (req, res) => {
  const userId = req.query.userId;

  try {
    const playableLevels = await db.checkPlayable(userId);

    console.log(playableLevels);

    res.json({ playableLevels });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Si è verificato un errore durante la verifica del livello giocabile' });
  }
});

module.exports = router;