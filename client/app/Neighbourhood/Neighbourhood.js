'use strict';

angular.module('portalApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/neighbourhood', {
        templateUrl: 'app/Neighbourhood/Neighbourhood.html',
        controller: 'NeighbourhoodCtrl'
      });
  });
