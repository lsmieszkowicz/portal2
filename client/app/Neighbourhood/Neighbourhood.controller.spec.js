'use strict';

describe('Controller: NeighbourhoodCtrl', function () {

  // load the controller's module
  beforeEach(module('portalApp'));

  var NeighbourhoodCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NeighbourhoodCtrl = $controller('NeighbourhoodCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
