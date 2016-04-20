'use strict';

describe('Directive: Map', function () {

  // load the directive's module and view
  beforeEach(module('portalApp'));
  beforeEach(module('components/MapDirective/Map/Map.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<-map></-map>');
    element = $compile(element)(scope);
    scope.$apply();
  }));
});
