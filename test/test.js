var assert = require('assert');

var {toTimeLabel} = require('../src/utils')

describe('Utils', function() {
    describe('#toTimeLabel(time)', function() {
        it('should return 00:01 when the value is 1', function() {
            assert.equal("0:01", toTimeLabel(1));
        });
        it('should return 1:00 when the value is 60', function() {
            assert.equal("1:00", toTimeLabel(60));
        });
        it('should return 1:00:00 when the value is 3600', function() {
            assert.equal("1:00:00", toTimeLabel(3600));
        });
        it('should return 1:01:01 when the value is 3661', function() {
            assert.equal("1:01:01", toTimeLabel(3661));
        });
    });
});
