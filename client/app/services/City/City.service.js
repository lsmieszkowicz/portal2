'use strict';

angular.module('portalApp')
  .factory('City', function ($resource, $q) {
   
    var city = $resource('/api/cities/:id', 
        {id: '@id'}, 
        {
          update: {method: 'PUT'},
          query: {method: 'GET', isArray: false},
          getInvestments: {method: 'GET', url: '/api/cities/:id/investments', isArray: false},
          getFollowers: {method: 'GET', url: 'api/cities/:id/followers', isArray: false},
          getFollowedCities: {method: 'GET', url: 'api/cities/:id/followers', isArray: false},
          getUpdates: {method: 'GET', url: 'api/cities/:id/updates', isArray: false}
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

        getInvestments: function(id){
          var deffered = $q.defer();

          city.getInvestments({id: id}, function(data){
            deffered.resolve(data);
          });

          return deffered.promise;
        },

        getFollowers: function(id){
            var deffered = $q.defer();

            city.getFollowers({id: id}, function(data){
              deffered.resolve(data);
            });

            return deffered.promise;
        },

        getFollowedCities: function(userId){
            var deffered = $q.defer();

            city.getFollowedCities({id: userId}, function(data){
              deffered.resolve(data);
            });

            return deffered.promise;
        },

        getUpdates: function(id){

            var deffered = $q.defer();

            city.getUpdates({id: id}, function(data){
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
        }
    };
  });
