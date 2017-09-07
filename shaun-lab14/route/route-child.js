'use strict';

const Child = require('../model/child');
const debug = require('debug')('http:route-child');
const errorHandler = require('../lib/error-handler');

module.exports = function(router) {
  router.post('/api/child', (req, res) => {
    debug('/api/child POST');

    return new Child(req.body).save()
      .then(child => res.status(201).json(child))
      .catch(err => errorHandler(err, req, res));
  });

  router.get('/api/child/:_id', (req, res) => {
    debug('/api/child/:_id GET');

    return Child.findById(req.params._id)
      .then(child => res.json(child))
      .catch(err => errorHandler(err, req, res));
  });

  router.get('/api/child', (req, res) => {
    debug('/api/child GET');

    return Child.find()
      .then(child => res.json(child))
      .catch(err => errorHandler(err, req, res));
  });

  router.put('/api/child/:_id', (req, res) => {
    debug('/api/child PUT');

    return Child.findByIdAndUpdate(req.params._id, req.body, {new:true})
      .then(child => res.json(child))
      .catch(err => errorHandler(err, req, res));
  });

  router.delete('/api/child/:_id', (req, res) => {
    debug('/api/child DELETE');

    return Child.findByIdAndUpdate(req.params._id).remove()
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, req, res));
  });
};
