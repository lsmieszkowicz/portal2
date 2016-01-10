'use strict';

angular.module('portalApp')
  .controller('AddInvestmentModalCtrl', function ($scope, $modalInstance, Investment, Region, $location, $timeout) {
		
  	$scope.regions = [];
  	$scope.cities = [];
  	$scope.newInvestment = {};

  	Region.getAll()
  		.then(function(result){
  			$scope.regions = result.data;	
  		});

  	$scope.getSelectedRegionCities = function(){
  		Region.getCities($scope.newInvestment.region)
  			.then(function(result){
  				$scope.cities = result.data;
  			});
  	}	

	$scope.add = function(){

		var investmentToCreate = {
			name:         $scope.newInvestment.name,
			description:  $scope.newInvestment.description,
			city:         $scope.newInvestment.city.id,
			admin: 		  $scope.$parent.activeUser.id,
			creationDate: new Date()
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
