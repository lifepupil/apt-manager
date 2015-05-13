/* eslint no-unused-expressions: 0 */

'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Mongoose = require('mongoose');
var Server = require('../../../../lib/server');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Chai.expect;
var it = lab.test;
var before = lab.before;
var after = lab.after;

var server;

describe('POST /properties', function(){
  before(function(done){
    Server.init(function(err, srvr){
      if(err){ throw err; }
      server = srvr;
      done();
    });
  });

  after(function(done){
    server.stop(function(){
      Mongoose.disconnect(done);
    });
  });

  it('should create a property', function(done){
    server.inject({method: 'POST', url: '/properties', credentials: {_id: 'a11111111111111111111111'}, payload: {name: 'Hapi Flats', address: 'HELL Bwahahaha!'}}, function(response){
      console.log(response.result);
      console.log();
      expect(response.statusCode).to.equal(200);
      expect(response.result.name).to.equal('Hapi Flats');
      expect(response.result.address).to.equal('HELL Bwahahaha!');
      expect(response.result.createdAt).to.be.instanceof(Date);
      expect(response.result.__v).to.be.a('number');
      expect(response.result.managerId.toString()).to.have.length(24);
      expect(response.result.managerId.toString()).to.equal('a11111111111111111111111');
      done();
    });
  });
});
