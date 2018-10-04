var pConfig = require('./../../../utils/protractor.configuration.js');

var config = pConfig.getConfig({
    configFileName: 'record/links.dev.json',
    specs: [
        "links.spec.js"
    ],
    setBaseUrl: function(browser, data) {
      browser.params.url = process.env.CHAISE_BASE_URL;
      return browser.params.url;
  },
  chaiseConfigFilePath: 'test/e2e/specs/default-config/chaise-config.js'
});

exports.config = config;
