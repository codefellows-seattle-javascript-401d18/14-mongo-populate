'use strict';

const debug = require('debug')('http:route-child');
const errorHandler = require('../lib/error-handler');
const Child = require('../model/child');

module.exports = function(router) {
  debug('#route-child');

  router.post('/api/child', (req, res) => {
    debug('/api/child POST');

    return new Child(req.body).save()
    .then(child => res.status(201).json(child))
    .catch(err => errorHandler(err, req, res));
  });

  router.get('/api/toy/:_id', (req, res) => {
    debug('/api/toy/:_id GET');

    return Child.findById(req.params._id)
      .then(toy => res.status(200).json(toy))
      .catch(err => errorHandler(err, req, res));
  });

  router.get('/api/toy', (req, res) => {
    debug('/api/toy GET all');

    return Child.find()
      .then(toys => res.json(toys.map(toy => toy._id)))
      .catch(err => errorHandler(err, req, res));
  });

  router.put('/api/toy/:_id', (req, res) => {
    debug('/api/toy PUT');

    return Child.findByIdAndUpdate(req.params._id, req.body, { upsert:true, runValidators:true })
      .then(toy => res.status(204).json(toy))
      .catch(err => errorHandler(err, req, res));
  });

  router.delete('/api/toy/:_id', (req, res) => {
    debug('/api/toy DELETE');

    return Child.findByIdAndRemove(req.params._id)
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, req, res));
  });
};
