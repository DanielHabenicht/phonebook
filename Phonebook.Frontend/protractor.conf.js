// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

// Use pupeteer
process.env.CHROME_BIN = require('puppeteer').executablePath();

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
  allScriptsTimeout: 11000,
  specs: ['./e2e/**/*.e2e-spec.ts'],
  capabilities: {
    browserName: 'chrome',
    binary: process.env.CHROME_BIN,
    chromeOptions: {
      args: ['--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222']
    }
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function() {}
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },

  plugins: [
    {
      package: 'protractor-console-plugin',
      failOnWarning: false,
      failOnError: false,
      logWarnings: true
    }
  ]
};
