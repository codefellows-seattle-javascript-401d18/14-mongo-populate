// 'use strict';
// require('dotenv').config({ path: `${__dirname}/lib/.test.env` });
//
// // const Toy = require('../model/toy');
// const superagent = require('superagent');
// // const server = ('../lib/server');
// require('../lib/server').listen(process.env.PORT);
//
// require('jest');
//
// describe('Testing child routes', function() {
//   // beforeAll(server.listen(process.env.PORT));
//   // afterAll(server.close);
//   describe('all requests to /api/child', () => {
//     describe('POST requests', () => {
//       describe('Valid Requests', () => {
//         beforeAll(done => {
//           superagent.post(':4000/api/child')
//             .type('application/json')
//             .send({
//               name: 'Alaric',
//             })
//             .then(res => {
//               this.mockChild = res.body;
//               this.resPost = res;
//               done();
//             });
//         });
//         test('should create and return a new child, given a valid request', () => {
//           expect(this.mockChild).toBeInstanceOf(Object);
//           expect(this.mockChild).toHaveProperty('name');
//           expect(this.mockChild).toHaveProperty('toys');
//           expect(this.mockChild).toHaveProperty('_id');
//         });
//         test('should have a name, given a valid request', () => {
//           expect(this.mockChild.name).toBe('Alaric');
//         });
//         // test('should have a desc, given a valid request', () => {
//         //   expect(this.mockChild.toys).toBe();
//         // });
//         test('should have an _id, given a valid request', () => {
//           expect(this.mockChild._id).not.toBeNull();
//         });
//         test('should return a 201 CREATED, given a valid request', () => {
//           expect(this.resPost.status).toBe(201);
//         });
//       });
//       describe('Invalid Requests', () => {
//         beforeAll(done => {
//           superagent.post(':4000/api/child')
//             .type('application/json')
//             .send({})
//             .catch(err => {
//               this.errPost = err;
//               done();
//             });
//         });
//         test('should return a status of 400 Bad Request', () => {
//           expect(this.errPost.status).toBe(400);
//           expect(this.errPost.message).toBe('Bad Request');
//         });
//         test('should return 404 on invalid endpoint', done => {
//           superagent.post(':4000/bad/endpoint')
//             .type('application/json')
//             .send({})
//             .catch(err => {
//               expect(err.status).toBe(404);
//               done();
//             });
//         });
//       });
//     });
//     describe('GET requests', () => {
//       describe('Valid Requests for specific ID', () => {
//         test('should get the record from the child dir', done => {
//           superagent.get(`localhost:4000/api/child/${this.mockChild._id}`)
//             .type('application/json')
//             .end((err, res) => {
//               expect(res.body.name).toEqual('Alaric');
//               // expect(res.body.toys).toEqual('purple dino');
//               expect(res.status).toEqual(200);
//               done();
//             });
//         });
//       });
//       describe('Valid Requests for all documents', () => {
//         test('should get the record from the child dir', done => {
//           superagent.get(`localhost:4000/api/child`)
//             .type('application/json')
//             .end((err, res) => {
//               // expect(res.body[res.body.length -1]).toEqual(this.mockChild._id);
//               expect(res.status).toEqual(200);
//               done();
//             });
//         });
//       });
//       describe('Invalid Requests', () => {
//         test('should return 404 for bad ID', done => {
//           superagent.get(`localhost:4000/api/child/33533636`)
//             .type('application/json')
//             .end((err, res) => {
//               expect(res.status).toEqual(404);
//               done();
//             });
//         });
//         test('should return 404 error for bad endpoint', done => {
//           superagent.get(`localhost:4000/child/child/33533636`)
//             .type('application/json')
//             .end((err, res) => {
//               expect(res.status).toEqual(404);
//               done();
//             });
//         });
//       });
//     });
//     describe('PUT requests', () => {
//       describe('Valid Requests', () => {
//         test('should update existing record when provided valid ID', done => {
//           superagent.put(`localhost:4000/api/child/${this.mockChild._id}`)
//             .type('application/json')
//             .send({name: 'AlaricThomas'})
//             .end((err, res) => {
//               expect(res.status).toEqual(204);
//               done();
//             });
//         });
//       });
//       describe('Invalid Requests', () => {
//         test('should return 404 on bad endpoint', done => {
//           superagent.put(`localhost:4000/child/api/${this.mockChild._id}`)
//             .type('application/json')
//             .end((err, res) => {
//               expect(res.status).toEqual(404);
//               done();
//             });
//         });
//         test('should return 404 with bad ID', done => {
//           superagent.put(`localhost:4000/api/child/39750395`)
//             .type('application/json')
//             .end((err, res) => {
//               expect(res.status).toEqual(404);
//               done();
//             });
//         });
//       });
//     });
//     describe('#DELETE', () => {
//       describe('Valid Requests', () => {
//         test('Should respond with 200 for a request with a valid resource ID.', done => {
//           superagent.delete(`localhost:4000/api/child/${this.mockChild._id}`)
//             .type('application/json')
//             .end((err, res) => {
//               expect(res.status).toEqual(204);
//               done();
//             });
//         });
//       });
//       describe('Invalid Requests', () => {
//         test('should return 404 if no resource ID was provided', done => {
//           superagent.delete('localhost:4000/api/child')
//             .set('Content-Type', 'application/json')
//             .end((err, res) => {
//               expect(err).not.toBeNull();
//               expect(res.status).toBe(404);
//               done();
//             });
//         });
//         test('Should return 404 for valid requests made with an ID that was not found', done => {
//           superagent.delete('localhost:4000/api/child/2223242525')
//             .type('application/json')
//             .end((err, res) => {
//               expect(err).not.toBeNull();
//               expect(res.status).toBe(404);
//               done();
//             });
//         });
//       });
//     });
//   });
// });
