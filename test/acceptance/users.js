/* jshint expr:true */

'use strict';

var expect     = require('chai').expect,
    server     = require('../../server/index'),
    cookie     = null,
    cp         = require('child_process'),
    db         = require('../helpers/helpers').getdb(),
    Lab        = require('lab'),
    lab        = exports.lab = Lab.script(),
    describe   = lab.describe,
    it         = lab.it,
    before     = lab.before,
    beforeEach = lab.beforeEach;

describe('Users', function(){

  before(function(done){
    done();
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      if(err){console.log(err, stdout, stderr);}
      var options = {
        method: 'POST',
        url: '/login',
        payload: {
            username: 'bob',
            password: '1234'
        }
      };

      server.inject(options, function(res){
        cookie = res.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
        // console.log(cookie);
        done();
      });
    });
  });

  describe('post /register', function(){
    it('should register a new user', function(done){
        var options = {
            method: 'POST',
            url: '/register',
            payload: {
                username: 'sam',
                password: '1234',
                avatar: 'http://images.apple.com/global/elements/flags/16x16/usa_2x.png'
            }
        };

        server.inject(options, function(res){
            expect(res.statusCode).to.equal(200);
            done();
        });
    });
    it('should NOT register a new user (duplicate username)', function(done){
        var options = {
            method: 'POST',
            url: '/register',
            payload: {
                username: 'bob',
                password: '1234',
                avatar: 'http://images.apple.com/global/elements/flags/16x16/usa_2x.png'
            }
        };

        server.inject(options, function(res){
            expect(res.statusCode).to.equal(400);
            done();
        });
    });
  });

  describe('post /login', function(){
    it('should login new user', function(done){
        var options = {
            method: 'POST',
            url: '/login',
            payload: {
                username: 'bob',
                password: '1234'
            }
        };

        server.inject(options, function(res){
            expect(res.statusCode).to.equal(200);
            expect(res.result.username).to.equal('bob');
            expect(res.result.avatar).to.equal('https://s3.amazonaws.com/adam-evernote-test/token/avatar.png');
            done();
        });
    });
    it('should NOT login user (bad username)', function(done){
        var options = {
            method: 'POST',
            url: '/login',
            payload: {
                username: 'jim',
                password: '1234'
            }
        };

        server.inject(options, function(res){
            expect(res.statusCode).to.equal(401);
            done();
        });
    });
    it('should NOT login user (bad password)', function(done){
        var options = {
            method: 'POST',
            url: '/login',
            payload: {
                username: 'bob',
                password: '12345'
            }
        };

        server.inject(options, function(res){
            expect(res.statusCode).to.equal(401);
            done();
        });
    });
  });

  describe('delete /logout', function(){
    it('should logout the user', function(done){
      var options = {
        method: 'DELETE',
        url: '/logout',
        headers: {
            cookie: cookie
        }
      };

      server.inject(options, function(res){
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });

  describe('get /status', function(){
    it('should get the logged in status of the user', function(done){
      var options = {
        method: 'GET',
        url: '/status',
        headers: {
            cookie: cookie
        }
      };

      server.inject(options, function(res){
        expect(res.statusCode).to.equal(200);
        expect(res.result.username).to.equal('bob');
        expect(res.result.avatar).to.equal('https://s3.amazonaws.com/adam-evernote-test/token/avatar.png');
        done();
      });
    });
  });

});
