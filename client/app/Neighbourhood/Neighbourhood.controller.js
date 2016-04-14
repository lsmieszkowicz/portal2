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
    		
    		initFollowedInvestments();

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

                    initInvestmentsUpdates();
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
    		
            console.log('Wchodze w initInvestmentsUpdates');

            var promises = [];
            console.log('length: ' + $scope.followedInvestments.length);
    		angular.forEach($scope.followedInvestments, function(investment, key){
    			console.log('investment #' + key);
                console.log(investment);
                var updatePromises = loadInvestmentUpdates(investment.id);
                console.log(updatePromises)
    			promises.push(updatePromises);
    		});

    		$q.all(promises)
    		.then(function(updates){
    			console.log(updates);
                angular.forEach(updates, function(update, key){
    				$scope.investmentsUpdates = update.data;
    			});
    		});	
    	};

    	var loadCityUpdates = function(cityId){
    		return City.getUpdates(cityId);
    	};

    	var loadInvestmentUpdates = function(investmentId){
    		alert(' loadInvestmentUpdates ');
            var promise = Investment.getUpdates(investmentId);
            console.log(promise);
            return promise;
    	};


    	init();

    });
