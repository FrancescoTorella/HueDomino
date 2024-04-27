

const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const pageRoutes = require('./routes/pageRoutes');

app.use(express.json());
app.use(express.static('public'));

app.use(authRoutes);
app.use(pageRoutes);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});