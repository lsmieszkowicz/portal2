'use strict';

angular.module('portalApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/city/show/', {
        templateUrl: 'app/City/CityShow/CityShow.html',
        controller: 'CityShowCtrl'
      });
  });
