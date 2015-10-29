'use strict';

describe('Service: Follow', function () {

  // load the service's module
  beforeEach(module('portalApp'));

  // instantiate service
  var Follow;
  beforeEach(inject(function (_Follow_) {
    Follow = _Follow_;
  }));

  it('should do something', function () {
    expect(!!Follow).toBe(true);
  });

});
