'use strict';

describe('Controller: InvestmentShowCtrl', function () {

  // load the controller's module
  beforeEach(module('portalApp'));

  var InvestmentShowCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InvestmentShowCtrl = $controller('InvestmentShowCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
