
// describe('Testing toy routes', function() {
//   describe('all requests to /api/toy', () => {
//     describe('POST requests', () => {
//
//       describe('Valid Requests', () => {
//
//       })
//       describe('Invalid Requests', () => {
//
//       })
//     })
//
//     xdescribe('GET requests', () => {
//       describe('Valid Requests', () => {
//
//       })
//       describe('Invalid Requests', () => {
//
//       })
//     })
//
//     describe('PUT requests', function() {
//       beforeAll(() => {
//         return superagent.post(':4000/api/toy')
//           .send({ name: 'Moana', desc: 'Badass sailor' })
//           .then(res => {
//             this.resPost = res
//           })
//       })
//       afterAll(() => {
//         return Promise.all([
//           Toy.remove()
//         ])
//         // .then(() => delete this.resPost)
//       })
//
//       describe('Valid Requests', () => {
//         test('should return a status of 204 No Content', () => {
//           return superagent.put(`:4000/api/toy/${this.resPost.body._id}`)
//             .send({ name: 'Moana', desc: 'Badass Wayfinder' })
//             .then(res => {
//               expect(res.status).toBe(204)
//             })
//         })
//         test('should update the existing record in the DB', () => {
//           return superagent.get(`:4000/api/toy/${this.resPost.body._id}`)
//             .then(res => {
//               expect(res.body.name).toBe('Moana')
//               expect(res.body.desc).toBe('Badass Wayfinder')
//             })
//         })
//       })
//       describe('Invalid Requests', () => {
//
//       })
//     })
//
//     describe('DELETE requests', () => {
//       describe('Valid Requests', () => {
//
//       })
//       describe('Invalid Requests', () => {
//
//       })
//     })
//   })
// })

'use strict'

require('dotenv').config({ path: `${__dirname}/lib/.test.env` })

const Toy = require('../model/toy')
const superagent = require('superagent')
require('../lib/server').listen(process.env.PORT)

require('jest')

describe('Testing toy routes', function() {
  describe('all requests to /api/toy', () => {
    describe('POST requests', () => {
      describe.only('Valid Requests', () => {
        beforeAll(done => {
          superagent.post(':5000/api/child')
            .type('application/json')
            .send({
              name: 'Nikki'
            })
            .then(res => {
              this.mockChild = res.body
              this.resPostToy = res
              console.log(this.mockChild._id)
              return superagent.post(':5000/api/toy')
                .type('application/json')
                .send({
                  name: 'tarot deck',
                  desc: 'very magical',
                  child: this.mockChild._id
                })
                .then( res => {
                  this.mockToy = res.body
                  this.resPostToy = res
                  done()
                })
            })
        })
        test('should create and return a new toy, given a valid request', () => {
          expect(this.mockToy).toBeInstanceOf(Object)
          expect(this.mockToy).toHaveProperty('name')
          expect(this.mockToy).toHaveProperty('desc')
          expect(this.mockToy).toHaveProperty('child')
          expect(this.mockToy).toHaveProperty('_id')
        })
        test('should have a name, given a valid request', () => {
          expect(this.mockToy.name).toBe('tarot deck')
        })
        test('should have a desc, given a valid request', () => {
          expect(this.mockToy.desc).toBe('what')
        })
        test('should have an _id, given a valid request', () => {
          expect(this.mockToy._id).toMatch(/([a-f0-9]{24})/i)
        })
        test('should return a 201 CREATED, given a valid request', () => {
          expect(this.resPostToy.status).toBe(201)
        })
      })
      describe('Invalid Requests', () => {
        // TODO: error status, message, name, bad endpoint
        beforeAll(done => {
          superagent.post(':3000/api/toy')
            .type('application/json')
            .send({})
            .catch(err => {
              this.errPost = err
              done()
            })
        })
        test('should return a status of 400 Bad Request', () => {
          expect(this.errPost.status).toBe(400)
          expect(this.errPost.message).toBe('Bad Request')
        })
        test('should return 404 on invalid endpoint', done => {
          superagent.post(':3000/bad/endpoint')
            .type('application/json')
            .send({})
            .catch(err => {
              expect(err.status).toBe(404)
              done()
            })
        })
      })
    })
    xdescribe('GET requests', () => {
      test('should get the record from the toy dir', done => {

        done()
      })
    })
    xdescribe('PUT requests', () => {
      test('should have ...', done => {

        done()
      })
    })
    describe('DELETE requests', () => {
      describe('Valid Requests', () => {
        beforeAll(done => {
          superagent.delete(`:3000/api/toy/${this.mockToy._id}`)
            .then(res => {
              this.resDelete = res
              done()
            })
        })
        test('should return a 204 No Content', () => {
          expect(this.resDelete.status).toBe(204)
        })
      })
      describe('Invalid Requests', () => {

      })
    })
  })
})
