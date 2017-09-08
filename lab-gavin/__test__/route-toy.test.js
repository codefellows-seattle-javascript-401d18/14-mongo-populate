'use strict';
require('dotenv').config({ path: `${__dirname}/lib/.test.env` });

// const Toy = require('../model/toy');
const superagent = require('superagent');
require('../lib/server').listen(process.env.PORT);
// const server = ('../lib/server');
require('jest');



describe('Testing toy routes', function() {
  // beforeAll(server.listen(process.env.PORT));
  // afterAll(server.close;
  describe('all requests to /api/toy', () => {
    describe('POST requests', () => {
      describe('Valid Requests', () => {
        beforeAll(done => {
          superagent.post(':4000/api/child')
            .type('application/json')
            .send({
              name: 'Alaric',
            })
            .then(res => {
              this.mockChild = res.body;
              this.resPost = res;
              return superagent.post(':4000/api/toy')
                .type('application/json')
                .send({
                  name: 'barney',
                  desc: 'purple dino',
                  child: `${this.mockChild._id}`,
                })
                .then(res => {
                  this.mockToy = res.body;
                  this.resPost = res;
                  done();
                });
            });
        });
        describe('New Toy Creation Validation', () =>{
          test('should create and return a new toy, given a valid request', () => {
            expect(this.mockToy).toBeInstanceOf(Object);
            expect(this.mockToy).toHaveProperty('name');
            expect(this.mockToy).toHaveProperty('desc');
            expect(this.mockToy).toHaveProperty('_id');
            expect(this.mockToy).toHaveProperty('child');
          });
          test('should have a name, desc, child and _id given a valid request', () => {
            expect(this.mockToy.name).toBe('barney');
            expect(this.mockToy.child).toBe(this.mockChild._id);
            expect(this.mockToy.desc).toBe('purple dino');
            expect(this.mockToy._id).not.toBeNull();
          });
          test('should return a 201 CREATED, given a valid request', () => {
            expect(this.resPost.status).toBe(201);
          });
        });
      });
      describe('New Child Creation Validation', () =>{
        test('should create and return a new child, given a valid request', () => {
          expect(this.mockChild).toBeInstanceOf(Object);
          expect(this.mockChild).toHaveProperty('name');
          expect(this.mockChild).toHaveProperty('toys');
          expect(this.mockChild).toHaveProperty('_id');
        });
        test('should have a name, toys, and _id given a valid request', () => {
          expect(this.mockChild.name).toBe('Alaric');
          expect(this.mockChild.toys).toEqual([]);
          expect(this.mockChild._id).not.toBeNull();
        });
        test('should return a 201 CREATED, given a valid request', () => {
          expect(this.resPost.status).toBe(201);
        });
      });
    });
    describe('Invalid POST Requests', () => {
      beforeAll(done => {
        superagent.post(':4000/api/toy')
          .type('application/json')
          .send({})
          .catch(err => {
            this.errPost = err;
            done();
          });
      });
      test('should return a status of 400 Bad Request', () => {
        expect(this.errPost.status).toBe(400);
        expect(this.errPost.message).toBe('Bad Request');
      });
      test('should return 404 on invalid endpoint', done => {
        superagent.post(':4000/bad/endpoint')
          .type('application/json')
          .send({})
          .catch(err => {
            expect(err.status).toBe(404);
            done();
          });
      });
      test('should return 409 on dupe', done => {
        superagent.post(':4000/api/child')
          .type('application/json')
          .send({
            name: 'Alaric',
          })
          .then(() => {
            superagent.post(':4000/api/child')
              .type('application/json')
              .send({
                name: 'Alaric',
              });
            done();
          });
      });
    });
  });
  describe('GET requests', () => {
    describe('Valid Requests for specific ID', () => {
      test('should get the record from the toy dir', done => {
        superagent.get(`localhost:4000/api/toy/${this.mockToy._id}`)
          .type('application/json')
          .end((err, res) => {
            expect(res.body.name).toEqual('barney');
            expect(res.body.desc).toEqual('purple dino');
            expect(res.status).toEqual(200);
            done();
          });
      });
    });
    describe('Valid Requests for all documents', () => {
      test('should get the record from the toy dir', done => {
        superagent.get(`localhost:4000/api/toy`)
          .type('application/json')
          .end((err, res) => {
            // expect(res.body[res.body.length -1]).toEqual(this.mockToy._id);
            expect(res.status).toEqual(200);
            done();
          });
      });
    });
    describe('Invalid Requests', () => {
      test('should return 404 for bad ID', done => {
        superagent.get(`localhost:4000/api/toy/33533636`)
          .type('application/json')
          .end((err, res) => {
            expect(res.status).toEqual(404);
            done();
          });
      });
      test('should return 404 error for bad endpoint', done => {
        superagent.get(`localhost:4000/toy/toy/33533636`)
          .type('application/json')
          .end((err, res) => {
            expect(res.status).toEqual(404);
            done();
          });
      });
    });
  });
  describe('PUT requests', () => {
    describe('Valid Requests', () => {
      test('should update existing record when provided valid ID', done => {
        superagent.put(`localhost:4000/api/toy/${this.mockToy._id}`)
          .type('application/json')
          .end((err, res) => {
            expect(res.status).toEqual(204);
            done();
          });
      });
    });
    describe('Invalid Requests', () => {
      test('should return 404 on bad endpoint', done => {
        superagent.put(`localhost:4000/toy/api/${this.mockToy._id}`)
          .type('application/json')
          .end((err, res) => {
            expect(res.status).toEqual(404);
            done();
          });
      });
      test('should return 500 with bad ID', done => {
        superagent.put(`localhost:4000/api/toy/39750395`)
          .type('application/json')
          .end((err, res) => {
            expect(res.status).toEqual(404);
            done();
          });
      });
    });
  });
  describe('#DELETE', () => {
    describe('Valid Requests', () => {
      test('Should respond with 204 for a request with a valid resource ID.', done => {
        superagent.delete(`localhost:4000/api/toy/${this.mockToy._id}`)
          .type('application/json')
          .end((err, res) => {
            expect(res.status).toEqual(204);
            done();
          });
      });
    });
    describe('Invalid Requests', () => {
      test('should return 404 if no resource ID was provided', done => {
        superagent.delete('localhost:4000/api/toy')
          .set('Content-Type', 'application/json')
          .end((err, res) => {
            expect(err).not.toBeNull();
            expect(res.status).toBe(404);
            done();
          });
      });
      test('Should return 500 for valid requests made with an ID that was not found', done => {
        superagent.delete('localhost:4000/api/toy/2223242525')
          .type('application/json')
          .end((err, res) => {
            expect(err).not.toBeNull();
            expect(res.status).toBe(404);
            done();
          });
      });
    });
  });
});

// TESTING CHILD ROUTESTESTING CHILD ROUTESTESTING CHILD ROUTESTESTING CHILD ROUTES
describe('Testing child routes', function() {
  describe('all requests to /api/child', () => {
    describe('POST requests', () => {
      describe('Valid Requests', () => {
        beforeAll(done => {
          superagent.post(':4000/api/child')
            .type('application/json')
            .send({
              name: 'Alaric',
            })
            .then(res => {
              this.mockChild = res.body;
              this.resPost = res;
              done();
            });
        });
        test('should create and return a new child, given a valid request', () => {
          expect(this.mockChild).toBeInstanceOf(Object);
          expect(this.mockChild).toHaveProperty('name');
          expect(this.mockChild).toHaveProperty('toys');
          expect(this.mockChild).toHaveProperty('_id');
        });
        test('should have a name, given a valid request', () => {
          expect(this.mockChild.name).toBe('Alaric');
        });
        test('should have an _id, given a valid request', () => {
          expect(this.mockChild._id).not.toBeNull();
        });
        test('should return a 201 CREATED, given a valid request', () => {
          expect(this.resPost.status).toBe(201);
        });
      });
      describe('Invalid Requests', () => {
        beforeAll(done => {
          superagent.post(':4000/api/child')
            .type('application/json')
            .send({})
            .catch(err => {
              this.errPost = err;
              done();
            });
        });
        test('should return a status of 400 Bad Request', () => {
          expect(this.errPost.status).toBe(400);
          expect(this.errPost.message).toBe('Bad Request');
        });
        test('should return 404 on invalid endpoint', done => {
          superagent.post(':4000/bad/endpoint')
            .type('application/json')
            .send({})
            .catch(err => {
              expect(err.status).toBe(404);
              done();
            });
        });
      });
    });
    describe('GET requests', () => {
      describe('Valid Requests for specific ID', () => {
        test('should get the record from the child dir', done => {
          superagent.get(`localhost:4000/api/child/${this.mockChild._id}`)
            .type('application/json')
            .end((err, res) => {
              expect(res.body.name).toEqual('Alaric');
              // expect(res.body.toys).toEqual('purple dino');
              expect(res.status).toEqual(200);
              done();
            });
        });
      });
      describe('Valid Requests for all documents', () => {
        test('should get the record from the child dir', done => {
          superagent.get(`localhost:4000/api/child`)
            .type('application/json')
            .end((err, res) => {
              // expect(res.body[res.body.length -1]).toEqual(this.mockChild._id);
              expect(res.status).toEqual(200);
              done();
            });
        });
      });
      describe('Invalid Requests', () => {
        test('should return 404 for bad ID', done => {
          superagent.get(`localhost:4000/api/child/33533636`)
            .type('application/json')
            .end((err, res) => {
              expect(res.status).toEqual(404);
              done();
            });
        });
        test('should return 404 error for bad endpoint', done => {
          superagent.get(`localhost:4000/child/child/33533636`)
            .type('application/json')
            .end((err, res) => {
              expect(res.status).toEqual(404);
              done();
            });
        });
      });
    });
    describe('PUT requests', () => {
      describe('Valid Requests', () => {
        test('should update existing record when provided valid ID', done => {
          superagent.put(`localhost:4000/api/child/${this.mockChild._id}`)
            .type('application/json')
            .send({name: 'AlaricThomas'})
            .end((err, res) => {
              expect(res.status).toEqual(204);
              done();
            });
        });
      });
      describe('Invalid Requests', () => {
        test('should return 404 on bad endpoint', done => {
          superagent.put(`localhost:4000/child/api/${this.mockChild._id}`)
            .type('application/json')
            .end((err, res) => {
              expect(res.status).toEqual(404);
              done();
            });
        });
        test('should return 404 with bad ID', done => {
          superagent.put(`localhost:4000/api/child/39750395`)
            .type('application/json')
            .end((err, res) => {
              expect(res.status).toEqual(404);
              done();
            });
        });
      });
    });
    describe('#DELETE', () => {
      describe('Valid Requests', () => {
        test('Should respond with 200 for a request with a valid resource ID.', done => {
          superagent.delete(`localhost:4000/api/child/${this.mockChild._id}`)
            .type('application/json')
            .end((err, res) => {
              expect(res.status).toEqual(204);
              done();
            });
        });
      });
      describe('Invalid Requests', () => {
        test('should return 404 if no resource ID was provided', done => {
          superagent.delete('localhost:4000/api/child')
            .set('Content-Type', 'application/json')
            .end((err, res) => {
              expect(err).not.toBeNull();
              expect(res.status).toBe(404);
              done();
            });
        });
        test('Should return 404 for valid requests made with an ID that was not found', done => {
          superagent.delete('localhost:4000/api/child/2223242525')
            .type('application/json')
            .end((err, res) => {
              expect(err).not.toBeNull();
              expect(res.status).toBe(404);
              done();
            });
        });
      });
    });
  });
});
