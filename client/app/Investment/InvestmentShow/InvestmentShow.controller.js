'use strict';

angular.module('portalApp')
  .controller('InvestmentShowCtrl', function ($scope, $q, $routeParams, Investment, Follow, User) {
    	
    $scope.currentId = $routeParams.id;

	$scope.invLoadPromise = Investment.get($scope.currentId)
	.then(function(res){
		$scope.currentInvestment = res.data;
		console.log(res.data);
	});

	initFollowers($scope.invLoadPromise);
	initPosts($scope.invLoadPromise);

	function initFollowers(promise) {

		promise.then(function(){
			Follow.getInvestmentFollowers($scope.currentId)
			.then(function(res){
				var followersIds = res.data;

				var usersPromises = [];

				for (var i = 0; i < followersIds.length; i++) {
					usersPromises.push(User.get(followersIds[i].user_id));
				};

				$q.all(usersPromises).then(function(result){
					$scope.currentInvestment.followers = result.data;
				});
			});
		});
	};

	function initPosts(promise) {
		promise.then(function(){
			Investment.getPosts($scope.currentId)
			.then(function(res){
				$scope.currentInvestment.posts = res.data;
			});
		});
	};

	function initCity(promise) {
		promise.then(function(){
			
		});
	};

  });
