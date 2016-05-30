'use strict';

angular.module('portalApp')
  .factory('User', function ($resource, $q) {
    // Service logic
    var user = $resource('/api/users/:id', 
          {id: '@id'},
          {
            update: {method: 'PUT'},
            getProfilePhoto: {method: 'GET', url: 'api/users/:id/profile_image'},
            getCities: {method: 'GET', url: 'api/users/:id/cities'},
            updateRank: {method: 'PATCH'}
          }
    );

    // Public API here
    return {
      getAll: function(){
        var deffered = $q.defer();

        user.query(function(data){
          deffered.resolve(data);
        });

        return deffered.promise;  
      },

      get: function(id){
        var deffered = $q.defer();

        user.get({id: id}, function(data){
          deffered.resolve(data);
        });

        return deffered.promise;
      },

      getProfilePhoto: function(id){
          var deffered = $q.defer();

          user.getProfilePhoto({id: id}, function(data){
            deffered.resolve(data);
          });

          return deffered.promise;
      },

      getCities: function(id){
          var deffered = $q.defer();

          user.getCities({id: id}, function(data){
            deffered.resolve(data);
          });

          return deffered.promise;
      },

      update: function(id, obj){
        var deffered = $q.defer();

        user.update({id: id}, obj, function(data){
          deffered.resolve(data);
        });

        return deffered.promise;
      },

      updateRank: function(id, value){
        var deffered = $q.defer();

        user.updateRank({id: id}, value, function(data){
          deffered.resolve(data);
        });

        return deffered.promise;
      }

    };
  });
