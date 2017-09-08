'use strict';

const Toy = require('../model/toy');
const errorHandler = require('../lib/error-handler');
const debug = require('debug')('http:route-toy');
const Child = require('../model/child');

module.exports = function(router) {
  router.post('/api/child/:c_id/toy', (req, res) => {
    debug('/api/child/:c_id/toy POST');

    let toy = req.body;
    Child.findById(req.params.c_id)
      .then(child => {
        toy.child = child._id;
        this.tempChild = child;
        return new Toy(toy).save();
      })
      .then(toy => {
        this.tempChild.toys.push(toy._id);
        this.tempChild.save();
        this.tempToy = toy;
      })
      .then(() => this.tempToy)
      .then(toy => res.status(201).json(toy))
      .catch(err => errorHandler(err, req, res));
  });

  router.get('/api/child/:c_id/toy/:t_id', (req, res) => {
    debug('/api/child/:_id/toy/:_id GET');

    return Toy.findById(req.params.t_id)
      .then(toy => res.status(200).json(toy))
      .catch(err => errorHandler(err, req, res));
  });

  router.get('/api/toy', (req, res) => {
    debug('/api/child/:c_id/toy GET all');

    return Toy.find()
      .then(toys => res.json(toys.map(toy => toy._id)))
      .catch(err => errorHandler(err, req, res));
  });

  router.put('/api/child/:c_id/toy/:t_id', (req, res) => {
    debug('/api/toy PUT');

    return Toy.findByIdAndUpdate(req.params.t_id, req.body, { upsert:true, runValidators:true })
      .then(toy => res.status(204).json(toy))
      .catch(err => errorHandler(err, req, res));
  });

  router.delete('/api/child/:c_id/toy/:t_id', (req, res) => {
    debug('/api/child/:c_id/toy/:t_id DELETE');

    return Toy.findByIdAndRemove(req.params.t_id)
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, req, res));
  });
};
