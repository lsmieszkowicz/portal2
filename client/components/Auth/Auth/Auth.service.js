'use strict';

angular.module('portalApp')
  .factory('Auth', function () {
    // Service logic
    

    // Public API here
    return {
      login: function(data, success, error) {
        $http.post('/login', data).success(success).error(error);
      },

      register: function(data, success, error) {
        $http.post('/register', data).success(success).error(error);
      },

      logout: function(success, error) {
        $scope.activeUser = null;
        delete $localStorage.token;
        success();
      }
    };
  });
