const expressConfig = require('./config/expressConfig');

const express = require('express');
const handlebars = require('express-handlebars');
const PORT = 3000;

const app = express();

expressConfig(app);



app.listen(PORT, () => {console.log(`Server is listening on port ${PORT}...`)});