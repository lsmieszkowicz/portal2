'use strict';

angular.module('portalApp')
  .controller('GalleryCtrl', function ($scope, Investment, Upload) {

  	var id = $scope.$parent.currentId;
  	Investment.getImages(id)
  		.then(function(result){
  			$scope.slides = result.data;
  			console.log($scope.slides);
  		
  			if(result.data.length > 0) {
  				$scope.slides[0].active = 'active';
  			}
  		});

  	$scope.upload = function(file){
 		file.upload = Upload.upload({
 			url: '/api/images/upload',
 			data: {
 				file: file,
 			}
 		});

 		file.upload.then(function(result){
 			alert('jest gicio!');
 			console.log(result);
 		},
 		function(){
 			alert('nie jest gicio');
 		});
   	}

});
