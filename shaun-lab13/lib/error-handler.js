'use strict';

// const debug = require('debug')('http:error-middleware');

module.exports = function(err, req, res, next) {
  let msg = err.message.toLowerCase();

  switch(true) {
  case msg.includes('validation failed'): return res.status(400).send(`${err.name}: ${err.message}`);
  case msg.includes('duplicate key'): return res.status(409).send(`${err.name}: ${err.message}`);
  case msg.includes('objectid failed'): return res.status(404).send(`${err.name}: ${err.message}`);
  default: return res.status(500).send(`${err.name}: ${err.message}`);
  }
};
//   if(err.status) {
//     debug('user error');
//     res.status(err.status).send(err.name);
//     res.writeHead(400, 'Bad request; need more info');
//     res.write('you done did it now');
//     res.end();
//     next();
//     return;
//   }
//
//   debug('server error');
//   err = createError(500, err.message);
//   res.status(err.status).send(err.name);
//   next();
//   // implicit return
// };
