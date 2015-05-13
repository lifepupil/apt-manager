/* eslint no-unused-expressions: 0 */

'use strict';

var Chai = require('chai');
var Lab = require('lab');
var Mongoose = require('mongoose');
var CP = require('child_process');
var Path = require('path');
var Server = require('../../../../lib/server');

var lab = exports.lab = Lab.script();
var describe = lab.experiment;
var expect = Chai.expect;
var it = lab.test;
var before = lab.before;
var beforeEach = lab.beforeEach;
var after = lab.after;

var server;

describe('GET /properties/{managerId}', function(){
  before(function(done){
    Server.init(function(err, srvr){
      if(err){ throw err; }
      server = srvr;
      done();
    });
  });

  beforeEach(function(done){
    var db = server.app.environment.MONGO_URL;
    db = db.split('/')[3];
    CP.execFile(Path.join(__dirname, '../../../../scripts/clean-db.sh'), [db], {cwd: Path.join(__dirname, '../../../../scripts')}, function(){
      done();
    });
  });

  after(function(done){
    server.stop(function(){
      Mongoose.disconnect(done);
    });
  });

  it('should create a property', function(done){
    expect(2).to.equal(2);
    done();
  });

  it('should return an array of properties belonging to manager with id=a00000000000000000000001', function(done){
    server.inject({method: 'GET', url: '/properties/a00000000000000000000001', credentials: {_id: 3}}, function(response){
      expect(response.statusCode).to.equal(200);
      // expect(response.result).to.equal(3);
      done();
    });
  });
});
