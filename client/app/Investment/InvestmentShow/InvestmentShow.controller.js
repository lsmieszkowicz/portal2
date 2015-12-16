'use strict';

angular.module('portalApp')
  .controller('InvestmentShowCtrl', function ($scope, $q, $routeParams, Investment, Follow, User, City) {

 	var currentId = $routeParams.id;

	$scope.investment = {};
	$scope.posts = [];
	$scope.followers = [];
	$scope.city = {};

	$scope.isFollowed = false;
	
	$scope.follow = function(){

		var userId = $scope.activeUser.id;
		var invId = $scope.investment.id;

		Follow.create(userId, invId)
			.then(function(result){
				if(result.status == 'ok'){
					$scope.isFollowed = true;

					$scope.followers.push($scope.activeUser);
				}
			});
	};

	$scope.unfollow = function(){
		
		var userId = $scope.activeUser.id;
		var invId = $scope.investment.id;		
		var idToBeRemoved;
		if($scope.isFollowed == true){
			var findPromise = Follow.find(userId, invId)
				.then(function(result){
					idToBeRemoved = result.data.id;
					console.log(idToBeRemoved);
				});

			findPromise
				.then(function(){
					Follow.remove(idToBeRemoved)
						.then(function(delResult){
							console.log('Result '+delResult);
							if(delResult.status == 'ok') {
								$scope.isFollowed = false;
								$scope.followers.pop();
							}
						});
				});
			
		}
	};

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

							for(var i = 0; i < $scope.followers.length; i++){
								if($scope.followers[i].id == $scope.activeUser.id){
									console.log('active: ' + $scope.activeUser.id + 'follower: ' + $scope.followers[i].id);
									$scope.isFollowed = true;
								}
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
