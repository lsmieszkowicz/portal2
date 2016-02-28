'use strict';

angular.module('portalApp')
  .factory('Post', function ($resource, $q) {
    // Service logic
    var post = $resource('/api/posts/:id', 
          {id: '@id'},
          {update: {method: 'PUT'}
    });

    // Public API here
    return {

      getAll: function(){
        var deffered = $q.defer();

        post.query(function(res){
          deffered.resolve(res);
        });

        return deffered.promise;  
      },

      get: function(id){
        var deffered = $q.defer();

        post.get({id: id}, function(res){
          deffered.resolve(res);
        });

        return deffered.promise;
      },
    

      create: function(newPost){
        var deffered = $q.defer();

        post.save(newPost, function(res){
          deffered.resolve(res);
        });

        return deffered.promise;
      },

      update: function(id, newData){
        var deffered = $q.defer();

        post.update(id, newData, function(res){
          deffered.resolve(res);
        });

        return deffered.promise;
      },

      remove: function(id){
        var deffered = $q.defer();

        post.delete({id: id}, function(res){
          deffered.resolve(res);
        });

        return deffered.promise;
      }

    }
    
  });
