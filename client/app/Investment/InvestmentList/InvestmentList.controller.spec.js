'use strict';

describe('Controller: InvestmentListCtrl', function () {

  // load the controller's module
  beforeEach(module('portalApp'));

  var InvestmentListCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InvestmentListCtrl = $controller('InvestmentListCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
