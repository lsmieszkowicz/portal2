'use strict';

angular.module('portalApp')
  .controller('EditUserModalCtrl', function ($scope, $modalInstance, Upload, User) {
  		
  		$scope.editedUser = {};

  		$scope.editedUser.name = angular.copy($scope.activeUser.name);
  		$scope.editedUser.surname = angular.copy($scope.activeUser.surname);

  		$scope.cancel = function(){
  			$modalInstance.dismiss();
  		};

      $scope.updateUserData = function(){
            
        if($scope.editedUser.password){
          // hasla sa poprawne
          checkPassword(function(){
            sendUserUpdate();
          },
          // hasla sa niepoprawne
          function(){
            alert("Niezgodność haseł");
          });
        }
        else {
          sendUserUpdate();
        }
      };

      var sendUserUpdate = function(){
        User.update($scope.activeUser.id, $scope.editedUser)
        .then(function(response){

          if(response.status === 'ok'){
              $scope.activeUser.name = $scope.editedUser.name;
              $scope.activeUser.surname = $scope.editedUser.surname;
          }
          else
            alert('Nie udało się zaktualizować danych użytkownika');
        });             
      }
      
      /*
        nie uzywac do momentu obslugi zdjecia profilowego!!!
      */
      $scope.updateProfilePhoto = function(){
        var now = new Date();       

        var promise = Upload.upload({
          url: '/api/images/upload',
          data: {
            file: $scope.profileImage,
            text: '',
            imgOwner: $scope.activeUser.id,
            kind: 'PROFILE_PHOTO',
            uploaderId: $scope.activeUser.id,
            creationDate: now
          }
        })
        .then(function(response){
          console.log(response);
          if(response.data.status === 'ok'){
            // update'owac profilowe zdjecie w scope
            $scope.activeUser.profilePhoto = response.data.img.path;
          }
          else {
            // wyswietlic alert
            alert('Nie udało się zaktualizować zdjęcia profilowego');
          }

        // return promise;
        });
      };
      var checkPassword = function(success, error){
        if($scope.editedUser.password === $scope.editedUser.password_repeated){
          success();
          return true;
        }
        else{
          error();
          return false;
        }
      }
  });
