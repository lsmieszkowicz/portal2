'use strict';

angular.module('portalApp')
  .factory('Region', function () {
    // Service logic
    var region = $resource('/api/region/:id',
        {id: '@id'},
        {
          getCities: {method: 'GET', url: '/api/region/:id/cities', isArray: true
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
