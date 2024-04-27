const express = require('express');
const router = express.Router();
const path = require('path');

// Rotta per la pagina principale
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

// Rotta per la pagina di login
router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
});


module.exports = router;