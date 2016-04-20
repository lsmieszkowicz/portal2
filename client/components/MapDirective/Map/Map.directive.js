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
	  },

	  link: function (scope, element, attrs) {
	
      }
   
   	};
  });
