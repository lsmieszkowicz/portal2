'use strict';

describe('Controller: EditUserModalCtrl', function () {

  // load the controller's module
  beforeEach(module('portalApp'));

  var EditUserModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditUserModalCtrl = $controller('EditUserModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
