'use strict';

describe('Controller: CityShowCtrl', function () {

  // load the controller's module
  beforeEach(module('portalApp'));

  var CityShowCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CityShowCtrl = $controller('CityShowCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
