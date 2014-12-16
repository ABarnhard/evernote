/* jshint expr:true */

'use strict';

var expect     = require('chai').expect,
    server     = require('../../server/index'),
    cookie     = null,
    cp         = require('child_process'),
    // fs         = require('fs'),
    db         = require('../helpers/helpers').getdb(),
    Lab        = require('lab'),
    lab        = exports.lab = Lab.script(),
    describe   = lab.describe,
    it         = lab.it,
    before     = lab.before,
    beforeEach = lab.beforeEach;

describe('Notes', function(){

  before(function(done){
    done();
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      if(err){console.log(err, stdout, stderr);}
      var options = {
        method: 'POST',
        url: '/login',
        payload: {username: 'bob', password: '1234'}
      };
      server.inject(options, function(res){
        cookie = res.headers['set-cookie'][0].match(/hapi-cookie=[^;]+/)[0];
        done();
      });
    });
  });

  describe('get /notes/count', function(){
    it('should return the number of notes for the user', function(done){
      var options = {
        method: 'GET',
        url: '/notes/count',
        headers: {
          cookie: cookie
        }
      };

      server.inject(options, function(res){
        expect(res.statusCode).to.equal(200);
        expect(res.result.count).to.equal('1');
        done();
      });
    });
  });

  describe('post /notes', function(){
    it('should create a new note in the database', function(done){
      var options = {
        method: 'POST',
        url: '/notes',
        headers: {
          cookie: cookie
        },
        payload: {
            title: 'test-title',
            body: 'test-body',
            tags: 'test-tag1,test-tag2'
        }
      };

      server.inject(options, function(res){
        expect(res.statusCode).to.equal(200);
        expect(res.result.noteId).to.be.ok;
        done();
      });
    });
  });

  describe('get /notes', function(){
    it('should return notes from the database for user', function(done){
      var options = {
        method: 'GET',
        url: '/notes',
        headers: {
          cookie: cookie
        },
        payload: {
            limit: 10,
            offset: 0,
            tag: '%'
        }
      };

      server.inject(options, function(res){
        expect(res.statusCode).to.equal(200);
        expect(res.result.notes).to.have.length(1);
        done();
      });
    });
  });

  describe('delete /notes/{noteId}', function(){
    it('should delete a note from the database for user', function(done){
      var noteId = 1,
          options = {
            method: 'DELETE',
            url: '/notes/' + noteId,
            headers: {
              cookie: cookie
            }
          };

      server.inject(options, function(res){
        expect(res.statusCode).to.equal(200);
        expect(res.result.noteId).to.equal(1);
        done();
      });
    });
  });

  describe('get /notes/{noteId}', function(){
    it('should return a note from the database', function(done){
      var noteId = 1,
          options = {
            method: 'GET',
            url: '/notes/' + noteId,
            headers: {
              cookie: cookie
            }
          };

      server.inject(options, function(res){
        // console.log(res);
        expect(res.statusCode).to.equal(200);
        expect(res.result.title).to.equal('title1');
        done();
      });
    });
  });

  /* Testing file upload with HAPI is way to much work for acceptance tests
  describe('post /notes/{noteId}/upload', function(){
    it('should upload a photo to S3 & add record', function(done){
      var noteId  = 1,
          file    = fs.createReadStream(__dirname + '/../fixtures/test_img.png'),
          options = {
            method: 'POST',
            url: '/notes/' + noteId + '/upload',
            headers: {
              cookie: cookie
            },
            payload: {
                file: file
            }
          };

      server.inject(options, function(res){
        // console.log(res);
        expect(res.statusCode).to.equal(200);
        expect(res.result.title).to.equal('title1');
        done();
      });
    });
  });
  */

});
