//importa i moduli necessari
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const app = express();
const csvParser = require('csv-parser');

//specificare la cartella contenente i file statici
app.use(express.static('src')); 

//aggiungere il middleware per il parsing del body delle richieste
app.use(bodyParser.json({limit: '50mb'}));

// Gestisci la richiesta POST per salvare i dati
app.post('/save', (req, res) => {
    const data = req.body;
    fs.writeFile('out.json', JSON.stringify(data), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.status(200).send('Data saved successfully');
        }
    });
});

//scrive sul terminale il messaggio di avvio del server
app.listen(3000, () => console.log('Server listening on port 3000'));

// Gestisci la richiesta GET per caricare i dati
app.get('/load', (req, res) => {
    fs.readFile('out.json', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else {
            res.status(200).send(JSON.parse(data));
        }
    });
});

app.get('/convert-csv', (req, res) => {
    const results = [];

    fs.createReadStream('out.csv')
        .pipe(csvParser({
            mapHeaders: ({ header }) => header === 'THINID' ? 'id' : header.toLowerCase()
        }))
        .on('data', (data) => {
            // Converti il campo 'selected' da stringa a booleano
            data.selected = data.selected === '1';
            results.push(data);
        })
        .on('end', () => {
            res.json(results);
        });
});