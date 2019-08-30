var chai = require('chai');
var chaiHttp= require('chai-http');

require('dotenv').config()
var explorationsDAO = require('../dao/explorationsDAO');
const MongoClient = require('mongodb').MongoClient;

chai.use(chaiHttp);

var should = chai.should();

var app = require('../app');

describe('Test URL\'s endpoint',() => {
    before((done) => {
        MongoClient.connect(process.env.EVA_SERVER, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(async client => {
            await explorationsDAO.setDB(client);
            done();
        })
        .catch((error) => {
            console.error(`Ocurrio un error durante la conexion: ${error}`)
        })
    })
    it('Get all explorations', (done) => {
        chai.request(app)
        .get('/explorations')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.have.a.property('explorations');
            res.body.explorations.should.be.a('array');
            res.body.should.have.a.property('total');
            res.body.total.should.be.a('number');
            res.body.total.should.equals(50000);
            done();
        })
    })
})