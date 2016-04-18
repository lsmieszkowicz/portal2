'use strict';

angular.module('portalApp')
  .controller('GalleryCtrl', function ($scope, $timeout, Investment, Upload, Update) {

  	$scope.addImagePanelVisible = false;
  	$scope.status = null;

  	var id = $scope.$parent.currentId;
  	Investment.getImages(id)
  		.then(function(result){
  			$scope.slides = result.data;
  			console.log($scope.slides);
  		
  			if(result.data.length > 0) {
  				$scope.slides[0].active = 'active';
  			}
  		});

  	$scope.upload = function(file){
 		
 		var now = new Date();

 		if(!file){
 			alert("Nie wybrałeś żadnego zdjęcia");
 		}
 		else{

	 		file.upload = Upload.upload({
	 			url: '/api/images/upload',
	 			data: {
	 				file: file,
	 				text: $scope.imageDescription || "",
	 				imgOwner: $scope.$parent.currentId,
			  		kind: 'INVESTMENT_PHOTO',
			  		uploaderId: $scope.$parent.$parent.activeUser.id,
			  		creationDate: now
	 			}
	 		});

	 		file.upload.then(function(result){
	 			
	 			console.log(result);

	 			$scope.slides.push(result.data.img);
	 			$scope.newImage = null;
	 			$scope.addImagePanelVisible = false;

	 			// tworzenie powiadomienia do aktualnosci	
	 			var update = {
		            investment_id: $scope.investment.id,
		            updater_id: $scope.activeUser.id,
		            timestamp: new Date(),
		            couse: 'Image uploaded',
		            item_id: result.data.relationData.imgId,
		            item_type: 'image'
           		};

            	Update.createInvestmentUpdate(update);

	 			$scope.status = {
	 				bg: 'bg-success',
	 				msg: 'Udalo się dodać nowe zdjęcie!' 
	 			};

	 			$timeout(function(){
	 				$scope.status = null;
	 			}, 3000);


	 		},
	 		function(){
	 			alert('nie jest gicio');
	 		});
 		}
   	};

});
