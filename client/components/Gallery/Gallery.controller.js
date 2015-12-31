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
 		
 		var now = new Date();

 		file.upload = Upload.upload({
 			url: '/api/images/upload',
 			data: {
 				file: file,
 				text: 'blablabla',
 				imgOwner: $scope.$parent.currentId,
		  		kind: 'INVESTMENT_PHOTO',
		  		uploaderId: $scope.$parent.$parent.activeUser.id,
		  		creationDate: now
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
