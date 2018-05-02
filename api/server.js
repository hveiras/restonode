'use strict';

require('simple-errors');

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 7342;
const routes = require('./lib/routes/index');
const config = require('config');

if (!config.rabbitmq) throw Error.create('rabbitmq config key is required!');

app.use(bodyParser.json());

app.use('/api', routes);

app.listen(port);

console.log('server started on port: ' + port);
