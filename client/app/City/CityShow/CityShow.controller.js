'use strict';

angular.module('portalApp')
  .controller('CityShowCtrl', function ($scope, $routeParams, $q, City, Region, uiGmapGoogleMapApi) {
    
    $scope.currentId = $routeParams.id;
    $scope.city = {};
    $scope.investments = [];
    $scope.region = {};
    $scope.map = {
    	center: {
  			latitude: 52.03,
  			longitude: 19.27
  		},
  		zoom: 6,
      markers: []
  	};

    var cityPromise = City.get($scope.currentId);

    cityPromise
    	.then(function(result){
    		$scope.city = result.data;

    		// inicjalizacja miasta na mapie
    		geocodeAddress($scope.city.name, function(latLng){

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
            var newIdKey = 0; 
             
            angular.forEach($scope.investments, function(investment, key){

               var investmentName    = investment.name;
               var investmentMarkers = angular.fromJson(investment.map);
              
               angular.forEach(investmentMarkers, function(investmentMarker){
                    newIdKey++;
                    investmentMarker.idKey = newIdKey;
                    investmentMarker.icon = (newIdKey%2 != 0) ? 'assets/images/marker-green.png' : 'assets/images/marker-red.png';
                    investmentMarker.investmentName = investmentName;
                    $scope.map.markers.push(investmentMarker);
                });
            });
          });
    	});
    
    /*
     *  Wczytywanie wojewodztwa wybranego miasta
     *
     */
    cityPromise
    .then(function(){
        Region.get($scope.city.region_id)
        .then(function(response){
          $scope.region = response.data;
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
