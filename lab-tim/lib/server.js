'use strict';

const debug = require('debug')('http:server');
const PORT = process.env.PORT || 3000;
//require('dotenv').config();

// express setup
const express = require('express');
const router = express.Router();
const app = express();

// mongoose setup
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/toy-dev';
mongoose.Promise = require('bluebird');
mongoose.connect(MONGODB_URI, {useMongoClient: true});

// middleware
const bodyParser = require('body-parser').json();
const cors = require('./cors');

// routes
require('../route/route-toy')(router);
require('../route/route-child')(router);
// require('./route/route-family')(router)

// mount middleware
app.use(bodyParser);
app.use(cors);
app.use(router);

app.all('/*', (req, res) => res.sendStatus(404));

//module.exports = app;

const server = module.exports = {};
server.isOn = false;
server.start = () => {
  return new Promise((resolve, reject) => {
    if(!server || !server.isOn) {
      server.http = app.listen(PORT, () => {
        server.isOn = true;
        resolve();
      });
      return;
    }
    reject(new Error('server allread running'));
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(server.http && server.isOn) {
      return server.http.close(() => {
        server.isOn = false;
        resolve();
      });
    }
    reject(new Error('ther server is not running'));
  });
};
