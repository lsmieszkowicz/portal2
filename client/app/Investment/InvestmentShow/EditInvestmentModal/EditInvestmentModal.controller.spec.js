'use strict';

describe('Controller: EditInvestmentModalCtrl', function () {

  // load the controller's module
  beforeEach(module('portalApp'));

  var EditInvestmentModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditInvestmentModalCtrl = $controller('EditInvestmentModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
