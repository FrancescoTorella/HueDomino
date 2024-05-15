const express = require('express');
const router = express.Router();
const db = require('../db/db');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/save-start-config', (req, res) => {
    console.log('Richiesta di salvataggio della configurazione iniziale del creator ricevuta.');
    const data = req.body;
    const outJsonPath = path.join(__dirname, '..', 'public', 'creatore', 'src', 'start-config.json');

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
    const finalColorConfigPath = path.join(__dirname, '..', 'public', 'creatore', 'src', 'final-color-config.json');

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
    const pathColor = path.join(__dirname, '..', 'public', 'creatore', 'src', 'color-combinations.json');

    fs.writeFile(pathColor, data, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Errore durante il salvataggio del file');
        } else {
            res.send('Combinazioni di colori salvate con successo');
        }
    });
});


module.exports = router;