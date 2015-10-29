'use strict';

angular.module('portalApp')
  .controller('GalleryCtrl', function ($scope, $window, Investment) {

  	$scope.images = [];
	
	$scope.getImages = function () {
		
		var imgs = [
			{ src:'/img/investment/1/1.jpg', caption: 'Etap pierwszy' },
			{ src:'/img/investment/1/2.jpg', caption: 'Etap drugi' },
			{ src:'/img/investment/1/3.jpg', caption: 'Etap trzeci' }
		];

		var size = {w: 800, h: 600};
		
		console.log(imgs);

		for (var i = 0; i < $scope.imgData.length; i++) {

			$scope.images.push({ 
				src: $scope.imgData[i].path,
				thumb: $scope.imgData[i].path,
				// caption: "aaa",
				size: screenSize(size.w, size.h),
				type: 'image'
			});
		}
	};
	
	var screenSize = function (width, height) {
		var x = width ? width : $window.innerWidth;
		var y = height ? height : $window.innerHeight;
		
		return x + 'x' + y;
	}; 

	function initImages(promise){

		promise.then(function(){
			Investment.getImages($scope.currentId)
			.then(function(result){
				$scope.imgData = result;            // !!
			
				$scope.getImages();                //  !!
			});
		});
	};
	
	initImages($scope.invLoadPromise);

});
