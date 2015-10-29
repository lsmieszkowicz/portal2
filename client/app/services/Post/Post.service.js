'use strict';

angular.module('portalApp')
  .factory('Post', function ($resource, $q) {
    // Service logic
    var post = $resource('/api/post/:id', 
          {id: '@id'},
          {update: {method: 'PUT'}
    });

    // Public API here
    return {

      getAll: function(){
        var deffered = $q.defer();

        post.query(function(data){
          deffered.resolve(data);
        });

        return deffered.promise;  
      },

      get: function(id){
        var deffered = $q.defer();

        post.get({id: id}, function(data){
          deffered.resolve(data);
        });

        return deffered.promise;
      }
    };
    
  });
