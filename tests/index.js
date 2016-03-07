/**
 * Created by badayaa on 3/6/16.
 */
//imports
var request = require('supertest');

//basic tests for express app
describe('express app test', function () {
    var server;
    beforeEach(function () {
        server = require('../server.js');
    });
    it('testing /', function testBase(done) {
        request(server)
            .get('/')
            .expect(200, done());
    });
    it('testing /_health', function testHealth(done) {
        request(server)
            .get('/_health')
            .expect(200, done());
    })
    it('testing 404 for invalid url', function testInvalidPath(done) {
        request(server)
            .get('/foo/bar')
            .expect(404, done());
    });
});