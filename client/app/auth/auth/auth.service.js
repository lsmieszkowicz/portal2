'use strict';

angular.module('portalApp')
  .factory('Auth', function($http, $localStorage) {
    

    // Public API here
    return {
        
        login: function(data, success, error){
          $http.post('/api/auth/login', data)
           .success(success)
           .error(error);
        },

        register: function(data, success, error){
          $http.post('/api/auth/register', data)
            .success(success)
            .error(error);
        },

        logout: function(success, error){
          delete $localStorage.token;
          delete $localStorage.user;
          success();
        }

    };
    
  });
