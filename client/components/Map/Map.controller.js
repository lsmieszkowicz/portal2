'use strict';

angular.module('portalApp')
  .controller('MapCtrl', function ($scope, uiGmapGoogleMapApi) {
    
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
  				idKey: $scope.$parent.mapPlaces.length,
  				position: {
  					latitude: objs[0].getPosition().lat(),
  				    longitude: objs[0].getPosition().lng()
  				},
  				size: objs.length
  			};
  			$scope.$parent.mapPlaces.push(investmentMapMark);
  		
  			if($scope.$parent.mapPlaces.length >= 2) {
  				$scope.drawingManagerOptions.drawingMode = google.maps.drawing.OverlayType.null;
  			}
  		}
  	};

    // var searchboxEvents = {
    // 	palces_changed: function(searchbox){
    // 		console.log(searchbox);
    // 	}
    // };

    // $scope.searchbox = {
    //   template: 'components/Map/_searchbox.html',
    //   events: searchboxEvents
    // };


    var geocodeAddress = function(address, callback){
    	var geocoder = new google.maps.Geocoder();

    	geocoder.geocode({address: address}, function(results, status){
    		if(status == google.maps.GeocoderStatus.OK){
    			callback(results[0].geometry.location);
    		}
    	});


    }
  
    $scope.$parent.$watch("newInvestment.city", function(newV, oldV){
    	
    	var selectedCity = angular.fromJson(newV); 
    	
    	if(selectedCity.name){
    	
    		var selectedAddress = selectedCity.name + ', ' + $scope.$parent.newInvestment.region.name;	
	        geocodeAddress(selectedCity.name, function(latLng){
	            
		        $scope.$apply(function() { 
	    			$scope.map = {
	    				center: {
	    					latitude: latLng.lat(),
	    					longitude: latLng.lng()
	    				},
	    				zoom: 14
	    			}
				});
		    });        		
    	}
    });
  });
