'use strict';

angular.module('portalApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/investment/list', {
        templateUrl: 'app/Investment/InvestmentList/InvestmentList.html',
        controller: 'InvestmentListCtrl'
      });
  });
