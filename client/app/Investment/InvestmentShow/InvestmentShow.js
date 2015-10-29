'use strict';

angular.module('portalApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/investment/show/:id', {
        templateUrl: 'app/Investment/InvestmentShow/InvestmentShow.html',
        controller: 'InvestmentShowCtrl'
      });
  });
