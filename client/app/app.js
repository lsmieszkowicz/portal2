'use strict';

angular.module('portalApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngStorage',
  'ngRoute',
  'ui.bootstrap',
  'ngFileUpload',
  'uiGmapgoogle-maps'
])
  .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($localStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                }
                return config;
            },
            'responseError': function(response) {
                if(response.status === 401 || response.status === 403) {
                    $location.path('/');
                }
                return $q.reject(response);
            }
        };
    }]);

  })

  .config(
    ['uiGmapGoogleMapApiProvider', function(GoogleMapApiProviders) {
      GoogleMapApiProviders.configure({
        china: true,
        v: '3.20',
        libraries: 'places' // Required for SearchBox.
      });
    }]
  );
