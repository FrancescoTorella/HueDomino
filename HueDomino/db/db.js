const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const { validateEmail, validatePassword } = require('../utils/utils.js');
const { v4: uuidv4 } = require('uuid');


// Crea un nuovo pool di connessioni PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'HueDomino',
    password: 'HueDomino',
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
// Funzione per ottenere un utente dal database per ID
async function getUserById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
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

async function updateUserProfileImage(userId, newProfileImagePath) {
  const query = `
      UPDATE users
      SET path_to_profile_picture = $1
      WHERE id = $2
  `;

  try {
      const result = await pool.query(query, [newProfileImagePath, userId]);
      return result.rowCount > 0; // Restituisce true se almeno una riga è stata aggiornata
  } catch (error) {
      console.error(error);
      return false;
  }
}

async function updateDescription(userId, newDescription) {
  const query = `
      UPDATE users
      SET description = $1
      WHERE id = $2
  `;

  try {
      const result = await pool.query(query, [newDescription, userId]);
      return result.rowCount > 0; // Restituisce true se almeno una riga è stata aggiornata
  } catch (error) {
      console.error(error);
      return false;
  }
}

async function updateUsername(userId, newUsername, password) {
  

  //verifica se la nuova username è già in uso
  const usernameInUse = await pool.query('SELECT * FROM users WHERE username = $1', [newUsername]);
  if (usernameInUse.rows.length > 0) {
      throw new ValidationError('Username already in use');
  }

  // Trova l'utente nel database utilizzando l'ID dell'utente
  const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

  // Verifica se la password fornita corrisponde alla password dell'utente
  const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

  if (!passwordMatch) {
      throw new ValidationError('Incorrect Password');
  }

  // Se la password è corretta, aggiorna l'username dell'utente
  const result = await pool.query('UPDATE users SET username = $1 WHERE id = $2', [newUsername, userId]);
  return result.rowCount > 0; // Restituisce true se almeno una riga è stata aggiornata
}

//funzione per l'aggiornamento dell' email
async function updateEmail(userId, newEmail, password) {
  // Verifica se la nuova email è valida
  if (!validateEmail(newEmail)) {
      throw new Error('Invalid email format');
  }

  // Verifica se la nuova email è già in uso
  const emailInUse = await pool.query('SELECT * FROM users WHERE email = $1', [newEmail]);
  if (emailInUse.rows.length > 0) {
      throw new Error('Email already in use');
  }

  // trova l'utente nel database utilizzando l'ID dell'utente
  const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

  console.log(password);

  // Verifica se la password fornita corrisponde alla password dell'utente
  const passwordMatch = await bcrypt.compare(password, user.rows[0].password);

  if (!passwordMatch) {
      throw new Error('Incorrect Password');
  }

  // Se la password è corretta, aggiorna l'email dell'utente
  const result = await pool.query('UPDATE users SET email = $1 WHERE id = $2', [newEmail, userId]);
  return result.rowCount > 0; // Restituisce true se almeno una riga è stata aggiornata
}


//funzione per l'aggiornamento della password
async function updatePassword(userId, oldPassword, newPassword) {
  const user = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);

  // Stampa le password per il debug
  console.log('Old password:', oldPassword);
  console.log('New password:', newPassword);

  // Verifica se la password fornita corrisponde alla password dell'utente
  const passwordMatch = await bcrypt.compare(oldPassword, user.rows[0].password);

  if (!passwordMatch) {
      throw new ValidationError('Incorrect Password');
  }

  if(!validatePassword(newPassword)){
      throw new ValidationError('Password must be at least 8 characters');
  }

  // Se la password è corretta, aggiorna la password dell'utente
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
  const result = await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);
  return result.rowCount > 0; // Restituisce true se almeno una riga è stata aggiornata
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

async function createSession(userId,res) {
  // Genera un ID di sessione univoco
  const sessionId = uuidv4();

  // Calcola la data di scadenza della sessione
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 1); // La sessione scade dopo 1 ora

  // Inserisci la nuova sessione nel database
  const query = 'INSERT INTO sessions (session_id, user_id, expires_at) VALUES ($1, $2, $3)';
  await pool.query(query, [sessionId, userId, expiresAt]);

  res.cookie('sessionId', sessionId, { maxAge: 240 * 60 * 1000 });

  // Restituisci l'ID della sessione
  return sessionId;
}

async function getSession(sessionId) {
  // Esegui una query per cercare la sessione con l'ID specificato
  const query = 'SELECT * FROM sessions WHERE session_id = $1';
  const result = await pool.query(query, [sessionId]);

  // Se la query ha restituito una riga, restituisci quella riga
  if (result.rows.length > 0) {
    return result.rows[0];
  }

  // Altrimenti, restituisci null
  return null;
}

async function getStatistics(userId) {
  // Query per contare il numero totale di livelli giocati dall'utente
  const levelsQuery = 'SELECT COUNT(*) FROM passed WHERE userid = $1';
  const levelsResult = await pool.query(levelsQuery, [userId]);
  const livelliSuperati = levelsResult.rows[0].count;



  // Query per contare il numero di mondi unici giocati dall'utente
  const worldsQuery = 'SELECT COUNT(DISTINCT levelnation) FROM passed WHERE userid = $1';
  const worldsResult = await pool.query(worldsQuery, [userId]);
  const mondiGiocati = worldsResult.rows[0].count;

  //Query per contare il numero di amici dell'utente
  const friendsQuery = 'SELECT COUNT(*) FROM friendship WHERE userid1 = $1';
  const friendsResult = await pool.query(friendsQuery, [userId]);
  const amici = friendsResult.rows[0].count;

  // Restituisci le statistiche
  return {
      livelliSuperati: livelliSuperati,
      mondiGiocati: mondiGiocati,
      numeroAmici: amici
  };
}

async function addFriend(userId, friendId) {
  try {
      const result = await pool.query('INSERT INTO friendship (userid1, userid2) VALUES ($1, $2) ON CONFLICT (userid1, userid2) DO NOTHING', [userId, friendId]);
      return result;
  } catch (error) {
      console.error(error);
      throw error;
  }
}

async function getFriends(userId) {
  try {
      const result = await pool.query('SELECT * FROM friendship WHERE userid1 = $1', [userId]);
      return result.rows;
  } catch (error) {
      console.error(error);
      throw error;
  }
}

async function removeFriend(userId, friendId) {
  try {
      const result = await pool.query('DELETE FROM friendship WHERE userid1 = $1 AND userid2 = $2', [userId, friendId]);
      return result;
  } catch (error) {
      console.error(error);
      throw error;
  }
}

async function getLevels(userId) {
  try {
      const result = await pool.query('SELECT * FROM passed WHERE userid = $1', [userId]);
      return result.rows;
  }catch(error) {
      console.error(error);
      throw error;
  }
}



module.exports = { 
  createUser, 
  getUserByEmail, 
  getUserByUsername, 
  checkPlayable, 
  checkPassed,
  insertPassedLevel, 
  createSession, 
  getSession,
  getUserById,
  updateUserProfileImage,
  updateDescription,
  updateUsername,
  updatePassword,
  updateEmail,
  getStatistics,
  addFriend,
  getFriends,
  removeFriend,
  getLevels
 };