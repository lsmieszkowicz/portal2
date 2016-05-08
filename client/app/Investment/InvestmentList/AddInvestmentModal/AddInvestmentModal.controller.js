'use strict';

angular.module('portalApp')
  .controller('AddInvestmentModalCtrl', function ($scope, $modalInstance, Investment, Region, $location, $timeout) {
		
  	$scope.regions = [];
  	$scope.cities = [];
  	$scope.newInvestment = {
  		map: {
  			markers: [],
  			polylines: []
  		},
  		city: {
  			name: ""
  		}
  	};
  	
  	// wypelniane w MapCtrl

  	Region.getAll()
  		.then(function(result){
  			$scope.regions = result.data;	
  		});

  	$scope.getSelectedRegionCities = function(){

  		var selectedRegion = angular.fromJson($scope.newInvestment.region);
  		
  		Region.getCities(selectedRegion.id)
  			.then(function(result){
  				$scope.cities = angular.fromJson(result.data);
				//angular.forEach($scope.cities, function(city, key){
					//$scope.cities[key] = angular.fromJson(city);
				//});
  			});
  	}	

	$scope.add = function(){

		var selectedCity = angular.fromJson($scope.newInvestment.city);

		var investment = {
			name:         $scope.newInvestment.name,
			description:  $scope.newInvestment.description,
			city:         selectedCity.id,
			admin: 		  $scope.$parent.activeUser.id,
			creationDate: new Date(),
			startDate:    $scope.newInvestment.startDate,
			endDate:      $scope.newInvestment.endDate,
			map:          $scope.newInvestment.map
		}

		console.log(angular.toJson(investment));
		Investment.create(investment)
	        .then(function(result){
	        	if(result.status == 'ok'){
		            
		            $scope.alert = {
		            	msg: 'Udalo się dodac nową inwestycję!',
		            	type: 'success'
		            };

		            $timeout(function(){
		            	$modalInstance.close();
		            	$location.path('/investment/show/' + result.data.insertId);
		            }, 2000);
	        	}
	        	else {
	        		$scope.alert = {
		            	msg: 'Nie udało się utworzyć inwestycji',
		            	type: 'info'
		            };

		            $timeout(function(){
		            	$modalInstance.close();
		            }, 3000);	
	        	}
	        });
	};

	$scope.cancel = function(){
		$modalInstance.dismiss('canceled');
	};

	$scope.$watch("newInvestment.city", function(newValue, oldValue){
		var cityFromJson = angular.fromJson(newValue);
		$scope.focus = cityFromJson;
	});
		  
  });
