const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db/db');
const multer = require('multer');
const bodyParser = require('body-parser');
const fs = require('fs');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/authenticate', async (req, res) => {
    const { username, password } = req.body;
  
    // Get the user from the database by username or email
    const user = await db.getUserByUsername(username) || await db.getUserByEmail(username);
    if (user) {
      // Compare the provided password with the hashed password in the database
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        // Login successful
        const sessionId = await db.createSession(user.id,res);
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
    console.log('Ricevuto una richiesta di registrazione');
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
        // res.cookie('loggedIn', true, { maxAge: 60 * 60 * 1000});
        // res.cookie('userId', user.id, { maxAge: 60 * 60 * 1000});
        const sessionId = await db.createSession(user.id,res);
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

router.get('/session/:id', async (req, res) => {
  const session = await db.getSession(req.params.id);
  if (session) {
    res.json(session);
  } else {
    res.status(404).json({ message: 'Session not found' });
  }
});


router.get('/checkPlayable', async (req, res) => {
  const userId = req.query.userId;

  try {
    const playableLevels = await db.checkPlayable(userId);

    //console.log(playableLevels);

    res.json({ playableLevels });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Si è verificato un errore durante la verifica del livello giocabile' });
  }
});

router.get('/checkPassed', async (req, res) => {
  const userId = req.query.userId;

  try {
    const passedLevels = await db.checkPassed(userId);

    //console.log(playableLevels);

    res.json({ passedLevels });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Si è verificato un errore durante la verifica del livello passato' });
  }
});

router.post('/api/passed', async (req, res) => {
  const { userId, levelNumber, levelNation } = req.body;

  try {
    const result = await db.insertPassedLevel(userId, levelNumber, levelNation);
    res.json(result);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
  }
});

//gestisci la richiesta di informazioni sull'utente
router.get('/utente/:id', async (req, res) => {
    console.log('Richiesta di informazioni sull\'utente', req.params.id); 
    const user = await db.getUserById(req.params.id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Utente non trovato' });
    }
});


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = `./immagini_profilo/user${req.params.userId}`; // Usa req.params.userId invece di req.body['user-id']
    fs.exists(dir, exist => {
      if (!exist) {
        return fs.mkdir(dir, error => cb(error, dir))
      }
      return cb(null, dir)
    })
  },
  filename: (req, file, cb) => {
    cb(null, 'profile.png'); // qui sovrascriviamo sempre l'immagine esistente
  }
});

const upload = multer({ storage: storage });

// Rotta POST per l'upload dell'immagine del profilo
router.post('/upload-profile-image/:userId', upload.single('foto-profilo'), async (req, res) => {
  const newProfileImagePath = `http://localhost:3000/immagini_profilo/user${req.params.userId}/profile.png`;

  try {
      // Trova l'utente nel database utilizzando l'ID dell'utente
      const user = await db.updateUserProfileImage(req.params.userId,newProfileImagePath);

      if (!user) {
          res.status(404).send('Utente non trovato');
          return;
      }
    

      res.send('Immagine del profilo caricata con successo');
  } catch (error) {
      console.error(error);
      res.status(500).send('Si è verificato un errore durante l\'aggiornamento dell\'immagine del profilo');
  }
});


// Rotta POST per l'aggiornamento della descrizione dell'utente
router.post('/update-description/:userId', async (req, res) => {
  const newDescription = req.body.description;

  console.log('Aggiornamento della descrizione dell\'utente', req.params.userId, newDescription);

  try {
      // Trova l'utente nel database utilizzando l'ID dell'utente
      const user = await db.updateDescription(req.params.userId,newDescription);

      if (!user) {
          res.status(404).send('Utente non trovato');
          return;
      }

      res.send('Descrizione aggiornata con successo');
  } catch (error) {
      console.error(error);
      res.status(500).send('Si è verificato un errore durante l\'aggiornamento della descrizione');
  }
});

// Rotta POST per l'aggiornamento dello username
router.post('/update-username/:userId', async (req, res) => {
  const newUsername = req.body.username;
  const password = req.body.password;

  console.log('Aggiornamento dello username dell\'utente', req.params.userId, newUsername);

  try {
      // Trova l'utente nel database utilizzando l'ID dell'utente
      const user = await db.updateUsername(req.params.userId, newUsername, password);

      if (!user) {
          res.status(404).send('Utente non trovato');
          return;
      }

      res.send('Username aggiornato con successo');
  } catch (error) {
      if(error.message === 'Username already in use'){
          res.status(409).send('Username già in uso');
      }else if(error.message === 'Incorrect Password'){
          res.status(401).send('Password errata');
      }else{
          res.status(500).send('Si è verificato un errore durante l\'aggiornamento dello username');
      }
  }
});

// Rotta POST per l'aggiornamento dell'email
router.post('/update-email/:userId', async (req, res) => {
  const newEmail = req.body.email;
  const password = req.body.password;

  console.log('Aggiornamento dell\'email dell\'utente', req.params.userId, newEmail);

  try {
      // Trova l'utente nel database utilizzando l'ID dell'utente
      const user = await db.updateEmail(req.params.userId, newEmail, password);

      if (!user) {
          res.status(404).send('Utente non trovato');
          return;
      }

      res.send('Email aggiornata con successo');
  } catch (error) {
    if(error.message === 'Email already in use'){
      res.status(409).send('Email già in uso');
    }else if(error.message === 'Incorrect Password'){
        res.status(401).send('Password errata');
    }else if(error.message === 'Invalid email format'){
        res.status(400).send('Formato email non valido');
    }
    else{
        res.status(500).send('Si è verificato un errore durante l\'aggiornamento dello username');
    }
  }
});


//Rotta per l'aggiornamento della password
router.post('/update-password/:userId', async (req, res) => {
  const newPassword = req.body.newPassword;
  const oldPassword = req.body.oldPassword;

  console.log('Aggiornamento della password dell\'utente', req.params.userId);

  try {
      // Trova l'utente nel database utilizzando l'ID dell'utente
      const user = await db.updatePassword(req.params.userId, oldPassword, newPassword);

      if (!user) {
          res.status(404).send('Utente non trovato');
          return;
      }

      res.send('Password aggiornata con successo');
  } catch (error) {
      if(error.message === 'Incorrect Password'){
          res.status(401).send('Password errata');
      }else if(error.message === 'Password must be at least 8 characters'){
          res.status(400).send('La password deve essere lunga almeno 8 caratteri');
      }
      else{
          res.status(500).send('Si è verificato un errore durante l\'aggiornamento della password');
      }
  }
});



module.exports = router;