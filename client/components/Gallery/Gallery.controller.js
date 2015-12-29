'use strict';

angular.module('portalApp')
  .controller('GalleryCtrl', function ($scope, Investment) {

  	var id = $scope.$parent.currentId;
  	Investment.getImages(id)
  		.then(function(result){
  			$scope.slides = result.data;
  			console.log($scope.slides);
  		
  			if(result.data.length > 0) {
  				$scope.slides[0].active = 'active';
  			}
  		});

  	



});
