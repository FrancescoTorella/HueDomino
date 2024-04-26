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

//definisce una primitiva in risposta alla richiesta GET
app.post('/save', (req, res) => {
    //crea un writer per scrivere il file CSV
    const csvWriter = createCsvWriter({
        path: 'out.csv',
        header: [
            {id: 'thinId', title: 'THINID'},
            {id: 'selected', title: 'SELECTED'},
        ]
    });
    //estrae i dati dalla richiesta e li scrive nel file CSV
    const records = req.body.map(({thinId, selected}) => ({thinId, selected}));

    //manda una conferma di avvenuta scrittura
    csvWriter.writeRecords(records)
        .then(() => res.send('The CSV file was written successfully'));
});

//scrive sul terminale il messaggio di avvio del server
app.listen(3000, () => console.log('Server listening on port 3000'));

//definisce una primitiva in risposta alla richiesta GET per caricare i dati dal file CSV
app.get('/load', (req, res) => {
    const results = [];

    //legge il file CSV e lo invia come risposta
    fs.createReadStream('out.csv')
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            res.send(results);
        });
});