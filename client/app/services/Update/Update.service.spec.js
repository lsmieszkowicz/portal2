'use strict';

describe('Service: Update', function () {

  // load the service's module
  beforeEach(module('portalApp'));

  // instantiate service
  var Update;
  beforeEach(inject(function (_Update_) {
    Update = _Update_;
  }));

  it('should do something', function () {
    expect(!!Update).toBe(true);
  });

});
