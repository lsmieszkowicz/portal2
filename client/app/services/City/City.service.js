'use strict';

angular.module('portalApp')
  .factory('City', function ($resource, $q) {
   
    var city = $resource('/api/cities/:id', 
        {id: '@id'}, 
        {
          update: {method: 'PUT'},
          query: {method: 'GET', isArray: false}
        }
    );

    // Public API here
    return {
        getAll: function(){
            var deffered = $q.defer();

            city.query(function(data){
                deffered.resolve(data);
            });

            return deffered.promise;
        },
        get: function(id){
          var deffered = $q.defer();

          city.get({id: id}, function(data){
              deffered.resolve(data);
          });

          return deffered.promise;
        },

        create: function(obj){
          var deffered = $q.defer();

          city.save(obj, function(data){
              deffered.resolve(data);
          });

          return deffered.promise;
        },

        update: function(id, obj){
          var deffered = $q.defer();

          city.update({id: id}, obj, function(data){
              deffered.resolve(data);
          });

          return deffered.promise;
        },

        remove: function(id){
          var deffered = $q.defer();

          city.delete({id: id}, function(data){
              deffered.resolve(data);
          });

          return deffered.promise;
        },

    };
  });