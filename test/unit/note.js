/* jshint expr:true */

'use strict';

var expect     = require('chai').expect,
    Note       = require('../../server/models/note'),
    cp         = require('child_process'),
    fs         = require('fs'),
    db         = require('../helpers/helpers').getdb(),
    Lab        = require('lab'),
    lab        = exports.lab = Lab.script(),
    describe   = lab.describe,
    it         = lab.it,
    before     = lab.before,
    beforeEach = lab.beforeEach;

describe('Note', function(){

  before(function(done){
    done();
  });

  beforeEach(function(done){
    cp.execFile(__dirname + '/../scripts/clean-db.sh', [db], {cwd:__dirname + '/../scripts'}, function(err, stdout, stderr){
      if(err){console.log(err, stdout, stderr);}
      done();
    });
  });

  describe('.create', function(){
    it('should create note for the user', function(done){
        var n = {
            title: 'a',
            body: 'a',
            tags: 'a,b,c'
        },
            u = {id: 1};
        Note.create(u, n, function(err, res){
            // console.log(res);
            expect(err).to.not.be.ok;
            expect(res).to.be.ok;
            done();
        });
    });
  });

  describe('.query', function(){
    it('should return all notes for user', function(done){
        var q = {
            limit: 10,
            offset: 0,
            tag: '%'
        },
            u = {id: 1};
        Note.query(u, q, function(err, rows){
            if(err){console.log(err);}
            expect(err).to.not.be.ok;
            expect(rows).to.have.length(1);
            done();
        });
    });
    it('should return no notes for user', function(done){
        var q = {
            limit: 10,
            offset: 10,
            tag: '%'
        },
            u = {id: 1};
        Note.query(u, q, function(err, rows){
            if(err){console.log(err);}
            expect(err).to.not.be.ok;
            expect(rows).to.have.length(0);
            done();
        });
    });
  });

  describe('.show', function(){
    it('should return the specific note for the user', function(done){
        var u      = {id: 1},
            noteId = 1;
        Note.show(u, noteId, function(err, note){
            if(err){console.log(err);}
            expect(err).to.not.be.ok;
            expect(note).to.be.ok;
            expect(note.title).to.equal('title1');
            done();
        });
    });
  });

  describe('.count', function(){
    it('should return the number of notes for the user', function(done){
        var u = {id: 1};
        Note.count(u, function(err, count){
            if(err){console.log(err);}
            expect(err).to.not.be.ok;
            expect(count).to.be.ok;
            expect(parseInt(count)).to.equal(1);
            done();
        });
    });
  });

  describe('.nuke', function(){
    it('should delete a user\'s note', function(done){
        var u      = {id: 1},
            noteId = 1;
        Note.nuke(u, noteId, function(err, count){
            if(err){console.log(err);}
            expect(err).to.not.be.ok;
            expect(count).to.be.ok;
            expect(parseInt(count)).to.equal(1);
            done();
        });
    });
  });

  describe('.upload', function(){
    it('should add a photo record and upload to S3', function(done){
        var u      = {token: 'token'},
            file   = fs.createReadStream(__dirname + '/../fixtures/test_img.png'),
            name   = 'test_img.png',
            noteId = 1;

        Note.upload(u, file, name, noteId, function(err, res){
            if(err){console.log(err);}
            expect(err).to.not.be.ok;
            done();
        });
    });
  });

  describe('.uploadmobile', function(){
    it('should upload a b64 encoded image to S3 and add a db record', function(done){
        var u      = {token: 'token'},
            b64    = 'thisisab64encodedstring',
            noteId = 1;

        Note.uploadmobile(u, b64, noteId, function(err, res){
            if(err){console.log(err);}
            expect(err).to.not.be.ok;
            done();
        });
    });
  });
});
