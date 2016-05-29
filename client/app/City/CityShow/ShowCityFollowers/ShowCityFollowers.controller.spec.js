'use strict';

describe('Controller: ShowCityFollowersCtrlCtrl', function () {

  // load the controller's module
  beforeEach(module('portalApp'));

  var ShowCityFollowersCtrlCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowCityFollowersCtrlCtrl = $controller('ShowCityFollowersCtrlCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
  });
});
