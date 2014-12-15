/* jshint expr:true */

'use strict';

var expect     = require('chai').expect,
    User       = require('../../server/models/user'),
    cp         = require('child_process'),
    db         = require('../helpers/helpers').getdb(),
    Lab        = require('lab'),
    lab        = exports.lab = Lab.script(),
    describe   = lab.describe,
    it         = lab.it,
    before     = lab.before,
    beforeEach = lab.beforeEach;

describe('User', function(){

  before(function(done){
    done();
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      if(err){console.log(err, stdout, stderr);}
      done();
    });
  });

  describe('constructor', function(){
    it('should create a user object', function(done){
        var user = new User({username: 'bob'});
        expect(user).to.be.instanceof(User);
        expect(user.username).to.equal('bob');
        done();
    });
  });

  describe('.register', function(){
    it('should register a new user', function(done){
        var input = {
            username:'bob',
            password:'1234',
            avatar:'http://images.apple.com/global/elements/flags/16x16/usa_2x.png'
        };
        User.register(input, function(err){
            console.log(err);
            expect(err).to.be.null;
            done();
        });
    });
  });

});

