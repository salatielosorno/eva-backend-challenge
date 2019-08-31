var chai = require('chai');
var chaiHttp= require('chai-http');

require('dotenv').config()
var bookingsDAO = require('../dao/bookingsDAO');
const MongoClient = require('mongodb').MongoClient;

chai.use(chaiHttp);

var should = chai.should();

var app = require('../app');

describe('Test URL\'s endpoint',() => {
    before((done) => {
        MongoClient.connect(process.env.EVA_SERVER, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(async client => {
            await bookingsDAO.setDB(client);
            done();
        })
        .catch((error) => {
            console.error(`Ocurrio un error durante la conexion: ${error}`)
        })
    })
    it('Get all bookings', (done) => {
        chai.request(app)
        .get('/bookings')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');

            res.body[0].should.have.a.property('id');
            res.body[0]["id"].should.be.a('number');
            res.body[0]["id"].should.equals(0);

            res.body[0].should.have.a.property('name');
            res.body[0]["name"].should.be.a('string');
            res.body[0]["name"].should.equals('Mina Cummings');

            res.body[0].should.have.a.property('email');
            res.body[0]["email"].should.be.a('string');
            res.body[0]["email"].should.equals('mina_cummings@gmail.com');

            res.body[0].should.have.a.property('datetime');
            res.body[0]["datetime"].should.be.a('string');
            res.body[0]["datetime"].should.equals('2019-11-26T01:19:51.813Z');

            res.body[0].should.have.a.property('clinicName');
            res.body[0]["clinicName"].should.be.a('string');
            res.body[0]["clinicName"].should.equals('EXPLANADA');

            res.should.have.a.header('eva-total', 50000);
            res.should.have.a.header('eva-pages', 50);
            res.should.have.a.header('eva-page', 1);

            done();
        })
    })
    it('Get all bookings in a specific clinic', (done) => {
        chai.request(app)
        .get('/bookings?clinic=EXPLANADA')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');

            res.should.have.a.header('eva-total', 12467);
            res.should.have.a.header('eva-pages', 13);
            res.should.have.a.header('eva-page', 1);

            done();
        })
    })

    it('Get all bookings in a specific frame time', (done) => {
        chai.request(app)
        .get('/bookings?frametime[start]=2019-11-26T01:19:51.813Z&frametime[end]=2019-11-27T01:19:51.813Z')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');

            res.should.have.a.header('eva-total', 1638);
            res.should.have.a.header('eva-pages', 2);
            res.should.have.a.header('eva-page', 1);

            done();
        })
    })
})