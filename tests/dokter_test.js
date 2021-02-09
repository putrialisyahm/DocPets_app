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

describe('Admin', () => {
//   before((done) => { //Before each test we empty the database
//     // [Op.like]: "%test%" }
//     User.delete({
//       where: { email: "test1@test.com" })
//   )

// });
// beforeEach((done) => { //Before each test we empty the database
//   User.destroy({ where: "test1@test.com", force: true })
//   done();

// });

  // describe('/Post Sign Up User', () => {
  //   it('it should Sign Up a A user', (done) => {
  //     chai.request(server) // request to server (index.js)
  //       .post('/user/signup')
  //       .send({
  //         email: 'test@test.com',
  //         password: 'password',
  //         passwordConfirmation: 'password',
  //         nama: 'user Full Name',
  //         telepon: "0801810",
  //         role: "user",
  //         gender: "female",
  //       })
  //       .end((err, res) => {
  //         res.should.have.status(200); // Response should have status 200
  //         res.body.should.be.an('object'); // Body Response should be an object
  //         res.body.should.have.property('success'); // Body Response should have 'status' property
  //         // res.body.should.have.property('token'); // Body Response should have 'data' property
  //         done();
  //       });
  //   });
  // });

  let token;
  describe('/Post Login User Admin', () => {
    it('it should login user', (done) => {
      chai.request(server) // request to server (index.js)
        .post('/user/login')
        .send({
          email: 'tiga@dokter.com',
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

describe('/Post acceptAppointment', () => {
  it('it should acceptAppointment', (done) => {
    chai.request(server) // request to server (index.js)
      .post('/appointment/acceptAppointment')
      .send({
        appointmentId: 2,
        diterima: true
      })
      .set('Authorization', ('Bearer '+ token))
      .end((err, res) => {
        // token = res.body.result.token;
        res.should.have.status(200); // Response Success
        res.body.should.be.an('object'); // Body Response should be an object
        res.body.should.have.property('success'); // Body Response should have 'status' property
        // res.body.should.have.property('token'); // Body Response should have 'data' property
        done();
      })
      
  })
  
  
})


describe('/Post getAllappointmentForDoktert', () => {
  it('it should getAllappointmentForDoktert', (done) => {
    chai.request(server) // request to server (index.js)
      .get('/appointment/getAllappointmentForDokter')
      // .send({
      //   appointmentId: 2,
      //   diterima: true
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

})