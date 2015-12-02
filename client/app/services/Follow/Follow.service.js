'use strict';

angular.module('portalApp')
  .factory('Follow', function ($resource, $q) {
    // Service logic
    var follow = $resource('/api/follow/:id/', 
              {id: '@id'}, 
              {
               getInvestmentFollowers:     {method: 'GET', url: '/api/follow/investment/:id/', isArray: true},
               getUserFollowedInvestments: {method: 'GET', url: '/api/follow/user/:id/',       isArray: true}
              }
    );

    // Public API here
    return {
      getInvestmentFollowers: function(id){
        var deffered = $q.defer();

        follow.getInvestmentFollowers({id: id}, function(data){
          deffered.resolve(data);
        });

        return deffered.promise;
      },

      getUsersFollowedInvestments: function(id) {
        var deffered = $q.defer();

        follow.getUserFollowedInvestments({id: id}, function(data){
          deffered.resolve(data);
        });

        return deffered.promise;
      }
    };
  });
