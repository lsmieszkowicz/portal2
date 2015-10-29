'use strict';

describe('Controller: AddInvestmentModalCtrl', function () {

  // load the controller's module
  beforeEach(module('portalApp'));

  var AddInvestmentModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AddInvestmentModalCtrl = $controller('AddInvestmentModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
