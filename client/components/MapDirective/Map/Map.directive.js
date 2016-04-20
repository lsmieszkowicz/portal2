'use strict';

angular.module('portalApp')
  .directive('Map', function () {
    return {
      templateUrl: 'components/MapDirective/Map/Map.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });
