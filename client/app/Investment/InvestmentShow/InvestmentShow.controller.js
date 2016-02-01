'use strict';

angular.module('portalApp')
  .controller('InvestmentShowCtrl', function ($scope, $q, $routeParams, Investment, Follow, User, City, Post, uiGmapGoogleMapApi) {

 	$scope.currentId = $routeParams.id;

	$scope.investment = {};
	$scope.posts = [];
	$scope.followers = [];
	$scope.city = {};
	$scope.map = {
		center: {
			latitude: 52.03,
  			longitude: 19.27
		},
		zoom: 6
	};

	$scope.map.markersOptions = {
		labelClass: 'marker-label-2',
		labelAnchor: '0 0'
		// labelContent: 'kkk'
	};

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

	$scope.addPost = function(){
		// model: $scope.postContent
		/* Post:
		 * 		content
		 *		author
		 *		investment_id
		 */
		if($scope.postContent.length > 0) {

			var date = new Date();

			var newPost = {
				content: $scope.postContent,
				author: $scope.activeUser.id,
				investment_id: $scope.investment.id,
				creationDate: date
			};

			Post.create(newPost)
				.then(function(result){
					if(result.status == 'ok'){
						$scope.posts.unshift(newPost);
						$scope.postContent = '';
					}
				})
		}
	}

	// inicjalizacja danych inwestycji
	var investmentPromise = Investment.get($scope.currentId)
		.then(function(result){
			$scope.investment = result.data;

			// inicjalizacja mapki
			$scope.map.markers = angular.fromJson(result.data.map);

			//przypisanie labelki do markera:
			angular.forEach($scope.map.markers, function(value, key){
				$scope.map.markers[key].options = {
					labelClass: 'marker-label-2',
					labelAnchor: '0 0',
					labelContent: value.text
				}
			});
    		$scope.map.center = angular.copy($scope.map.markers[0].position);
    		$scope.map.zoom = 14;
    		
		});

	// inicjalizacja komentarzy
	investmentPromise
		.then(function(){
			Investment.getPosts($scope.currentId)
				.then(function(result){
					$scope.posts = result.data;

					var authorPromises = [];
					for(var i = 0; i < $scope.posts.length; i++){
						var authorPromise = User.get($scope.posts[i].author);
						authorPromises.push(authorPromise);
					}

					$q.all(authorPromises)
						.then(function(authorsData){
							for(var i = 0; i < $scope.posts.length; i++){
								$scope.posts[i].authorData = authorsData[i].data;
							}
						});
				});
		});

	var followersPromises = [];

	// inicjalizacja obserwujacych
	investmentPromise
		.then(function(){
			Follow.getInvestmentFollowers($scope.currentId)
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

	// inicjalizacja miasta
	investmentPromise
		.then(function(){
			City.get($scope.investment.city)
				.then(function(result){
					$scope.city = result.data;
				});
		});

  });
