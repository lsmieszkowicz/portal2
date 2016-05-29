'use strict';

angular.module('portalApp')
  .controller('InvestmentShowCtrl', function ($scope, $q, $routeParams, Investment, Follow, User, City, Post, uiGmapGoogleMapApi, $location, $modal, Update, $localStorage) {

 	$scope.currentId = $routeParams.id;
	$scope.investment = {};
	$scope.posts = [];
	$scope.followers = [];
	$scope.city = {};
	$scope.admin = {};
	$scope.map = {
		center: {
			latitude: 52.03,          // wspolrzedne geograficznego srodka Polski
  			longitude: 19.27
		},
		zoom: 6
	};
	$scope.rankButtons = {};
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
			});

			findPromise
			.then(function(){
				Follow.remove(idToBeRemoved)
				.then(function(delResult){
					if(delResult.status == 'ok') {
						angular.forEach($scope.followers, function(follower, key){
	                      if(follower.id === $scope.activeUser.id) {
	                        $scope.followers.splice(key, 1);
	                        $scope.isFollowed = false;
	                      }
              			});
					}
				});
			});
		}
	};

	$scope.addPost = function(){

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

					newPost.authorData = {
						name: $scope.activeUser.name,
						surname: $scope.activeUser.surname
					}
					$scope.posts.unshift(newPost);
					$scope.postContent = '';

					// tworzenie powiadomienia
					var	update = {
						investment_id: $scope.investment.id,
						updater_id: $scope.activeUser.id,
						timestamp: new Date(),
						couse: 'Post added',
						item_id: result.data.insertId,
						item_type: 'post'
					};

					Update.createInvestmentUpdate(update);
				}
			})
		}
	};

	$scope.deletePost = function(postToDel){
			if($scope.activeUser.id == postToDel.author) {
				angular.forEach($scope.posts, function(post, index){
			
					if(post.id == postToDel.id) {
						var choice = window.confirm('Czy na pewno chcesz usunąć swój komentarz?');
						if(choice === true) {
							Post.remove(postToDel.id)
							.then(function(response){
								if(response.status === 'ok')
									$scope.posts.splice(index, 1);
								else
									alert('Nie udało się usunąć komentarza');
							});
						}
					}
				});
			}
			else {
				alert('Nie możesz usunąć komentarza - nie jesteś jego autorem');
			}
	};

	$scope.deleteInvestment = function(){
		var decision = window.confirm("UWAGA! Czy na pewno chcesz usunąć tę inwestycję?");
		
		if(decision === true){
			Investment.delete($scope.investment.id)
			.then(function(response){
				if(response.status !== 'ok'){
					alert('Nie udało się usunąć inwestycji');
				}
				else{
					alert('Usuwanie inwestycji powiodło się.');
					$location.path("/investment/list/");

				}
			});
		}
	};

	$scope.editInvestment = function(){
		$modal.open({
			templateUrl: 'app/Investment/InvestmentShow/EditInvestmentModal/EditInvestmentModal.html',
			controller: 'EditInvestmentModalCtrl',
			scope: $scope
		});
	};

	$scope.incrementRank = function(){
		Investment.updateRank($scope.investment.id, {rank: 1})
		.then(function(){
			$scope.investment.rank++;
			
			// anulowanie negatywnego glosu
			if($scope.rankButtons.minusLocked === true){
				$scope.rankButtons.plusLocked = false;
				$scope.rankButtons.minusLocked = false;
			}
			// glos negatywny
			else{
				$scope.rankButtons.plusLocked = true;
				$scope.rankButtons.minusLocked = false;
			}
			
			$localStorage.rankButtons[$scope.investment.id] = $scope.rankButtons;
		});
	};

	$scope.decrementRank = function(){
		Investment.updateRank($scope.investment.id, {rank: -1})
		.then(function(){
			$scope.investment.rank--;

			// anulowanie pozytywnego glosu
			if($scope.rankButtons.plusLocked === true){
				$scope.rankButtons.plusLocked = false;
				$scope.rankButtons.minusLocked = false;
			}
			// glos negatywny
			else {
				$scope.rankButtons.plusLocked = false;
				$scope.rankButtons.minusLocked = true;
			}

			$localStorage.rankButtons[$scope.investment.id] = $scope.rankButtons;
		});
	};

	$scope.showFollowers = function(){
		$modal.open({
			templateUrl: 'app/City/CityShow/ShowCityFollowers/ShowCityFollowers.html',
			controller: 'ShowCityFollowersCtrl',
			scope: $scope
		});
	}
	
	var init = function(){
		var investmentPromise = Investment.get($scope.currentId)
		.then(function(result){
			$scope.investment = result.data;
			initRankButtons();
			initMap();
			initComments();
			initFollowers();
			initCity();
			initAdmin();
		});
	};

	var initRankButtons = function(){
		if(typeof $localStorage.rankButtons !== 'undefined'){

			if(typeof $localStorage.rankButtons[$scope.investment.id] !== 'undefined'){
				$scope.rankButtons = $localStorage.rankButtons[$scope.investment.id];
			}
		} 
		else {
			$localStorage.rankButtons = {};
			$scope.rankButtons = {
				plusLocked: false,
				minusLocked: false
			}
		}
	};

	var initMap = function(){
		Investment.getMap($scope.currentId)
		.then(function(result){
			// if(result.status === 'ok'){
				$scope.investment.map = result;
			// };
		});
	};

	var initComments = function(){
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
					// if(authorsData[i])
					$scope.posts[i].authorData = authorsData[i].data;
				}
			});
		});
	};

    var initFollowers = function(){
		
		var followersPromises = [];

		Follow.getInvestmentFollowers($scope.currentId)
		.then(function(result){
			for(var i = 0; i < result.data.length; i++){
				var userPromise = User.get(result.data[i].user_id);
				followersPromises.push(userPromise);
			}

			$q.all(followersPromises)
			.then(function(result){
				for(var i = 0; i < result.length; i++){
					$scope.followers.push(result[i].data);
				}

				for(var i = 0; i < $scope.followers.length; i++){
					if($scope.followers[i].id == $scope.activeUser.id){
						$scope.isFollowed = true;
					}
				}
			});
		});
    };

    var initCity = function(){
		City.get($scope.investment.city)
		.then(function(result){
			$scope.city = result.data;
		});
    };

    var initAdmin = function(){
		User.get($scope.investment.admin)
	 	.then(function(response){
	 		if(response.status === 'ok'){
	 			$scope.admin = response.data;
	 		}
	 	});
    };

    init();

  });
