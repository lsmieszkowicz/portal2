'use strict';

angular.module('portalApp')
  .directive('map', function () {
    return {
      
      templateUrl: 'components/MapDirective/Map/Map.html',
    
      restrict: 'EA',

	  scope: {
		  investments: '=',
		  focus: '=',
		  editable: '='
	  },
	  
	  controller: function($scope, uiGmapGoogleMapApi){
		  
		  $scope.zoom = 6;
		  $scope.center = {
  			latitude: 52.03,
  			longitude: 19.27
		  };

		  $scope.newInvestmentMap = {
			  markers: [],
			  polylines: [],
			  rectangles: [],
			  circles: []
		  };

		  $scope.drawingManagerOptions = {

				drawingMode: google.maps.drawing.OverlayType.null,
				drawingControl: $scope.editable || false,
				drawingControlOptions: {
					position: google.maps.ControlPosition.TOP_CENTER,
					drawingModes: []
				}
		  };
		  
		  if($scope.editable === true){
			  $scope.drawingManagerOptions.drawingControlOptions.drawingModes = [
			  	   google.maps.drawing.OverlayType.MARKER,
			  	   google.maps.drawing.OverlayType.POLYLINE,
			  	   google.maps.drawing.OverlayType.CIRCLE,
			  	   google.maps.drawing.OverlayType.RECTANGLE
			  ]
		  }

		  $scope.drawingManagerControl = {

		  };


		  $scope.drawingManagerEvents = {
			 
			 markercomplete: function(dm, name, scope, objs){
				 var marker = {
					 // idKey: Math.floor(Math.random()*10000000),
					 latitude: objs[0].getPosition().lat(),
					 longitude: objs[0].getPosition().lng()
				 };
				 $scope.newInvestmentMap.markers.push(marker);
				 
				 if(typeof $scope.investments !== 'array'){
				 	$scope.investments.map.markers.push(marker);
				 }
		     },
			 
			 polylinecomplete: function(dm, name, scope, objs){

			 	 var path = objs[0].getPath().getArray();
				 var polyline = [];
				 for(var i in path){
					 var pathPoint = {
						 // idKey: Math.floor(Math.random()*10000000),
						 latitude: path[i].lat(),
						 longitude: path[i].lng()
					 };
				 	 polyline.push(pathPoint);
				 }
				 
				 if(typeof $scope.investments !== 'array'){
				 	$scope.investments.map.polylines.push(polyline);
				 }				 

			 },

			 rectanglecomplete: function(dm, name, scope, objs){
				 
				 var rect = objs[0].getBounds();	
				 $scope.newInvestmentMap.rectangles.push(rect);
			 },

			 circlecomplete: function(dm, name, scope, objs){

				 var circle = {
					 center: objs[0].getCenter(),
					 radius: objs[0].getRadius()
				 };
				 
				 $scope.newInvestmentMap.circles.push(circle);
			 }
	  	  };

		  // centrowanie mapy na miescie
		  var geocodeAddress = function(address, callback){
		  	var geocoder = new google.maps.Geocoder();
		  	geocoder.geocode({address: address}, function(results, status){
		    	if(status == google.maps.GeocoderStatus.OK){
					callback(results[0].geometry.location);
				}
			});
		  };

		  $scope.$watch("focus", function(newValue, oldValue){
		  	
		  	  var newVal = angular.fromJson(newValue);
		  	  var address = newVal.name;

			  geocodeAddress(address, function(location){
				  $scope.$apply(function(){
					  $scope.center.latitude = location.lat();
					  $scope.center.longitude = location.lng();
					  $scope.zoom = 14;
				  });
			  });
		  });
	  },

	  link: function (scope, element, attrs) {
	
      }
   
   	};
  });
