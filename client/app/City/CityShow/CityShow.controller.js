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
  		zoom: 6,
  	};

    var cityPromise = City.get($scope.currentId);

    cityPromise
    	.then(function(result){
    		$scope.city = result.data;

    		// inicjalizacja miasta na mapie
    		geocodeAddress($scope.city.name, function(latLng){
	            
		        // $scope.$apply(function() { 
  	    			// $scope.map = {
  	    			// 	center: {
  	    			// 		latitude: latLng.lat(),
  	    			// 		longitude: latLng.lng()
  	    			// 	},
          //       markers: [],
  	    			// 	zoom: 13
  	    			// }
          //   });

            $scope.$apply(function(){
                $scope.map.center = {
                    latitude: latLng.lat(),
                    longitude: latLng.lng()
                };
                $scope.map.zoom = 13;
            });
        });

        

    	});

    cityPromise
    	.then(function(){
    		City.getInvestments($scope.currentId)
    			.then(function(result){
    				$scope.investments = result.data;
    			
            /*
             *  inicjalizacja listy markerow
             */

             $scope.map.markers = [];
             var newIdKey = 0; 
             
             angular.forEach($scope.investments, function(investment, key){
                console.log(investment);

                var investmentName = investment.name;
                console.log(investmentName);
                var investmentMarkers = angular.fromJson(investment.map);
                angular.forEach(investmentMarkers, function(investmentMarker){
                    console.log(investmentMarker);
                    newIdKey++;
                    investmentMarker.idKey = newIdKey;
                    investmentMarker.investmentName = investmentName;

                    investmentMarker.options = {
                      labelClass: 'marker-label-2',
                      labelAnchor: '0 0',
                      labelContent: '<b>'+investmentMarker.investmentName+'</b><br>'+investmentMarker.text
                    };

                    $scope.map.markers.push(investmentMarker);
                });
             });
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
