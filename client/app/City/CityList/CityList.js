'use strict';

angular.module('portalApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/city/list', {
        templateUrl: 'app/City/CityList/CityList.html',
        controller: 'CityListCtrl'
      });
  });
