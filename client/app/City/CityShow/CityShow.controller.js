'use strict';

angular.module('portalApp')
  .controller('CityShowCtrl', function ($scope, $routeParams, $q, City, Region, uiGmapGoogleMapApi, FollowCity, Investment) {
    
    $scope.currentId = $routeParams.id;
    $scope.city = {};
    $scope.investments = [];
    $scope.investmentsOnMap = [];
    $scope.followers = [];
    $scope.isFollowed = false;
    $scope.region = {};
    $scope.map = {
    	center: {
  			latitude: 52.03,
  			longitude: 19.27
  		},
  		zoom: 6,
      markers: []
  	};
    
    var init = function(){
      var cityPromise = City.get($scope.currentId)
      .then(function(result){
          $scope.city = result.data;
          focusCityOnMap();
          loadAllInvestments();
          loadRegion();
          loadFollowers();
      });      
    };
    
    var geocodeAddress = function(address, callback){
    	var geocoder = new google.maps.Geocoder();

    	geocoder.geocode({address: address}, function(results, status){
    		if(status == google.maps.GeocoderStatus.OK){
    			callback(results[0].geometry.location);
    		}
    	});	
    };

    $scope.follow = function(){
        var relationData = {
            user_id: $scope.activeUser.id, 
            city_id: $scope.city.id
        };

        FollowCity.create(relationData)
        .then(function(response){
            if(response.status === 'ok'){
              $scope.followers.push($scope.activeUser);
              $scope.isFollowed = true;
            }
        });
    };

    $scope.unfollow = function(){
        FollowCity.find($scope.activeUser.id, $scope.city.id)
        .then(function(response){
            FollowCity.remove(response.data.id)
            .then(function(res){
                if(res.status === 'ok'){
                  //usuniecie aktualnego uzytkownika z followersow
                  angular.forEach($scope.followers, function(follower, key){
                      if(follower.id = $scope.activeUser.id) {
                        $scope.followers.splice(key, 1);
                      }
                  });
                  $scope.isFollowed = false;
                }
            });
        });
    }; 

    $scope.search = function(params){
      params.city = $scope.city.name;
      Investment.getAll(params)
      .then(function(result){
          // $scope.investmentsOnMap = result.data;
          // initInvestmentsOnMap();
      });
    };

    var focusCityOnMap = function(){
        geocodeAddress($scope.city.name, function(latLng){

            $scope.$apply(function(){
                $scope.map.center = {
                    latitude: latLng.lat(),
                    longitude: latLng.lng()
                };
                $scope.map.zoom = 13;
            });
        });
    };

    var loadAllInvestments = function(){
        City.getInvestments($scope.currentId)
        .then(function(result){
          $scope.investments = result.data;
          $scope.investmentsOnMap = $scope.investments; 
          initInvestmentsOnMap();
        });
    };

    var initInvestmentsOnMap = function(){
        angular.forEach($scope.investmentsOnMap, function(inv, key){
          Investment.getMap(inv.id)
          .then(function(map){
            $scope.investmentsOnMap[key].map = map;
          });
        });
    };

    var loadRegion = function(){
        Region.get($scope.city.region_id)
        .then(function(response){
          $scope.region = response.data;
        });
    };

    var loadFollowers = function(){
        City.getFollowers($scope.city.id)
        .then(function(response){
            if(response.status === 'ok'){
              $scope.followers = response.data;

              //sprawdzenie czy miasto jest juz obserwowane
              angular.forEach($scope.followers, function(follower, key){
          if(follower.id == $scope.activeUser.id){
                    $scope.isFollowed = true;
          } 
              });
            }
        });
    };

    init();

  });
