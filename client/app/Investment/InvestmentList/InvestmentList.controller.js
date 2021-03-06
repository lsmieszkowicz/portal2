'use strict';

angular.module('portalApp')
  .controller('InvestmentListCtrl', function ($scope, $q, $location, Investment, User, Follow, $resource, $modal, Region) {
  	
  	init();

  	function init() {

        $scope.investments = [];
        initMyFollowedInvestmentsList();
        initMyInvestmentsList();
        initAdvancedSearchPanel();
	};

	function initMyInvestmentsList() {
	
		var followersPromises = [];		

		Investment.findByAdmin($scope.activeUser.id)
		.then(function(invList){
			$scope.myInvestments = invList.data;
			for(var i=0; i < $scope.myInvestments.length; i++){
				followersPromises.push(Follow.getInvestmentFollowers($scope.myInvestments[i].id));
			}

			$q.all(followersPromises)
			.then(function(resolvedFollowers){
				for(var j in $scope.myInvestments) {
					$scope.myInvestments[j].followers = resolvedFollowers[j].data;
				}

				console.log($scope.myInvestments);
			}, 
            function(error){
                console.log(error);
            });

		});
	}

	function initMyFollowedInvestmentsList() {
		
		$scope.myFollowedInvestments = [];

        Follow.getUsersFollowedInvestments($scope.activeUser.id)
        .then(function(res) {
            var ids = res.data;
            
            if(ids != undefined) {

                for(var i = 0; i < ids.length; i++){
                    var investmentPromise = Investment.get(ids[i].investment_id);
                    investmentPromise.then(function(investment){
                        investment = investment.data;
                        console.log(investment);
                        var followersPromise = Follow.getInvestmentFollowers(investment.id);
                        
                        followersPromise
                        .then(function(followersIds){
                            investment.followers = followersIds.data;
                            $scope.myFollowedInvestments.push(investment);
                        });
                    });
                }    
            };
            
        });

    }

    function initAdvancedSearchPanel(){
    	Region.getAll().then(function(res){
    		console.log("Data length" + res.data.length);
    		$scope.advancedSearchPanelRegions = res.data;
    		console.log("advancedSearchPanelRegions: " + $scope.advancedSearchPanelRegions[0].name);
    	});
    }
    
    $scope.loadRegionsCities = function(){
    	console.log('selected region: ' + $scope.searchPanel.region);
    	Region.getCities($scope.searchPanel.region).then(function(data){
    		var regionCityNames = []
    		for(var i = 0; i < data.length; i++){
    			regionCityNames.push(data[i].name);
    		}

    		$scope.selectedRegionCities = regionCityNames;
    		console.log("Selected region cities: " + $scope.selectedRegionCities)
    	});
    }

    $scope.addInvestment = function() {
    	
    	$modal.open({
    		templateUrl: 'app/Investment/InvestmentList/AddInvestmentModal/_addInvestmentModal.html',
    		controller: 'AddInvestmentModalCtrl',
    		scope: $scope
    	});
    }

	$scope.showInvestment = function(investment) {
		// $scope.setCurrentItem(investment);
		$location.path("/investment/show/"+investment.id);
	};

	$scope.advancedSearch = function(){
		console.log('Advanced search clicked');
		var searchParams = {
			name:     $scope.searchPanel.name,
			region:   $scope.searchPanel.region,
			city:     $scope.searchPanel.city,
			ongoing:  $scope.searchPanel.ongoing,
			planned:  $scope.searchPanel.planned,
			finished: $scope.searchPanel.finished
		}
	
		// wywolanie service'u
		Investment.find(searchParams).then(function(data){
			console.log('Find data: ' + data);
			$scope.searchedInvestments = data;
		});
	};
});
