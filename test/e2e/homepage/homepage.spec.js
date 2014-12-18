'use strict';

describe('homepage', function(){
  it('should get the homepage', function(){
    browser.get('/');
    expect(browser.getTitle()).toEqual('NoteTaker');
    expect(element(by.css('div[ui-view] > h1')).getText()).toEqual('home');
  });
});
