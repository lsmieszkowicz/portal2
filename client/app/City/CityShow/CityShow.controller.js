'use strict';

angular.module('portalApp')
  .controller('CityShowCtrl', function ($scope, $routeParams, $q, City, Region) {
    
    $scope.currentId = $routeParams.id;
    $scope.city = {};
    $scope.investments = [];

    var cityPromise = City.get($scope.currentId);

    cityPromise
    	.then(function(result){
    		$scope.city = result.data;
    	});

    cityPromise
    	.then(function(){
    		City.getInvestments($scope.currentId)
    			.then(function(result){
    				$scope.investments = result.data;
    			});


    	});

    cityPromise
    	.then()

  
  });
