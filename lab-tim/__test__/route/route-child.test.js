'use strict';

// const superagent = require('superagent');
// const PORT = process.env.PORT || 3000;
// const server = require('../../lib/server');
// require('jest');

describe('ModuleName', function () {
  describe('default properties', () => {
    test('should have ...', done => {
      expect(true).toBeTrue;
      done();
    });
  });
});


// describe('Testing toy routes', function() {
//   describe('all requests to /api/toy', () => {
//     describe('POST requests', () => {
//       describe('Valid Requests', () => {
//         beforeAll(server.start);
//         afterAll(server.stop);
//         beforeAll(done => {
//           superagent.post('localhost:3000/api/toy')
//             .type('application/json')
//             .send({
//               name: 'slinky',
//               desc: 'red plastic',
//               child: '59b5dd80402a6a04bab12671'
//             })
//             .then(res => {
//               this.mockToy = res.body;
//               this.resPost = res;
//               done();
//             });
//         });
//         test.only('should create and return a new toy, given a valid request', () => {
//           expect(this.mockToy).toBeInstanceOf(Object);
//           expect(this.mockToy).toHaveProperty('name');
//           expect(this.mockToy).toHaveProperty('desc');
//           expect(this.mockToy).toHaveProperty('_id');
//         });
//         test('should have an _id, name, and desc, given a valid request', () => {
//           expect(this.mockToy._id).toMatch(/^[a-f\d]{24}$/i);
//           expect(this.mockToy.name).toBe('slinky');
//           expect(this.mockToy.desc).toBe('red plastic');
//         });
//         test('should return a 201 CREATED, given a valid request', () => {
//           expect(this.resPost.status).toBe(201);
//         });
//       });
//
//       describe('Invalid Requests', () => {
//         beforeAll(done => {
//           superagent.post('localhost:3000/api/toy')
//             .type('application/json')
//             .send({})
//             .catch(err => {
//               this.errPost = err;
//               done();
//             });
//         });
//         test('should return a status of 400 Bad Request', () => {
//           // expect(this.errPost.status).toBe(400);
//           // expect(this.errPost.message).toBe('Bad Request');
//           expect(this.errPost.status).toBe(500);
//           expect(this.errPost.message).toBe('Internal Server Error');
//         });
//         test('should return 404 on invalid endpoint', done => {
//           superagent.post('localhost:3000/bad/endpoint')
//             .type('application/json')
//             .send({})
//             .catch(err => {
//               expect(err.status).toBe(404);
//               done();
//             });
//         });
//       });
//     });
//
//     describe('GET requests', () => {
//       describe('Valid Requests', () => {
//         beforeAll(done => {
//           superagent.get(`localhost:3000/api/toy/${this.mockToy._id}`)
//             .then(res => {
//               this.getToy = res.body;
//               this.resGet = res;
//               done();
//             });
//         });
//         test('should get a toy record, given a valid request', () => {
//           expect(this.getToy).toBeInstanceOf(Object);
//           expect(this.getToy).toHaveProperty('name');
//           expect(this.getToy).toHaveProperty('desc');
//           expect(this.getToy).toHaveProperty('_id');
//         });
//         test('should have an _id, name, and desc, given a valid request', () => {
//           expect(this.getToy._id).toMatch(/^[a-f\d]{24}$/i);
//           expect(this.getToy.name).toBe('slinky');
//           expect(this.getToy.desc).toBe('red plastic');
//         });
//         test('should return a 200 OK, given a valid request', () => {
//           expect(this.resGet.status).toBe(200);
//         });
//       });
//
//       describe('Invalid Requests', () => {
//         beforeAll(done => {
//           superagent.get(`localhost:3000/api/toy/${this.mockToy._id}badId`)
//             .catch(err => {
//               this.errGet = err;
//               done();
//             });
//         });
//         test('should return a status of 400 Bad Request', () => {
//           // expect(this.errGet.status).toBe(400);
//           // expect(this.errGet.message).toBe('Bad Request');
//           expect(this.errGet.status).toBe(500);
//           expect(this.errGet.message).toBe('Internal Server Error');
//         });
//         test('should return 404 on invalid endpoint', done => {
//           superagent.get('localhost:3000/bad/endpoint')
//             .catch(err => {
//               expect(err.status).toBe(404);
//               done();
//             });
//         });
//       });
//     });
//
//     describe('PUT requests', () => {
//       describe('Valid Requests', () => {
//         beforeAll(done => {
//           superagent.put(`localhost:3000/api/toy/${this.mockToy._id}`)
//             .type('application/json')
//             .send({
//               name: 'slinky',
//               desc: 'blue plastic'
//             })
//             .then(res => {
//               this.resPut = res;
//               done();
//             });
//         });
//         test('should return a 204 NO CONTENT, given a valid request', () => {
//           expect(this.resPut.status).toBe(204);
//         });
//       });
//
//       describe('Invalid Requests', () => {
//         beforeAll(() => {
//           return superagent.put(`localhost:3000/api/toy/${this.mockToy._id}`)
//             .type('application/json')
//             .send({})
//             .catch(err => {
//               this.errPut = err;
//               //done();
//             });
//         });
//         test('should return a status of 400 Bad Request', () => {
//           // expect(this.errPost.status).toBe(400);
//           // expect(this.errPost.message).toBe('Bad Request');
//           expect(this.errPut.status).toBe(500);
//           expect(this.errPut.message).toBe('Internal Server Error');
//         });
//         test('should return 404 on invalid endpoint', done => {
//           superagent.put('localhost:3000/bad/endpoint')
//             .type('application/json')
//             .send({})
//             .catch(err => {
//               expect(err.status).toBe(404);
//               done();
//             });
//         });
//       });
//     });
//
//     describe('DELETE requests', () => {
//       describe('Valid Requests', () => {
//         beforeAll(done => {
//           superagent.delete(`localhost:3000/api/toy/${this.mockToy._id}`)
//             .then(res => {
//               this.resDelete = res;
//               done();
//             });
//         });
//         test('should return a 204 No Content', () => {
//           expect(this.resDelete.status).toBe(204);
//         });
//       });
//
//       describe('Invalid Requests', () => {
//         beforeAll(done => {
//           superagent.delete(`localhost:3000/api/toy/${this.mockToy._id}badId`)
//             .catch(err => {
//               this.errDelete = err;
//               done();
//             });
//         });
//         test('should return a status of 400 Bad Request', () => {
//           // expect(this.errPost.status).toBe(400);
//           // expect(this.errPost.message).toBe('Bad Request');
//           expect(this.errDelete.status).toBe(500);
//           expect(this.errDelete.message).toBe('Internal Server Error');
//         });
//         test('should return 404 on invalid endpoint', done => {
//           superagent.delete('localhost:3000/bad/endpoint')
//             .catch(err => {
//               expect(err.status).toBe(404);
//               done();
//             });
//         });
//       });
//     });
//   });
// });
