'use strict';

describe('Controller: NeighbourhoodMapCtrl', function () {

  // load the controller's module
  beforeEach(module('portalApp'));

  var NeighbourhoodMapCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NeighbourhoodMapCtrl = $controller('NeighbourhoodMapCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});
