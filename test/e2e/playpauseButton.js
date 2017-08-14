var config = require('../../nightwatch.conf.BASIC.js');

module.exports = { // adapted from: https://git.io/vodU0
  'Play Button visible': function(browser) {
    browser
      .url('localhost:3000')
      .waitForElementVisible('body')
      .assert.visible('.video_player .controls .play_button')
      .saveScreenshot('player.png')
      .end();
  }
};
