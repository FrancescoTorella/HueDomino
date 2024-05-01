const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Rotta per la pagina principale
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Rotta per la pagina di login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login', 'login.html'));
});

// Rotta per la pagina di login
router.get('/signin', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login', 'signin', 'signin.html'));
});


// Rotta per la pagina journey
router.get('/journey', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'viaggio', 'viaggio.html'));
});

// Rotta per la pagina daily challenge
router.get('/daily_challenge', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'daily_challenge', 'sfida_giornaliera.html'));
});

// Rotta per la pagina duel
router.get('/duel', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'duello', 'duello.html'));
});

// Rotta per la pagina creator
router.get('/creator', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'creatore', 'creatore.html'));
});

// Rotta per la pagina italia
router.get('/journey/italy', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'viaggio', 'italia', 'italy.html'));
});

// Rotta per la pagina stati uniti 
router.get('/journey/usa', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'viaggio', 'usa', 'usa.html'));
});

// Rotta per la pagina islanda
router.get('/journey/iceland', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'viaggio', 'islanda', 'iceland.html'));
});

// Rotta per la pagina giappone
router.get('/journey/japan', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'viaggio', 'giappone', 'japan.html'));
});

// Rotta per la pagina canada
router.get('/journey/canada', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'viaggio', 'canada', 'canada.html'));
});

// Rotta per la pagina argentina
router.get('/journey/argentina', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'viaggio', 'argentina', 'argentina.html'));
});

// Rotta per la pagina australia 
router.get('/journey/australia', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'viaggio', 'australia', 'australia.html'));
});

// Rotta per la pagina francia
router.get('/journey/france', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'viaggio', 'francia', 'france.html'));
});

// Rotta per un livello
router.get('/journey/:levelNation/:levelNumber', (req, res) => {
    const { levelNation, levelNumber } = req.params;
    res.cookie('levelNation', levelNation ,{ maxAge: 60 * 60 * 1000});
    res.cookie('levelNumber', levelNumber ,{ maxAge: 60 * 60 * 1000});
    res.sendFile(path.join(__dirname, '..', 'public', 'viaggio', 'level', 'level.html'));
});

//rotta per il profilo
router.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'profilo', 'profilo.html'));
});


// Rotta per le immagini del profilo
router.get('/immagini_profilo/:imageName', (req, res) => {
    const { imageName } = req.params;
    const imagePath = path.join(__dirname, '..', 'immagini_profilo', imageName);

    console.log("Richiesta immagine:", imagePath);

    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error("Immagine non trovata:", imagePath);
            res.status(404).send("Immagine non trovata");
        } else {
            res.sendFile(imagePath);
        }
    });
});

//Rotta per cambiare immagine profilo
// Configura multer per salvare i file caricati nella cartella immagini_profilo
// Configura multer per salvare i file caricati nella cartella immagini_profilo
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
router.post('/upload-profile-image/:userId', upload.single('foto-profilo'), async (req, res) => { // Aggiungi :userId alla rotta
    const newProfileImagePath = `/immagini_profilo/user${req.params.userId}/profile.png`; // Usa req.params.userId invece di req.body['user-id']
    // Aggiorna il database con il nuovo percorso dell'immagine
    // ...
    res.send('Immagine del profilo caricata con successo');
});


module.exports = router;