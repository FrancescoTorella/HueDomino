const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

router.use(bodyParser.json());


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
    res.sendFile(path.join(__dirname, '..', 'public', 'creatore', 'src', 'index.html'));
});

//Rotta per la prova del livello
router.get('/creator/level-try', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'creatore', 'src', 'level', 'level.html'));
});

router.get('/creator/level-play', (req, res) => {
    // Invia il file HTML come risposta
    res.sendFile(path.join(__dirname, '..', 'public', 'creatore', 'src', 'level', 'level.html'));
});

// Rotta per la pagina italia
router.get('/journey/italy', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'viaggio', 'italy', 'italy.html'));
});

// Rotta per la pagina stati uniti 
router.get('/journey/usa', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'viaggio', 'usa', 'usa.html'));
});

// Rotta per la pagina islanda
router.get('/journey/iceland', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'viaggio', 'iceland', 'iceland.html'));
});

// Rotta per la pagina giappone
router.get('/journey/japan', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'viaggio', 'japan', 'japan.html'));
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
    res.sendFile(path.join(__dirname, '..', 'public', 'viaggio', 'france', 'france.html'));
});

// Rotta per un livello
router.get('/journey/:levelNation/:levelNumber', (req, res) => {
    const { levelNation, levelNumber } = req.params;
    res.cookie('levelNation', levelNation ,{ maxAge: 1 * 60 * 1000});
    res.cookie('levelNumber', levelNumber ,{ maxAge: 1 * 60 * 1000});
    res.sendFile(path.join(__dirname, '..', 'public', 'viaggio', 'level', 'level.html'));
});

//rotta per il profilo
router.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'profilo', 'profilo.html'));
});


// Rotta per le immagini del profilo di default
router.get('/immagini_profilo/:imageName', (req, res) => {
    const { imageName } = req.params;
    const imagePath = path.join(__dirname, '..', 'immagini_profilo', imageName);

    //console.log("Richiesta immagine:", imagePath);

    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error("Immagine non trovata:", imagePath);
            res.status(404).send("Immagine non trovata");
        } else {
            res.sendFile(imagePath);
        }
    });
});

//rotta per le immagini di profilo personalizzate
router.get('/immagini_profilo/user:id/:imageName', (req, res) => {
    const { id, imageName } = req.params;
    const imagePath = path.join(__dirname, '..', 'immagini_profilo', `user${id}`, imageName);

    //console.log("Richiesta immagine:", imagePath);

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


module.exports = router;
