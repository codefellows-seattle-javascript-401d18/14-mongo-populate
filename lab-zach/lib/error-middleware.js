'use strict';


//Debug to see what and where things might go wrong.
const debug = require('debug')('http:error-middleware');

//exporting...
// error first, then request and response. next to move to next thing in stack
module.exports = function (err, req, res) {
  //to print if there is an error
  debug(`error-handler: ${err.message}`);
  // short hand variable for the err msg
  let msg = err.message.toLowerCase();
  //if error is true, some cases to go through. I! AM! THE ONE! To set the right error message for includes.
  switch(true) {
  case msg.includes('validation failed'): return res.status(400).send(`${err.name} : ${err.message}`);
  case msg.includes('duplicate key'): return res.status(409).send(`${err.name} : ${err.message}`);
  case msg.includes('objectid failed'): return res.status(404).send(`${err.name} : ${err.message}`);
  default : return res.status(500).send(`${err.name} : ${err.message}`);
  }
};
