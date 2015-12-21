'use strict';

describe('Controller: CityListCtrl', function () {

  // load the controller's module
  beforeEach(module('portalApp'));

  var CityListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CityListCtrl = $controller('CityListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
