'use strict';

const Toy = require('../model/toy');
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-toy');
//const Child = require('../model/child');

module.exports = function(router) {
  router.post('/api/toy', (req, res) => {
    debug('/api/toy POST');

    return new Toy(req.body).save()
      .then(toy => res.status(201).json(toy))
      .catch(err => errorHandler(err, req, res));
  });

  router.get('/api/toy/:_id', (req, res) => {
    debug('/api/toy/:_id GET');

    return Toy.findById(req.params._id)
      .then(toy => res.status(200).json(toy))
      .catch(err => errorHandler(err, req, res));
  });

  router.get('/api/toy', (req, res) => {
    debug('/api/toy GET all');

    return Toy.find()
      .then(toys => res.json(toys.map(toy => toy._id)))
      .catch(err => errorHandler(err, req, res));
  });

  router.put('/api/toy/:_id', (req, res) => {
    debug('/api/toy PUT');

    return Toy.findByIdAndUpdate(req.params._id, req.body, { upsert:true, runValidators:true })
      .then(() => res.status(204))
      .catch(err => errorHandler(err, req, res));
  });

  router.delete('/api/toy/:_id', (req, res) => {
    debug('/api/toy/:_id DELETE');

    return Toy.findByIdAndRemove(req.params._id)
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, req, res));
  });
};
