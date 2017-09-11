'use strict';

const debug = require('debug')('http:index');
const server = require('./lib/server');


server.start();

//listen(PORT, () => debug(`Listening on ${PORT}`));
