/* eslint no-unused-expressions: 0 */

'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Mongoose = require('mongoose');
var Server = require('../../../../../lib/server');

// var CP = require('child_process');
// var Path = require('path');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Chai.expect;
var it = lab.test;
var before = lab.before;
// var beforeEach = lab.beforeEach;
var after = lab.after;

var server;

describe('POST /properties/{propertyId}/apartments', function(){
  before(function(done){
    Server.init(function(err, srvr){
      if(err){ throw err; }
      server = srvr;
      done();
    });
  });


  // beforeEach(function(done){
  //   var db = server.app.environment.MONGO_URL;
  //   db = db.split('/')[3];
  //   CP.execFile(Path.join(__dirname, '../../../../../scripts/clean-db.sh'), [db], {cwd: Path.join(__dirname, '../../../../../scripts')}, function(){
  //     done();
  //   });
  // });

  after(function(done){
    server.stop(function(){
      Mongoose.disconnect(done);
    });
  });

  it('should create an apartment', function(done){
    server.inject({method: 'POST', url: '/properties/b00000000000000000000005/apartments', credentials: {_id: 'a00000000000000000000002'}, payload: {name: '103B', rooms: 3, sqft: 1000, bathrooms: 1, rent: 600}}, function(response){
      expect(response.statusCode).to.equal(200);
      expect(response.result.name).to.equal('103B');
      expect(response.result.rooms).to.equal(3);
      expect(response.result.sqft).to.equal(1000);
      expect(response.result.bathrooms).to.equal(1);
      expect(response.result.rent).to.equal(600);
      expect(response.result.isAvailable).to.be.true;
      expect(response.result.renters).to.have.length(0);
      expect(response.result.createdAt).to.be.instanceof(Date);
      // expect(response.result.__v).to.be.a('number');
      done();
    });
  });

  it('should return an error if given a non-existent property', function(done){
    server.inject({method: 'POST', url: '/properties/b000000000b0000000000005/apartments', credentials: {_id: 'a00000000000000000000002'}, payload: {name: '103B', rooms: 3, sqft: 1000, bathrooms: 1, rent: 600}}, function(response){
      expect(response.statusCode).to.equal(400);

      done();
    });
  });
});
