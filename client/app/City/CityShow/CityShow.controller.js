'use strict';

angular.module('portalApp')
  .controller('CityShowCtrl', function ($scope, $routeParams, $q, City, Region, uiGmapGoogleMapApi) {
    
    $scope.currentId = $routeParams.id;
    $scope.city = {};
    $scope.investments = [];
    $scope.map = {
    	center: {
  			latitude: 52.03,
  			longitude: 19.27
  		},
  		zoom: 6
  	};

    var cityPromise = City.get($scope.currentId);

    cityPromise
    	.then(function(result){
    		$scope.city = result.data;

    		// inicjalizacja miasta na mapie
    		geocodeAddress($scope.city.name, function(latLng){
	            
		        $scope.$apply(function() { 
  	    			$scope.map = {
  	    				center: {
  	    					latitude: latLng.lat(),
  	    					longitude: latLng.lng()
  	    				},
  	    				zoom: 13
  	    			}
            });
        });
    	});

    cityPromise
    	.then(function(){
    		City.getInvestments($scope.currentId)
    			.then(function(result){
    				$scope.investments = result.data;
    			});

    	});

    
    var geocodeAddress = function(address, callback){
    	var geocoder = new google.maps.Geocoder();

    	geocoder.geocode({address: address}, function(results, status){
    		if(status == google.maps.GeocoderStatus.OK){
    			callback(results[0].geometry.location);
    		}
    	});	
    };
  
  });
