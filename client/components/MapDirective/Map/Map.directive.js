'use strict';

angular.module('portalApp')
  .directive('map', function () {
    return {
      
      templateUrl: 'components/MapDirective/Map/Map.html',
    
      restrict: 'EA',

	  scope: {
		  investments: '=',
		  cityFocus: '=',
		  editable: '='
	  },
	  
	  controller: function($scope, uiGmapGoogleMapApi){
		  
		  $scope.zoom = 6;
		  $scope.center = {
  			latitude: 52.03,
  			longitude: 19.27
		  };

		  $scope.markers = [];
		  $scope.polylines = [];
		  $scope.rectangles = [];
		  $scope.circles = [];

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
					 latitude: objs[0].getPosition().lat(),
					 longitude: objs[0].getPosition().lng()
				 };
				 $scope.markers.push(marker);
		     },
			 
			 polylinecomplete: function(dm, name, scope, objs){
			 	 var path = objs[0].getPath().getArray();
				 //console.log(path[0]);
				 for(var i in path){
					 var pathPoint = {
						 latitude: path[i].lat(),
						 longitude: path[i].lng()
					 };
					 console.log(pathPoint);
				 }
			 },

			 rectanglecomplete: function(dm, name, scope, objs){
				 
				 var ne = {
					 latitude: objs[0].getBounds().getNorthEast().lat(),
					 longitude: objs[0].getBounds().getNorthEast().lng(),
				 };
			     
			     var sw = {
					 latitude: objs[0].getBounds().getSouthWest().lat(),
					 longitude: objs[0].getBounds().getSouthWest().lng(),
				 };
				
				 var rect = {
					 northEast: ne,
					 southWest: sw
				 };

				 $scope.rectangles.push(rect);
			 },

			 circlecomplete: function(dm, name, scope, objs){
			 	 console.log(objs[0]);
			 }
	  	  };
	  },

	  link: function (scope, element, attrs) {
	
      }
   
   	};
  });
