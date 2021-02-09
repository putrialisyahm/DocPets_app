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


  let token;
  describe('/Post Login User Admin', () => {
    it('it should login user', (done) => {
      chai.request(server) // request to server (index.js)
        .post('/user/login')
        .send({
          email: 'admin@admin.com',
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


 

  describe('/addklinik', () => {
    it('it should add Klinik', (done) => {
      chai.request(server) // request to server (index.js)
        .post('/admin/addklinik')
        .send({
          nama : 'Super Duper WOW',
          lokasi: 'Batam',
          tentang: 'Skip aja lah bodoh amat',
          fasilitas: ' bisa menghidupkan peliharaan yg mati'
        })
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

  describe('updateKlinik/', () => {
    it('it should login user', (done) => {
      chai.request(server) // request to server (index.js)
        .put('/admin/updateKlinik/')
        .send({
          klinikId:1,
          nama: 'ulala',
          lokasi: 'batam'
        })
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


describe('/admin/deleteKlinik', () => {
  it('it should deleteKlinik', (done) => {
    chai.request(server) // request to server (index.js)
      .delete('/admin/deleteKlinik')
      .send({
       klinikId : 14,
      })
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
