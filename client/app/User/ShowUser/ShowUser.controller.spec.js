'use strict';

describe('Controller: ShowUserCtrl', function () {

  // load the controller's module
  beforeEach(module('portalApp'));

  var ShowUserCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowUserCtrl = $controller('ShowUserCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});
