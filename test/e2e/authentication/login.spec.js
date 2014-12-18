'use strict';

var cp = require('child_process'),
    h  = require('../../helpers/helpers'),
    db = h.getdb();

describe('login', function(){
  beforeEach(function(done){
    cp.execFile(__dirname + '/../../scripts/clean-db.sh', [db], {cwd:__dirname + '/../../scripts'}, function(err, stdout, stderr){
      if(err){console.log(err, stdout, stderr);}
      browser.get('/#/login');
      done();
    });
  });

  it('should get the login page', function(){
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('login');
  });

  it('should log in a user', function(){
    element(by.model('user.username')).sendKeys('bob');
    element(by.model('user.password')).sendKeys('1234');
    element(by.css('button[ng-click]')).click();
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('home');
    expect(element(by.css('a[ui-sref="notes.list"]')).isDisplayed()).toBeTruthy();
  });

  it('should not log in a user', function(){
    element(by.model('user.username')).sendKeys('bob');
    element(by.model('user.password')).sendKeys('12345');
    element(by.css('button[ng-click]')).click();
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('login');
  });

});
