'use strict';

angular.module('portalApp')
  .factory('Image', function ($resource, $q) {

	var image = $resource('/api/images/:id', 
				{id: '@id'}
	);
    
    return {
		get: function(id){
			var deffered = $q.defer();

			image.get({id: id}, function(data){
				deffered.resolve(data);
			});

			return deffered.promise;
		}
    };
  });
