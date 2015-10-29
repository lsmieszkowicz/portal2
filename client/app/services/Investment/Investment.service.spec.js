'use strict';

describe('Service: Investment', function () {

  // load the service's module
  beforeEach(module('portalApp'));

  // instantiate service
  var Investment;
  beforeEach(inject(function (_Investment_) {
    Investment = _Investment_;
  }));

  it('should do something', function () {
    expect(!!Investment).toBe(true);
  });

});
