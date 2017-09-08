'use strict';
//debugger
const debug = require('debug')('http:server');
require('dotenv').config();
//express app object, and router object
const express = require('express');
const app = express();
const router = express.Router();

//Setting up mongoose.
const mongoose = require('mongoose');
//The URI will be they DB?
const MONGODB_URI = process.env.MONGODB_URI;
//Promisifying mongoose for usage of then, catch.
mongoose.Promise = require('bluebird');
//connecting to the mongo server.
mongoose.connect(MONGODB_URI, {useMongoClient: true});

//makes error objects by status code?
const errorMiddleware = require('./error-middleware');

//routes (endpoints)

// router is called at the end to mount the endpoint?
require('../route/route-toy')(router);
require('../route/route-child');

//mounting to express
app.use(require('body-parser').json());
app.use(require('cors')());
app.use(router);
//always put testing last, so it catched all the modules before it
app.use(errorMiddleware);

app.all('/*', (req, res) => res.sendStatus(404));

module.exports = app;
