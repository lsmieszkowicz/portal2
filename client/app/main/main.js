'use strict';

angular.module('portalApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/kjshdfkjsdhfkjsdhfkjshdf', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      });
  });