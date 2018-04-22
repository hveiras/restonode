'use strict';

require('simple-errors');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 7342;
const routes = require('./routes/index');

app.use(bodyParser.json());

app.use('/api', routes);

app.listen(port);

console.log('server started on port: ' + port);
