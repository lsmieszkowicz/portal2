'use strict';

angular.module('portalApp')
  .controller('MapCtrl', function ($scope) {
    
  	$scope.map = {
  		center: {
  			latitude: 52.03,
  			longitude: 19.27
  		},

  		zoom: 6
  	};

  	$scope.drawingManagerOptions = {

  		drawingMode: google.maps.drawing.OverlayType.MARKER,
      	drawingControl: true,
      	drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.MARKER
        ]
      }
  	};

  	$scope.drawingManagerControl = {

  	};

  	$scope.drawingManagerEvents = {
  		markercomplete: function(dm, name, scope, objs){
  			var investmentMapMark = {
  				type: dm,
  				position: {
  					lat: objs[0].getPosition().lat(),
  				    lng: objs[0].getPosition().lng()
  				},
  				size: objs.length
  			};

  			console.log(objs);
  		}
  	};

    var searchboxEvents = {
    	palces_changed: function(searchbox){
    		console.log(searchbox);
    	}
    };

    $scope.searchbox = {
      template: 'components/Map/_searchbox.html',
      events: searchboxEvents
    };

  });
