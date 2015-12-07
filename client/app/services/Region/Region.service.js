'use strict';

angular.module('portalApp')
  .factory('Region', function ($resource, $q) {
    // Service logic
    var region = $resource('/api/regions/:id',
        {id: '@id'},
        {
          query: {method: 'GET', isArray: false},
          getCities: {method: 'GET', url: '/api/region/:id/cities', isArray: false
        }
    });

    // Public API here
    return {
      getAll: function(){
        var deffered = $q.defer();

        region.query(function(data){
          deffered.resolve(data);
        });
        return deffered.promise;
      },

      getCities: function(id){
        var deffered = $q.defer();

        region.getCities({id: id}, function(data){
          deffered.resolve(data);
        });
        return deffered.promise;
      }
    };
  });
