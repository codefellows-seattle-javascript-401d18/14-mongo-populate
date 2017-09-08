'use strict';

const Child = require('../model/child');
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-child');

module.exports = function(router) {
  router.post('/api/child', (req, res) => {
    debug('/api/child POST');

    return new Child(req.body).save()
      .then(child => res.status(201).json(child))
      .catch(err => errorHandler(err, req, res));
  });

  router.get('/api/child/:_id', (req, res) => {
    debug('/api/child/:_id GET');

    return Child.findById(req.params._id).populate('toy')
      .then(child => res.json(child))
      .catch(err => errorHandler(err, req, res));
  });

  router.get('/api/child', (req, res) => {
    debug('/api/child GET');

    return Child.find()
      .then(child => res.json(child.map(child => child._id)))
      .catch(err => errorHandler(err, req, res));
  });

  router.put('/api/child/:_id', (req, res) => {
    debug('/api/child PUT');

    return Child.findByIdAndUpdate(req.params._id, req.body, { upsert:true, runValidators:true })
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, req, res));
  });

  router.delete('/api/child/:_id', (req, res) => {
    debug('/api/child DELETE');

    return Child.findByIdAndRemove(req.params._id)
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, req, res));
  });

  router.delete('/api/child/', (req, res) => {
    debug('/api/child DELETE');

    return Promise.all([
      Child.remove(),
    ])
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, req, res));
  });
};