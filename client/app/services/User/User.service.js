'use strict';

angular.module('portalApp')
  .factory('User', function ($resource, $q) {
    // Service logic
    var user = $resource('/api/users/:id', 
          {id: '@id'},
          {update: {method: 'PUT'}
    });

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

      update: function(id, obj){
        var deffered = $q.defer();

        user.update({id: id}, obj, function(data){
          deffered.resolve(data);
        });

        return deffered.promise;
      }
    };
  });
