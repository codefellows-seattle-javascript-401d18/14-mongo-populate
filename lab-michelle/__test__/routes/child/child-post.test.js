'use strict';

const childMock = require('../../lib/mocks').child;
const server = require('../../../lib/server');
const superagent = require('superagent');
const faker = require('faker');

describe('Testing Child Routes', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(childMock.removeAll);

  describe('Post requests', function() {
    describe('Valid requests', () => {
      beforeAll(() => {
        this.data = {name: faker.name.firstName()};

        return superagent.post(`:4000/api/child`)
        .send(this.data)
        .then(res => {
          this.res = res;
        });
      });
      test('Should return a status of 201', ()=> {
        expect(this.res.status).toBe(201);
      });
      test('Should return a new Child instance', () => {
        expect(this.res.body.name).toBe(this.data.name);
        expect(this.res.body).toHaveProperty('_id');
        expect(this.res.body).toHaveProperty('toys');
      });
    });
    describe('Invalid requests', () => {
      test('should return a 400, given bad req body', () => {
        return superagent.post(`:4000/api/child`)
        .send({})
        .catch(err => {
          expect(err.status).toBe(400);
        });
      });
      test('should return a 400 given bad data types as values', ()=> {
        return superagent.post(`:4000/api/toy`)
        .send({name: 145934659837458})
        .catch(err => {
          expect(err.status).toBe(400);
        });
      });
    });
  });
});
