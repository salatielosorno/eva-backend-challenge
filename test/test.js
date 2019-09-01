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
        .get('/bookings?clinic=SOLESTA')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');

            res.body[0].should.have.a.property('id');
            res.body[0]["id"].should.be.a('number');
            res.body[0]["id"].should.equals(3);

            res.body[0].should.have.a.property('name');
            res.body[0]["name"].should.be.a('string');
            res.body[0]["name"].should.equals('Blake Schwartz');

            res.body[0].should.have.a.property('email');
            res.body[0]["email"].should.be.a('string');
            res.body[0]["email"].should.equals('katherine_fowler@gmail.com');

            res.body[0].should.have.a.property('datetime');
            res.body[0]["datetime"].should.be.a('string');
            res.body[0]["datetime"].should.equals('2019-11-17T06:22:11.116Z');

            res.body[0].should.have.a.property('clinicName');
            res.body[0]["clinicName"].should.be.a('string');
            res.body[0]["clinicName"].should.equals('SOLESTA');

            res.should.have.a.header('eva-total', 12575);
            res.should.have.a.header('eva-pages', 13);
            res.should.have.a.header('eva-page', 1);

            done();
        })
    })
    it('Get all bookings in a specific frame time', (done) => {
        chai.request(app)
        .get('/bookings?frametime[start]=2019-11-27T01:19:51.813Z&frametime[end]=2019-11-28T01:19:51.813Z')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');

            res.body[0].should.have.a.property('id');
            res.body[0]["id"].should.be.a('number');
            res.body[0]["id"].should.equals(1);

            res.body[0].should.have.a.property('name');
            res.body[0]["name"].should.be.a('string');
            res.body[0]["name"].should.equals('Rosetta Graham');

            res.body[0].should.have.a.property('email');
            res.body[0]["email"].should.be.a('string');
            res.body[0]["email"].should.equals('rosetta_graham@gmail.com');

            res.body[0].should.have.a.property('datetime');
            res.body[0]["datetime"].should.be.a('string');
            res.body[0]["datetime"].should.equals('2019-11-27T07:44:43.411Z');

            res.body[0].should.have.a.property('clinicName');
            res.body[0]["clinicName"].should.be.a('string');
            res.body[0]["clinicName"].should.equals('SANTA_FE');

            res.should.have.a.header('eva-total', 1651);
            res.should.have.a.header('eva-pages', 2);
            res.should.have.a.header('eva-page', 1);

            done();
        })
    })
    it('Get all bookings in a specific clinic and a specific frame time', (done) => {
        chai.request(app)
        .get('/bookings?clinic=SOLESTA&frametime[start]=2019-11-20T01:19:51.813Z&frametime[end]=2019-11-21T01:19:51.813Z')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');

            res.body[0].should.have.a.property('id');
            res.body[0]["id"].should.be.a('number');
            res.body[0]["id"].should.equals(205);

            res.body[0].should.have.a.property('name');
            res.body[0]["name"].should.be.a('string');
            res.body[0]["name"].should.equals('Ollie Lee');

            res.body[0].should.have.a.property('email');
            res.body[0]["email"].should.be.a('string');
            res.body[0]["email"].should.equals('ollie_lee@gmail.com');

            res.body[0].should.have.a.property('datetime');
            res.body[0]["datetime"].should.be.a('string');
            res.body[0]["datetime"].should.equals('2019-11-20T14:17:30.064Z');

            res.body[0].should.have.a.property('clinicName');
            res.body[0]["clinicName"].should.be.a('string');
            res.body[0]["clinicName"].should.equals('SOLESTA');

            res.should.have.a.header('eva-total', 415);
            res.should.have.a.header('eva-pages', 1);
            res.should.have.a.header('eva-page', 1);

            done();
        })
    })
    it('Get all bookings by consumed medications STRICT MODE', (done) => {
        chai.request(app)
        .get('/bookings?mode=STRICT&medication[]=HORMONE_THERAPY&medication[]=ANTIBIOTICS&medication[]=BLOOD_THINNERS&medication[]=VITAMINS&medication[]=COAGULANTS')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');

            res.body[0].should.have.a.property('id');
            res.body[0]["id"].should.be.a('number');
            res.body[0]["id"].should.equals(5);

            res.body[0].should.have.a.property('name');
            res.body[0]["name"].should.be.a('string');
            res.body[0]["name"].should.equals('Nina Santos');

            res.body[0].should.have.a.property('email');
            res.body[0]["email"].should.be.a('string');
            res.body[0]["email"].should.equals('nina_santos@gmail.com');

            res.body[0].should.have.a.property('datetime');
            res.body[0]["datetime"].should.be.a('string');
            res.body[0]["datetime"].should.equals('2019-11-01T16:04:58.801Z');

            res.body[0].should.have.a.property('clinicName');
            res.body[0]["clinicName"].should.be.a('string');
            res.body[0]["clinicName"].should.equals('SOLESTA');

            res.should.have.a.header('eva-total', 2460);
            res.should.have.a.header('eva-pages', 3);
            res.should.have.a.header('eva-page', 1);

            done();
        })
    })
    it('Get all bookings by consumed medications LAX MODE', (done) => {
        chai.request(app)
        .get('/bookings?mode=LAX&medication[]=ANTIBIOTICS&medication[]=BLOOD_THINNERS&medication[]=VITAMINS&medication[]=COAGULANTS')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');

            res.body[0].should.have.a.property('id');
            res.body[0]["id"].should.be.a('number');
            res.body[0]["id"].should.equals(2);

            res.body[0].should.have.a.property('name');
            res.body[0]["name"].should.be.a('string');
            res.body[0]["name"].should.equals('Katherine Fowler');

            res.body[0].should.have.a.property('email');
            res.body[0]["email"].should.be.a('string');
            res.body[0]["email"].should.equals('katherine_fowler@gmail.com');

            res.body[0].should.have.a.property('datetime');
            res.body[0]["datetime"].should.be.a('string');
            res.body[0]["datetime"].should.equals('2019-11-17T23:42:28.688Z');

            res.body[0].should.have.a.property('clinicName');
            res.body[0]["clinicName"].should.be.a('string');
            res.body[0]["clinicName"].should.equals('ANGELOPOLIS');

            res.should.have.a.header('eva-total', 42515);
            res.should.have.a.header('eva-pages', 43);
            res.should.have.a.header('eva-page', 1);

            done();
        })
    })
    it('Get all bookings in a specific clinic by consumed medications STRICT MODE', (done) => {
        chai.request(app)
        .get('/bookings?mode=STRICT&clinic=EXPLANADA&medication[]=HORMONE_THERAPY&medication[]=ANTIBIOTICS&medication[]=BLOOD_THINNERS&medication[]=VITAMINS&medication[]=COAGULANTS')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');

            res.body[0].should.have.a.property('id');
            res.body[0]["id"].should.be.a('number');
            res.body[0]["id"].should.equals(248);

            res.body[0].should.have.a.property('name');
            res.body[0]["name"].should.be.a('string');
            res.body[0]["name"].should.equals('James Chavez');

            res.body[0].should.have.a.property('email');
            res.body[0]["email"].should.be.a('string');
            res.body[0]["email"].should.equals('clarence_patton@gmail.com');

            res.body[0].should.have.a.property('datetime');
            res.body[0]["datetime"].should.be.a('string');
            res.body[0]["datetime"].should.equals('2019-11-18T09:57:10.364Z');

            res.body[0].should.have.a.property('clinicName');
            res.body[0]["clinicName"].should.be.a('string');
            res.body[0]["clinicName"].should.equals('EXPLANADA');

            res.should.have.a.header('eva-total', 630);
            res.should.have.a.header('eva-pages', 1);
            res.should.have.a.header('eva-page', 1);

            done();
        })
    })
    it('Get all bookings in a specific clinic by consumed medications LAX MODE', (done) => {
        chai.request(app)
        .get('/bookings?mode=LAX&clinic=EXPLANADA&medication[]=HORMONE_THERAPY&medication[]=ANTIBIOTICS&medication[]=BLOOD_THINNERS&medication[]=VITAMINS&medication[]=COAGULANTS')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');

            res.body[0].should.have.a.property('id');
            res.body[0]["id"].should.be.a('number');
            res.body[0]["id"].should.equals(12);

            res.body[0].should.have.a.property('name');
            res.body[0]["name"].should.be.a('string');
            res.body[0]["name"].should.equals('Christine Bradley');

            res.body[0].should.have.a.property('email');
            res.body[0]["email"].should.be.a('string');
            res.body[0]["email"].should.equals('delia_andrews@gmail.com');

            res.body[0].should.have.a.property('datetime');
            res.body[0]["datetime"].should.be.a('string');
            res.body[0]["datetime"].should.equals('2019-11-12T01:31:11.812Z');

            res.body[0].should.have.a.property('clinicName');
            res.body[0]["clinicName"].should.be.a('string');
            res.body[0]["clinicName"].should.equals('EXPLANADA');

            res.should.have.a.header('eva-total', 11199);
            res.should.have.a.header('eva-pages', 12);
            res.should.have.a.header('eva-page', 1);

            done();
        })
    })
    it('Get all bookings in a frame time by consumed medications STRICT MODE', (done) => {
        chai.request(app)
        .get('/bookings?medication[]=HORMONE_THERAPY&medication[]=ANTIBIOTICS&medication[]=BLOOD_THINNERS&medication[]=VITAMINS&medication[]=COAGULANTS&frametime[start]=2019-11-27T01:19:51.813Z&frametime[end]=2019-11-28T01:19:51.813Z')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');

            res.body[0].should.have.a.property('id');
            res.body[0]["id"].should.be.a('number');
            res.body[0]["id"].should.equals(200);

            res.body[0].should.have.a.property('name');
            res.body[0]["name"].should.be.a('string');
            res.body[0]["name"].should.equals('Kathryn Kelley');

            res.body[0].should.have.a.property('email');
            res.body[0]["email"].should.be.a('string');
            res.body[0]["email"].should.equals('kathryn_kelley@gmail.com');

            res.body[0].should.have.a.property('datetime');
            res.body[0]["datetime"].should.be.a('string');
            res.body[0]["datetime"].should.equals('2019-11-27T21:29:36.348Z');

            res.body[0].should.have.a.property('clinicName');
            res.body[0]["clinicName"].should.be.a('string');
            res.body[0]["clinicName"].should.equals('SANTA_FE');

            res.should.have.a.header('eva-total', 83);
            res.should.have.a.header('eva-pages', 1);
            res.should.have.a.header('eva-page', 1);

            done();
        })
    })
    it('Get all bookings in a frame time by consumed medications LAX MODE', (done) => {
        chai.request(app)
        .get('/bookings?mode=LAX&medication[]=HORMONE_THERAPY&medication[]=ANTIBIOTICS&medication[]=BLOOD_THINNERS&medication[]=VITAMINS&medication[]=COAGULANTS&frametime[start]=2019-11-27T01:19:51.813Z&frametime[end]=2019-11-28T01:19:51.813Z')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');

            res.body[0].should.have.a.property('id');
            res.body[0]["id"].should.be.a('number');
            res.body[0]["id"].should.equals(1);

            res.body[0].should.have.a.property('name');
            res.body[0]["name"].should.be.a('string');
            res.body[0]["name"].should.equals('Rosetta Graham');

            res.body[0].should.have.a.property('email');
            res.body[0]["email"].should.be.a('string');
            res.body[0]["email"].should.equals('rosetta_graham@gmail.com');

            res.body[0].should.have.a.property('datetime');
            res.body[0]["datetime"].should.be.a('string');
            res.body[0]["datetime"].should.equals('2019-11-27T07:44:43.411Z');

            res.body[0].should.have.a.property('clinicName');
            res.body[0]["clinicName"].should.be.a('string');
            res.body[0]["clinicName"].should.equals('SANTA_FE');

            res.should.have.a.header('eva-total', 1504);
            res.should.have.a.header('eva-pages', 2);
            res.should.have.a.header('eva-page', 1);

            done();
        })
    })
    it('Get all bookings in a specific clinic during a frame time by consumed medications STRICT MODE', (done) => {
        chai.request(app)
        .get('/bookings?clinic=EXPLANADA&medication[]=HORMONE_THERAPY&medication[]=ANTIBIOTICS&medication[]=BLOOD_THINNERS&medication[]=VITAMINS&medication[]=COAGULANTS&frametime[start]=2019-11-27T01:19:51.813Z&frametime[end]=2019-11-28T01:19:51.813Z')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');

            res.body[0].should.have.a.property('id');
            res.body[0]["id"].should.be.a('number');
            res.body[0]["id"].should.equals(3210);

            res.body[0].should.have.a.property('name');
            res.body[0]["name"].should.be.a('string');
            res.body[0]["name"].should.equals('Curtis Alexander');

            res.body[0].should.have.a.property('email');
            res.body[0]["email"].should.be.a('string');
            res.body[0]["email"].should.equals('curtis_alexander@gmail.com');

            res.body[0].should.have.a.property('datetime');
            res.body[0]["datetime"].should.be.a('string');
            res.body[0]["datetime"].should.equals('2019-11-27T21:22:41.553Z');

            res.body[0].should.have.a.property('clinicName');
            res.body[0]["clinicName"].should.be.a('string');
            res.body[0]["clinicName"].should.equals('EXPLANADA');

            res.should.have.a.header('eva-total', 22);
            res.should.have.a.header('eva-pages', 1);
            res.should.have.a.header('eva-page', 1);

            done();
        })
    })
    it('Get all bookings in a specific clinic during a frame time by consumed medications LAX MODE', (done) => {
        chai.request(app)
        .get('/bookings?mode=LAX&clinic=EXPLANADA&medication[]=HORMONE_THERAPY&medication[]=ANTIBIOTICS&medication[]=BLOOD_THINNERS&medication[]=VITAMINS&medication[]=COAGULANTS&frametime[start]=2019-11-27T01:19:51.813Z&frametime[end]=2019-11-28T01:19:51.813Z')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');

            res.body[0].should.have.a.property('id');
            res.body[0]["id"].should.be.a('number');
            res.body[0]["id"].should.equals(734);

            res.body[0].should.have.a.property('name');
            res.body[0]["name"].should.be.a('string');
            res.body[0]["name"].should.equals('Pauline Alexander');

            res.body[0].should.have.a.property('email');
            res.body[0]["email"].should.be.a('string');
            res.body[0]["email"].should.equals('pauline_alexander@gmail.com');

            res.body[0].should.have.a.property('datetime');
            res.body[0]["datetime"].should.be.a('string');
            res.body[0]["datetime"].should.equals('2019-11-27T15:56:30.283Z');

            res.body[0].should.have.a.property('clinicName');
            res.body[0]["clinicName"].should.be.a('string');
            res.body[0]["clinicName"].should.equals('EXPLANADA');

            res.should.have.a.header('eva-total', 372);
            res.should.have.a.header('eva-pages', 1);
            res.should.have.a.header('eva-page', 1);

            done();
        })
    })
})

describe('Test URL\'s endpoint using bad requests',() => {
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
    it('Get all bookings in a specific frame time but bad request', (done) => {
        chai.request(app)
        .get('/bookings?frametime[end]=2019-11-28T01:19:51.813Z')
        .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.a.property('message');
            res.body.message.should.equals('Petición mal formada.')

            done();
        })
    })
})

describe('Test URL\'s endpoint using pagination',() => {
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
    it('Get all bookings with page 2', (done) => {
        chai.request(app)
        .get('/bookings?page=2')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');

            res.body[0].should.have.a.property('id');
            res.body[0]["id"].should.be.a('number');
            res.body[0]["id"].should.equals(1000);

            res.body[0].should.have.a.property('name');
            res.body[0]["name"].should.be.a('string');
            res.body[0]["name"].should.equals('Warren Diaz');

            res.body[0].should.have.a.property('email');
            res.body[0]["email"].should.be.a('string');
            res.body[0]["email"].should.equals('ethel_strickland@gmail.com');

            res.body[0].should.have.a.property('datetime');
            res.body[0]["datetime"].should.be.a('string');
            res.body[0]["datetime"].should.equals('2019-11-11T15:30:05.170Z');

            res.body[0].should.have.a.property('clinicName');
            res.body[0]["clinicName"].should.be.a('string');
            res.body[0]["clinicName"].should.equals('ANGELOPOLIS');

            res.should.have.a.header('eva-total', 50000);
            res.should.have.a.header('eva-pages', 50);
            res.should.have.a.header('eva-page', 2);

            done();
        })
    })
    it('Get all bookings in a specific clinic during a frame time by consumed medications STRICT MODE', (done) => {
        chai.request(app)
        .get('/bookings?clinic=EXPLANADA&medication[]=HORMONE_THERAPY&medication[]=ANTIBIOTICS&medication[]=BLOOD_THINNERS&medication[]=VITAMINS&medication[]=COAGULANTS&frametime[start]=2019-11-11T01:19:51.813Z&frametime[end]=2019-11-11T01:19:51.813Z')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.should.eql([]);

            res.should.have.a.header('eva-total', 1);
            res.should.have.a.header('eva-pages', 1);
            res.should.have.a.header('eva-page', 1);

            done();
        })
    })
    it('Get all bookings in a specific frame time by consumed medications STRICT MODE', (done) => {
        chai.request(app)
        .get('/bookings?medication[]=HORMONE_THERAPY&medication[]=ANTIBIOTICS&medication[]=BLOOD_THINNERS&medication[]=VITAMINS&medication[]=COAGULANTS&frametime[start]=2019-11-11T01:19:51.813Z&frametime[end]=2019-11-11T01:19:51.813Z')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.should.eql([]);

            res.should.have.a.header('eva-total', 1);
            res.should.have.a.header('eva-pages', 1);
            res.should.have.a.header('eva-page', 1);

            done();
        })
    })
    it('Get all bookings in a specific clinic during a frame time', (done) => {
        chai.request(app)
        .get('/bookings?clinic=EXPLANADA&frametime[start]=2019-11-11T01:19:51.813Z&frametime[end]=2019-11-11T01:19:51.813Z')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.should.eql([]);

            res.should.have.a.header('eva-total', 1);
            res.should.have.a.header('eva-pages', 1);
            res.should.have.a.header('eva-page', 1);

            done();
        })
    })
    it('Get all bookings by page overflow', (done) => {
        chai.request(app)
        .get('/bookings?page=51')
        .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body.should.eql([])

            res.should.have.a.header('eva-total', 50000);
            res.should.have.a.header('eva-pages', 50);
            res.should.have.a.header('eva-page', 51);

            done();
        })
    })
})