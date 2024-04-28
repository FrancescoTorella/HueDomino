const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { validateEmail, validatePassword } = require('../utils/utils.js');
const { v4: uuidv4 } = require('uuid');


// Crea un nuovo pool di connessioni PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'HueDomino',
    password: 'Gesco122002',
    port: 5432,
});


class ValidationError extends Error {
    constructor(message) {
      super(message);
      this.code = 'VALIDATION_ERROR';
    }
}
  
async function createUser(username, password, email) {
    // Validate the email and password
    if (!validateEmail(email)) {
      throw new ValidationError('Invalid email format');
    }
  
    if (!validatePassword(password)) {
      throw new ValidationError('Password must be at least 8 characters');
    }  
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    // Store the user in the database
    const result = await pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id', [username, hashedPassword, email]);
    return result.rows[0];
}

// Funzione per ottenere un utente dal database per username
async function getUserByUsername(username) {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    return result.rows[0];
}

// Funzione per ottenere un utente dal database per email
async function getUserByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
}

async function checkPlayable(userId) {
  const result = await pool.query(
    'SELECT levelNumber, levelNation FROM playable WHERE userID = $1',
    [userId]
  );

  return result.rows;
}

async function checkPassed(userId) {
  const result = await pool.query(
    'SELECT levelNumber, levelNation FROM passed WHERE userID = $1',
    [userId]
  );

  return result.rows;
}

async function insertPassedLevel(userId, levelNumber, levelNation) {
  const result = await pool.query('INSERT INTO passed (userid, levelnumber, levelNation) VALUES ($1, $2, $3) ON CONFLICT (userid, levelnumber, levelNation) DO NOTHING RETURNING *', [userId, levelNumber, levelNation]);
  // Se l'entry esiste già, restituisci un oggetto vuoto
  if (result.rows.length === 0) {
    return {};
  } else {
    return result.rows[0];
  }
}

async function createSession(userId) {
  // Genera un ID di sessione univoco
  const sessionId = uuidv4();

  // Calcola la data di scadenza della sessione
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1); // La sessione scade dopo 1 ora

  // Inserisci la nuova sessione nel database
  const query = 'INSERT INTO sessions (session_id, user_id, expires_at) VALUES ($1, $2, $3)';
  await pool.query(query, [sessionId, userId, expiresAt]);

  // Restituisci l'ID della sessione
  return sessionId;
}

module.exports = { createUser, getUserByEmail, getUserByUsername, checkPlayable, checkPassed,insertPassedLevel, createSession };