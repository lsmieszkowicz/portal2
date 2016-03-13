'use strict';

angular.module('portalApp')
  .factory('FollowCity', function ($resource, $q) {
    
    var follow_city = $resource('/api/follow_city/:id/', 
                      {id: '@id'},
                      {find: {method: 'POST', url: '/api/follow_city/find', isArray: false}}
    );

    return {
    
      create: function(obj){
        var deffered = $q.defer();

        follow_city.save(obj, function(response){
          deffered.resolve(response);
        });

        return deffered.promise;
      },

      find: function(user_id, city_id){
        var params = {
          user_id: user_id,
          city_id: city_id
        };

        var deffered = $q.defer();

        follow_city.find(params, function(response){
          deffered.resolve(response);
        });

        return deffered.promise;
      },

      remove: function(id){
        var deffered = $q.defer();

        follow_city.delete({id: id}, function(response){
          deffered.resolve(response);
        });

        return deffered.promise;
      }
    }
  });
