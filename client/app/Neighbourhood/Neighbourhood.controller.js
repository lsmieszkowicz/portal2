'use strict';

angular.module('portalApp')
    .controller('NeighbourhoodCtrl', function ($scope, $q, City, Investment, Follow, FollowCity) {
    	
    	$scope.followedCities = [];
    	$scope.followedInvestments = [];
    	
    	// zastanowic sie czy to bedzie potrzebne czy dodac to do kazdego z miast osobno:
    	$scope.citiesUpdates = [];
    	$scope.investmentsUpdates = [];
    	//

    	var init = function(){
    		
    		initFollowedInvestments()
    		.then(function(){
    			initInvestmentsUpdates();
    		});

    		initFollowedCities()
    		.then(function(){
    			initCitiesUpdates();
    		});
    	};

    	var initFollowedCities = function(){
    		var promise = City.getFollowedCities($scope.activeUser.id)
    		.then(function(response){
    			if(response.status === 'ok'){
    				$scope.followedCities = response.data;
    			};
    		});

    		return promise;
    	};

    	var initFollowedInvestments = function(){
    		var investments = $scope.followedCities;
			var ids = [];
			var promises = [];    		

    		var promise = Follow.getUsersFollowedInvestments($scope.activeUser.id)
    		.then(function(result){
    			ids = result.data;

    			// pobiera wszystkie promises obserwowanych inwestycji
	    		angular.forEach(ids, function(val, key){
	    			var id = val.investment_id;
					var promise = Investment.get(id);
					promises.push(promise);	
	    		});

	    		$q.all(promises)
	    		.then(function(results){
	    			angular.forEach(results, function(result, key){
	    				$scope.followedInvestments.push(result.data);
	    			});
	    		});
    		});

    		return promise;
    	};

    	var initCitiesUpdates = function(){
    		
    		var promises = [];

    		angular.forEach($scope.followedCities, function(city, key){
    			var updatePromises = loadCityUpdates(city.id);
    			promises.push(updatePromises);
    		});

    		$q.all(promises)
    		.then(function(updates){
    			angular.forEach(updates, function(update, key){
    				$scope.citiesUpdates = update.data;
    			});
    		});
    	};

    	var initInvestmentsUpdates = function(){
    		var promises = [];

    		angular.forEach($scope.followedInvestments, function(investment, key){
    			var updatePromises = loadInvestmentUpdates(investment.id);
    			promises.push(updatePromises);
    		});

    		$q.all(promises)
    		.then(function(updates){
    			angular.forEach(updates, function(update, key){
    				$scope.investmentsUpdates = update.data;
    			});
    		});	
    	};

    	var loadCityUpdates = function(cityId){
    		return City.getUpdates(cityId);
    	};

    	var loadInvestmentUpdates = function(investmentId){
    		return Investment.getUpdates(investmentId);
    	};


    	init();

    });
