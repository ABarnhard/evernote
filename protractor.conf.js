'use strict';

var config = {};

config.seleniumAddress = 'http://localhost:4444/wd/hub';
config.multiCapabilities = [
  {
    browserName: 'chrome'
  },
  {
    browserName: 'firefox'
  }
];

config.suites = {
  homepage: 'test/e2e/homepage/**/*.spec.js',
  authentication: 'test/e2e/authentication/**/*.spec.js'
};

config.jasmineNodeOpts = {
  isVerbose: true,
  showColors: true,
  defaultTimeoutInterval: 30000
};

config.baseUrl = 'http://localhost:9000';

exports.config = config;
