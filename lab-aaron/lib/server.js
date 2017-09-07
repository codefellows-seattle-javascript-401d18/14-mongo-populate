'use strict';

const debug = require('debug')('http:server');

// setting up express
const express = require('express');
const app = express();
const router = express.Router();
debug('shut up debug');

// mongoose setup
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/toy-dev';
mongoose.Promise = require('bluebird');
mongoose.connect(MONGODB_URI, {useMongoClient: true});

// setting up middleware
const bodyParser = require('body-parser').json();
const cors = require('./cors-middleware');
const errorMiddleWare = require('./error-middleware');

// routes
require('../route/route-toy')(router);

// mount middleware
app.use(bodyParser);
app.use(cors);
app.use(router);

// always last to catch errors
app.use(errorMiddleWare);

app.all('/*', (req, res) => res.sendStatus(404));

module.exports = app;
