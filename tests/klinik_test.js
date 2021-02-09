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

describe('Klinik', () => {
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
describe('/klinik/search', () => {
  it('it should search klinik', (done) => {
    chai.request(server) // request to server (index.js)
      .post('/klinik/search')
      .send({
       nama : 'klinik',
       lokasi :"jogja",
      })
      .end((err, res) => {
        res.should.have.status(200); // Response Success
        res.body.should.be.an('object'); // Body Response should be an object
        res.body.should.have.property('success'); // Body Response should have 'status' property
        done();
      })
  })
})


 
describe('/klinik/getAllKlinik', () => {
  it('it should Get All Klinik', (done) => {
    chai.request(server) // request to server (index.js)
      .get('/klinik/getAllKlinik')
      // .send({
      //  nama : 'klinik',
      //  kota :"jogja",

      // })
      .set('Authorization', ('Bearer '+ token))
      .end((err, res) => {
        res.should.have.status(200); // Response Success
        res.body.should.be.an('object'); // Body Response should be an object
        res.body.should.have.property('success'); // Body Response should have 'status' property
        done();
      })
  })
})
 
describe('/get Klinik by id', () => {

  it('it should Get klinik detail', (done) => {
    chai.request(server) // request to server (index.js)
      .get('/klinik/getKlinikById/1')

      // .set('Authorization', ('Bearer '+ token))
      .end((err, res) => {
        res.should.have.status(200); // Response Success
        res.body.should.be.an('object'); // Body Response should be an object
        res.body.should.have.property('success'); // Body Response should have 'status' property
        done();
      })
  })
})


  let token;
  describe('/Post Login User', () => {
    it('it should login user', (done) => {
      chai.request(server) // request to server (index.js)
        .post('/user/login')
        .send({
          email: 'satu@admin.com',
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

  describe('/klinik/getAllDokterInKlinik', () => {
    it('it should get all dokter in klinik', (done) => {
      chai.request(server) // request to server (index.js)
        .get('/klinik/getAllDokterInKlinik/1')
        // .send({
        //  nama : 'klinik',
        //  kota :"jogja",
  
        // })
        .set('Authorization', ('Bearer '+ token))
        .end((err, res) => {
          res.should.have.status(200); // Response Success
          res.body.should.be.an('object'); // Body Response should be an object
          res.body.should.have.property('success'); // Body Response should have 'status' property
          done();
        })
      })
    
    })
  })