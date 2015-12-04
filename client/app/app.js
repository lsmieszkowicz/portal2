'use strict';

angular.module('portalApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngStorage',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  });
