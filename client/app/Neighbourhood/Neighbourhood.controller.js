'use strict';

angular.module('portalApp')
    .controller('NeighbourhoodCtrl', function ($scope, $q, City, Investment, Follow, FollowCity, Image, User, Post) {
    	
    	$scope.followedCities = [];
    	$scope.followedCitiesInvestments = [];

    	$scope.followedInvestments = [];
    	
    	// zastanowic sie czy to bedzie potrzebne czy dodac to do kazdego z miast osobno:
    	$scope.citiesUpdates = [];
    	$scope.investmentsUpdates = [];
    	
    	var init = function(){
    		
    		initFollowedInvestments();

    		initFollowedCities()
    		.then(function(){
    			initCitiesUpdates();
    		});
    	};
		
		$scope.initCitiesDone = $q.defer();

    	var initFollowedCities = function(){
    		var promise = User.getCities($scope.activeUser.id)
    		.then(function(response){
    			if(response.status === 'ok'){
    				$scope.followedCities = response.data;
					initCitiesInvestments();
    			};
    		});
    		return promise;
    	};

    	var initFollowedInvestments = function(){
    		var investments = $scope.followedInvestments;
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
    			loadInvestmentUpdatesTargets();
    		});	
    	};

    	var loadCityUpdates = function(cityId){
    		return City.getUpdates(cityId);
    	};

    	var loadInvestmentUpdates = function(investmentId){
            var promise = Investment.getUpdates(investmentId);
            return promise;
    	};
		
		var loadInvestmentUpdatesTargets = function(){
			angular.forEach($scope.investmentsUpdates, function(update, key){
				
				// pobierz dane inwestycji ktora zostala zaktualizowana
				Investment.get(update.investment_id)
				.then(function(result){
					$scope.investmentsUpdates[key].investment_data = result.data;
				});

				// pobierz dane uzytkownika ktory dokonal aktualizacji
				User.get(update.updater_id)
				.then(function(userdata){
					$scope.investmentsUpdates[key].updater = userdata.data;
				});
				
				// jezeli dodano zdjecie - pobierz jego dane
				if(update.item_type === 'image'){
					Image.get(update.item_id)
					.then(function(result){
						$scope.investmentsUpdates[key].item = result.data;
					});
				}
				
				// jezeli dodano nowy post - pobierz jego dane
				else if(update.item_type === 'post'){
							
					Post.get(update.item_id)
					.then(function(result){
						$scope.investmentsUpdates[key].item = result.data;
					});
				}
				
				// zmieniono dane inwestycji
				else if(update.type === 'investment_data'){

				}


			});
		};

		var loadCityUpdatesTargets = function(){

		};
		
		var initCitiesInvestments = function(){
		   var promises = []; 	
		   
		   angular.forEach($scope.followedCities, function(city, key){
			  var promise = City.getInvestments(city.id)
			  .then(function(result){
				  angular.forEach(result.data, function(investment, key){
				  	 $scope.followedCitiesInvestments.push(investment); 
				  });
			  });
			  promises.push(promise);
		   });
		   
		   $q.all(promises)
		   .then(function(){
		   	   $scope.initCitiesDone.resolve();
		   });

		};

    	init();
    });
