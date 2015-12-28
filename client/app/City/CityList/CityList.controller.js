'use strict';

angular.module('portalApp')
  .controller('CityListCtrl', function ($scope, $q, Region, City) {

  		$scope.regions = [];
  		$scope.cities = [];
  		$scope.selectedRegion = null;

  		$scope.selectRegion = function(selectedRegion){

  			var regionCities;
  			
  			$scope.selectedRegion = selectedRegion;	
  			
  			Region.getCities(selectedRegion.id)
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

  		$scope.clearSelectedRegion = function(){
  			$scope.activeRegionId = null;
  			$scope.cities = [];
  		}

  		Region.getAll()
  			.then(function(result){
  				$scope.regions = result.data;
  			});
  });
