'use strict';

describe('Service: FollowCity', function () {

  // load the service's module
  beforeEach(module('portalApp'));

  // instantiate service
  var FollowCity;
  beforeEach(inject(function (_FollowCity_) {
    FollowCity = _FollowCity_;
  }));

  it('should do something', function () {
    expect(!!FollowCity).toBe(true);
  });

});
