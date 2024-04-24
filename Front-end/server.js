const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    console.log(`Username: ${username}, Password: ${password}`);
    res.sendStatus(201);
});

app.listen(3000, () => {
    console.log('Server avviato sulla porta 3000');
});