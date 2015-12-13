'use strict';

angular.module('portalApp')
  .controller('GalleryCtrl', function ($scope) {

  	$scope.slides = [
	  	{
	  		src:  'assets/images/dummy-pics/inw1.jpg',
	  		href: 'assets/images/dummy-pics/inw1.jpg',
	  		text: 'Inwestycja 1'
	  	},
	  
	  	{
	  		src:  'assets/images/dummy-pics/inw2.jpg',
	  		href: 'assets/images/dummy-pics/inw2.jpg',
	  		text: 'Inwestycja 2'
	  	}
  	];

  	$scope.slides[0].active = 'active';



});
