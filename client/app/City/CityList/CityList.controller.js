'use strict';

angular.module('portalApp')
  .controller('CityListCtrl', function ($scope, $q, Region, City) {

  		$scope.regions = [];
  		$scope.cities = [];


  		$scope.selectRegion = function(regionId){

  			var regionCities;
  			
  			$scope.activeRegionId = regionId;	
  			
  			Region.getCities(regionId)
  				.then(function(result){
  					regionCities = result.data;
  					
  					var promises = [];
  					angular.forEach(regionCities, function(city, key){
  						var investmentPromise = City.getInvestments(city.id);
  						promises.push(investmentPromise);
  					});

  					$q.all(promises)
  						.then(function(invForEachCity){
  							angular.forEach(invForEachCity, function(value, key){
  								regionCities[key].investments = value.data;
  								$scope.cities = regionCities;
  							});
  						});

  				});
  		};

  		Region.getAll()
  			.then(function(result){
  				$scope.regions = result.data;
  			});
  });
