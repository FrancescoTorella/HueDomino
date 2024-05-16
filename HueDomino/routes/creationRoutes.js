const express = require('express');
const router = express.Router();
const db = require('../db/db');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const multer  = require('multer');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/save-start-config', (req, res) => {
    console.log('Richiesta di salvataggio della configurazione iniziale del creator ricevuta.');
    const data = req.body;
    const outJsonPath = path.join(__dirname, '..', 'public', 'creatore', 'src', 'level-try', 'start-config.json');

    fs.writeFile(outJsonPath, JSON.stringify(data), (err) => {
        if (err) {
            console.error('Errore nel salvataggio della configurazione dei bottoni sottili:', err);
            res.status(500).send('Errore nel salvataggio dei dati');
        } else {
            console.log('Configurazione dei bottoni sottili salvata con successo.');
            res.send('Dati salvati con successo');
        }
    });
});

router.post('/save-final-color-config', (req, res) => {
    console.log('Richiesta di salvataggio della configurazione finale dei colori ricevuta.');
    // Ottieni i dati dal corpo della richiesta
    const colorData = req.body;

    // Crea il percorso al file final-color-config.json
    const finalColorConfigPath = path.join(__dirname, '..', 'public', 'creatore',  'src', 'level-try', 'final-color-config.json');

    // Scrivi i dati nel file
    fs.writeFile(finalColorConfigPath, JSON.stringify(colorData), (err) => {
        if (err) {
            console.error('Errore nel salvataggio della configurazione dei colori:', err);
            res.status(500).send('Errore nel salvataggio della configurazione dei colori.');
        } else {
            console.log('Configurazione dei colori salvata con successo.');
            res.status(200).send('Configurazione dei colori salvata con successo.');
        }
    });
});

router.post('/save-color-combinations', (req, res) => {
    const data = req.body.data;
    const pathColor = path.join(__dirname, '..', 'public', 'creatore', 'src', 'level-try', 'color-combinations.json');

    fs.writeFile(pathColor, data, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore durante il salvataggio del file');
        } else {
            res.send('Combinazioni di colori salvate con successo');
        }
    });
});

router.post('/save-left-moves', (req, res) => {
    const movesNumber = req.body.movesNumber;
    const data = {
        leftMoves: movesNumber
    };
    const pathColor = path.join(__dirname, '..', 'public', 'creatore', 'src','level-try',  'left-moves.json');

    fs.writeFile(pathColor, JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore durante il salvataggio del file');
        } else {
            res.send('Mosse rimanenti salvate con successo');
        }
    });
});

// Configura multer per caricare i file nella cartella 'uploads'
const finalImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public', 'creatore', 'src', 'level-try'))
    },
    filename: function (req, file, cb) {
        cb(null, 'completed.png')
    }
});

const uploadLevelImage = multer({ storage: finalImageStorage });

router.post('/upload-completed-image', uploadLevelImage.single('photoUpload'), (req, res) => {
    res.send('File caricato con successo');
});



router.post('/upload-created-level', (req, res) => {
    const userId = req.body.userId; // Ottieni l'ID dell'utente dalla richiesta

    // Crea la cartella dell'utente se non esiste già
    const userFolder = path.join(__dirname, '..', 'public', 'creatore', 'livelli_utenti', 'user' + userId);
    if (!fs.existsSync(userFolder)) {
        fs.mkdirSync(userFolder);
    }

    // Trova il primo numero di livello disponibile
    let levelNumber = 1;
    while (fs.existsSync(path.join(userFolder, 'level' + levelNumber))) {
        levelNumber++;
    }

    // Crea la cartella del livello
    const levelFolder = path.join(userFolder, 'level' + levelNumber);
    fs.mkdirSync(levelFolder);

    // Leggi i file dalla posizione predefinita
    const sourceFolder = path.join(__dirname, '..', 'public', 'creatore', 'src', 'level-try');
    fs.readdir(sourceFolder, (error, files) => {
        if (error) {
            console.log('Si è verificato un errore durante la lettura dei file:', error);
            res.status(500).send('Si è verificato un errore durante la lettura dei file');
        } else {
            // Copia ogni file nella cartella del livello
            files.forEach(file => {
                const sourcePath = path.join(sourceFolder, file);
                const destinationPath = path.join(levelFolder, file);
                fs.copyFile(sourcePath, destinationPath, (error) => {
                    if (error) {
                        console.log('Si è verificato un errore durante la copia del file:', error);
                        res.status(500).send('Si è verificato un errore durante la copia del file');
                    }
                });
            });

            res.send('File caricati con successo');
        }
    });
});


module.exports = router;