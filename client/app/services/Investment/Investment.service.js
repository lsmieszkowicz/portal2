'use strict';

angular.module('portalApp')
  .factory('Investment', function ($resource, $q) {
    // Service logic
    var investment = $resource('/api/investments/:id',       // resource url
        {id: '@id'},                     // default params
        { update: {method: 'PUT'},        // custom actions
          getPosts:    {method: 'GET', url: '/api/investments/:id/posts',  isArray: true},
          getImages:   {method: 'GET', url: '/api/investments/:id/images', isArray: true},
          findByAdmin: {method: 'GET', url: '/api/investments/findByAdmin/:id', isArray: true},
          find:        {method: 'POST', url: '/api/investments/find', isArray: true}
        }
    );  

    // Public API here
    return {
      getAll: function(){
        var deffered = $q.defer();

        investment.query(function(data){
          deffered.resolve(data);
        });

        return deffered.promise;
      },

      get: function(id){
        var deffered = $q.defer();


        investment.get({id: id}, function(data){
          deffered.resolve(data);
        });

        return deffered.promise;
      },

      find: function(searchParams){
        var deffered = $q.defer();

        investment.find(searchParams, function(data){
          deffered.resolve(data);
        });

        return deffered.promise;
      },

      findByAdmin: function(id){
        var deffered = $q.defer();

        investment.findByAdmin({id: id}, function(data){
          deffered.resolve(data);
        });

        return deffered.promise;
      },

      getPosts: function(id){
        var deffered = $q.defer();

        investment.getPosts({id: id}, function(data){
          deffered.resolve(data);
        });

        return deffered.promise;
      },

      getImages: function(id){
        var deffered = $q.defer();

        investment.getImages({id: id}, function(data){
          deffered.resolve(data);
        });

        return deffered.promise;
      },

      create: function(obj) {
          console.log('Im in create');
          var deffered = $q.defer();

              investment.save(obj, function(data){
                  
                  console.log('InvestmentService, create: ' + data);
                  deffered.resolve(data);                  
              });

              return deffered.promise;
      },

      update: function(id, obj) {
        investment.update({id: id}, obj);
      },

      delete: function(id) {
        investment.delete({id: id});
      }
    };
  });
