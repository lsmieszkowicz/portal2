'use strict';

angular.module('portalApp')
  .factory('Update', function ($resource, $q) {

    var cityUpdate = $resource('/api/city_update/', {}, {});

    var investmentUpdate = $resource('/api/investment_update/', {}, {});

    return {
      
      createCityUpdate: function (obj) {
          var deffered = $q.defer();

          cityUpdate.save(obj, function(response){
              deffered.resolve(response);
          });

          return deffered.promise;
      },

      createInvestmentUpdate: function(obj){
          var deffered = $q.defer();

          investmentUpdate.save(obj, function(response){
              deffered.resolve(response);
          });

          return deffered.promise;
      }

    };
  });
