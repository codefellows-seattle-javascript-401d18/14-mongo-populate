//Copied over from lab 13
'use strict';

const debug = require('debug')('http:error-middleware');

module.exports = function(err, req, res) {
  debug(`#errorHandler: ${err.message}`);

  let message = err.message.toLowerCase();

  switch(true) {

  case message.includes('validation failed'): return res.status(400).send(`${err.name}L ${err.message}`);
  case message.includes('duplicate key'): return res.status(409).send(`${err.name}L ${err.message}`);
  case message.includes('ObjectId failed'): return res.status(404).send(`${err.name}L ${err.message}`);
  default: return res.status(500).send(`${err.name}: ${err.message}`);
  }
};
