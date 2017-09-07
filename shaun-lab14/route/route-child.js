'use strict';

const debug = require('debug')('http:route-child');
const errorHandler = require('../lib/error-handler');
const Child = require('../model/child');

module.exports = function(router) {
  debug('#route-child');
  // POST
  router.post('/api/child', (req, res) => {
    debug('/api/child POST');

    return new Child(req.body).save()
      .then(child => res.status(201).json(child))
      .catch(err => errorHandler(err, req, res));
  });
  // GET
  router.get('/api/child/:_id', (req, res) => {
    debug('/api/child GET');


    return Child.findById(req.params._id)
      .populate('toys')
      .then(child => res.json(child))
      .catch(err => errorHandler(err, req, res));
  });

  // GET ALL
  router.get('/api/child', (req, res) => {
    debug('/api/child GETALL');
    return Child.find()
      .then(children => res.json(children.map(child => child._id)))
      .catch(err => errorHandler(err, req, res));
  });
  // PUT
  router.put('/api/child/:_id', (req, res) => {
    debug('/api/child PUT');

    Child.findByIdAndUpdate(req.params._id, req.body, {upsert:true, runValidators:true})
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, req, res));
  });
  // DELETE
  router.delete('/api/child/:_id', (req, res) => {
    debug('/api/child DELETE');

    return Child.findByIdAndRemove(req.params._id)
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, req, res));
  });
};
