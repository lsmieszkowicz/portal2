'use strict';

angular.module('portalApp')
  .controller('AddInvestmentModalCtrl', function ($scope, $modalInstance, Investment, Region, $location, $timeout) {
		
  	$scope.regions = [];
  	$scope.cities = [];
  	$scope.newInvestment = {
  		city: {
  			name: ""
  		}
  	};
  	

  	// wypelniane w MapCtrl
  	$scope.mapPlaces = [];

  	Region.getAll()
  		.then(function(result){
  			$scope.regions = result.data;	
  		});

  	$scope.getSelectedRegionCities = function(){

  		var selectedRegion = angular.fromJson($scope.newInvestment.region);
  		
  		Region.getCities(selectedRegion.id)
  			.then(function(result){
  				$scope.cities = result.data;
  			});
  	}	

	$scope.add = function(){

		var selectedCity = angular.fromJson($scope.newInvestment.city);

		var investmentToCreate = {
			name:         $scope.newInvestment.name,
			description:  $scope.newInvestment.description,
			city:         selectedCity.id,
			admin: 		  $scope.$parent.activeUser.id,
			creationDate: new Date(),
			startDate:    $scope.newInvestment.startDate,
			endDate:      $scope.newInvestment.endDate,
			map:          angular.toJson($scope.mapPlaces, false)
		}

		Investment.create(investmentToCreate)
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
		  
  });
