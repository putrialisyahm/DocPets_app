let Sequelize = require("sequelize"); // import mongoose

const {
  User,
  Peliharaan,
  Klinik,
  Memiliki,
  Appointment,
  Periksa,
} = require('../models') // Import user model


//Require the dev-dependencies
let chai = require('chai'); // import chai for testing assert
let chaiHttp = require('chai-http'); // make virtual server to get/post/put/delete
let server = require('../index.js'); // import app from index
let should = chai.should(); // import assert should from chai

chai.use(chaiHttp); // use chaiHttp
const Op = Sequelize.Op


let token;
  describe('/Post Login User', () => {
    it('it should login user', (done) => {
      chai.request(server) // request to server (index.js)
        .post('/user/login')
        .send({
          email: 'satu@gmail.com',
          password: 'password'
        })
        .end((err, res) => {
          token = res.body.result.token;
          res.should.have.status(200); // Response Success
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('success'); // Body Response should have 'status' property
          // res.body.should.have.property('token'); // Body Response should have 'data' property
          done();
        })
        
    })
    
  })


  describe('/Post Add Appointment', () => {
    it('it should Add Appointment', (done) => {
      chai.request(server) // request to server (index.js)
        .post('/appointment/addAppointment')
        .send({
          klinikId: 1,
          dokterId: 5,
          peliharaanId: '1',
          date: '2021-02-11T14:00:00.000'
        })
        .set('Authorization', ('Bearer '+ token))
        .end((err, res) => {
//          token = res.body.result.token;
          res.should.have.status(200); // Response Success
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('success'); // Body Response should have 'status' property
          // res.body.should.have.property('token'); // Body Response should have 'data' property
          done();
        })
        
    })
    
  })

  describe('/getAllAppointment', () => {
    it('it should get All Appointment', (done) => {
      chai.request(server) // request to server (index.js)
        .get('/appointment/getAllAppointment')
        // .send({
        //   klinikId: 1,
        //   dokterId: 5,
        //   peliharaanId: '1',
        //   date: '2021-02-11T10:00:00.000'
        // })
        .set('Authorization', ('Bearer '+ token))
        .end((err, res) => {
          res.should.have.status(200); // Response Success
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('success'); // Body Response should have 'status' property
          // res.body.should.have.property('token'); // Body Response should have 'data' property
          done();
        })
        
    })
    
  })