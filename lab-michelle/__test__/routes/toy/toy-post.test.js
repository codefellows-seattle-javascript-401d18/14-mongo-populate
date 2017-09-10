'use strict';

const toyMock = require('../../lib/mocks').toy;
const childMock = require('../../lib/mocks').child;
const server = require('../../../lib/server');
const superagent = require('superagent');
const faker = require('faker');

describe('Testing toy routes', function() {
  beforeAll(server.start);
  afterAll(server.stop);
  afterAll(toyMock.removeAll);
  afterAll(childMock.removeAll);

  describe('Post requests', function() {
    beforeAll(() => {
      return childMock.createOne()
      .then(child => this.child = child)
      .then(() => {
        this.data = {
          name: faker.random.word(),
          desc: faker.random.words(12),
          child: this.child._id.toString(),
        };

        return superagent.post(`:4000/api/toy`)
        .send(this.data)
        .then(res => this.res = res);
      });
    });

    describe('Valid requests', ()=> {
      test('should create a new toy record', ()=> {
        expect(this.res.body.name).toBe(this.data.name);
        expect(this.res.body.desc).toBe(this.data.desc);
        expect(this.res.body.child).toBe(this.data.child);
        expect(this.res.body).toHavePrtoHaveProperty('_id');
      });
      test('should return a status 201 Created', () => {
        expect(this.res.status).toBe(201);
      });
    });
    describe('Invalid requests', ()=> {
      test('should return a 404 bad request given improper body', ()=> {
        return superagent.post(`:4000/api/toy`)
        .send({})
        .catch(err => {
          expect(err.status).toBe(400);
          expect(err.message).toBe('Bad Request');
        });
      });
      test('should return a 404 given a bad route', ()=> {
        return superagent.post(`:400/api/bad/route`)
        .send({name: 'woot', desc: 'woot', child: 'woot'})
        .catch(err => {
          expect(err.status).toBe(404);
          expect(err.message).toBe('Not Found');
        });
      });
    });
  });
});
