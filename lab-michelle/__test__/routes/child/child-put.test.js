'use strict';

const childMock = require('../../lib/mocks').child;
const server = require('../../../lib/server');
const superagent = require('superagent');
const faker = require('faker');

describe('Testing child routes', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(childMock.removeAll);

  describe('Put request', () => {
    test('should return a 204 No Content', () => {
      return superagent.put(`:4000/api/child/${this.child._id}`)
      .send({name: 'Penguino'})
      .then(res => {
        expect(res.status).toBe(204);
      });
    });
    test('should return an updated record from the DB', ()=> {
      return superagent.get(`:4000/api/child/${this.child._id}`)
      .then(res => {
        expect(res.body.name).toBe('Penguino');
      });
    });
  });
  describe('Invalid requests', ()=> {
    test('should return a 404 Not Found given a bad _id', ()=> {
      return superagent.put(`:4000/api/child/nopenope`)
      .send({name:'agent carter'})
      .catch(err => {
        expect(err.status).toBe(404);
      });
    });
    test('should return a 400 given bad req data', ()=> {
      return superagent.put(`:4000/api/child/${this.child._id}`)
      .send({whatzit:'thingamajig'})
      .catch(err => {
        expect(err.status).toBe('400');
      });
    });
  });
});
