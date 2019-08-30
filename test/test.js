var chai = require('chai');
var chaiHttp= require('chai-http');

chai.use(chaiHttp);

var should = chai.should();

var app = require('../app');

describe('Test',() => {
    it('User test', (done) => {
        chai.request(app)
        .get('/users')
        .end((err, res) => {
            res.should.have.status(201)
            done(err);
        })
    })
})