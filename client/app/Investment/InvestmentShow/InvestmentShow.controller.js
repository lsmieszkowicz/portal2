'use strict';

angular.module('portalApp')
  .controller('InvestmentShowCtrl', function ($scope, $q, $routeParams, Investment, Follow, User, City) {

 	var currentId = $routeParams.id;

	$scope.investment = {};
	$scope.posts = [];
	$scope.followers = [];
	$scope.city = {};
	 

	// inicjalizacja danych inwestycji
	var investmentPromise = Investment.get(currentId)
		.then(function(result){
			$scope.investment = result.data;
		});

	// inicjalizacja komentarzy
	investmentPromise
		.then(function(){
			Investment.getPosts(currentId)
				.then(function(result){
					$scope.posts = result.data;
				});
		});

	var followersPromises = [];

	// inicjalizacja obserwujacych
	investmentPromise
		.then(function(){
			Follow.getInvestmentFollowers(currentId)
				.then(function(result){
					for(var i = 0; i < result.data.length; i++){
						var userPromise = User.get(result.data[i].user_id);
						console.log(userPromise);
						followersPromises.push(userPromise);
					}

					$q.all(followersPromises)
						.then(function(result){
							for(var i = 0; i < result.length; i++){
								$scope.followers.push(result[i].data);
							}
						});
				});
		});	

	
	investmentPromise
		.then(function(){
			City.get($scope.investment.city)
				.then(function(result){
					$scope.city = result.data;
				});
		});

  });
