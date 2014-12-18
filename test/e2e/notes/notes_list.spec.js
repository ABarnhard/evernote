'use strict';

var cp   = require('child_process'),
    h    = require('../../helpers/helpers'),
    db   = h.getdb(),
    path = require('path');

describe('notes list', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../../scripts/clean-db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
      if(err){console.log(err, stdout, stderr);}
      login();
      done();
    });
  });

  it('should get the notes page', function(){
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('notes');
  });

  it('should create a note', function(){
    var image = path.resolve(__dirname, '../../fixtures/test_img.png');

    element(by.model('note.title')).sendKeys('test title');
    h.debug('red');
    element(by.model('note.body')).sendKeys('test body');
    element(by.model('note.tags')).sendKeys('a,b,c');
    element(by.css('input[type="file"]')).sendKeys(image);

    h.debug('blue');

    expect(element(by.css('a[ui-sref="notes.list"]')).isDisplayed()).toBeTruthy();
  });

});

function login(){
  browser.get('/#/login');
  element(by.model('user.username')).sendKeys('bob');
  element(by.model('user.password')).sendKeys('1234');
  element(by.css('button[ng-click]')).click();
  browser.get('/#/notes');
}
