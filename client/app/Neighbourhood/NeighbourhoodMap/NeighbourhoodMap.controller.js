'use strict';

angular.module('portalApp')
  .controller('NeighbourhoodMapCtrl', function($scope, City, $q) {
	
	  $scope.map = {
		  center: {
			  latitude: 52.03,
			  longitude: 19.27
		  },
		  zoom: 6,
		  markers: []
	  };

	  var init = function(){
	  	  initMapMarkers();
	  };
	  
	  var initMapMarkers = function(){
		  $scope.initCitiesDone.promise
		  .then(function(){
			  angular.forEach($scope.followedCitiesInvestments, function(investment, key){
				  var map = angular.fromJson(investment.map);
				  $scope.map.markers.push.apply($scope.map.markers, map);
			  });
			  
			  angular.forEach($scope.map.markers, function(marker, key){
			  	  $scope.map.markers[key].idKey = key;
			  });
		  });
	  };

	  init(); 
		
  });
