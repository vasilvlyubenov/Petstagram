const express = require('express');

const expressConfig = require('./config/expressConfig');
const handlebarsConfig = require('./config/handlebarsConfig');
const PORT = 3000;

const app = express();

expressConfig(app);
handlebarsConfig(app);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => { console.log(`Server is listening on port ${PORT}...`) });