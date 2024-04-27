const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { validateEmail, validatePassword } = require('../utils/utils.js');


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
    const result = await pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, hashedPassword, email]); 
    return result;
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

module.exports = { createUser, getUserByEmail, getUserByUsername };