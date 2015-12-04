'use strict';

describe('Controller: TopCtrl', function () {

  // load the controller's module
  beforeEach(module('portalApp'));

  var TopCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TopCtrl = $controller('TopCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
