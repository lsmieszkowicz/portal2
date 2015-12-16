'use strict';

angular.module('portalApp')
  .factory('Follow', function ($resource, $q) {
    // Service logic
    var follow = $resource('/api/follow/:id/', 
              {id: '@id'}, 
              {
               getInvestmentFollowers:     {method: 'GET', url: '/api/follow/investment/:id/', isArray: false},
               getUserFollowedInvestments: {method: 'GET', url: '/api/follow/user/:id/',       isArray: false},
               find:                       {method: 'POST', url: '/api/follow/find', isArray: false}
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
      },

      find: function(userId, invId){

        var findParams = {
          userId: userId,
          invId: invId
        };

        var deffered = $q.defer();

        follow.find(findParams, function(result){
          deffered.resolve(result);
        });

        return deffered.promise;
      },

      create: function(userId, invId){
        var newFollow = {
          investment_id: invId,
          user_id: userId
        };
        var deffered = $q.defer();

        follow.save(newFollow, function(data){
          deffered.resolve(data);
        });

        return deffered.promise;
      },

      remove: function(id){

        var deffered = $q.defer();
        
        follow.delete({id: id}, function(result){
          deffered.resolve(result);
        });

        return deffered.promise;
      }
    };
  });
