angular
  .module('reciPlease')
  .controller('AuthController', ['$scope', '$state', 'Auth', function($scope, $state, Auth){

    var config = {
      headers: {
        'X-HTTP-Method-Override': 'POST'
      }
    };

    $scope.register = function(){
      Auth.register($scope.user, config).then(function(registerdUser){
        console.log(registerdUser);
        $state.go('home.search');
      }, function(error){
        console.log(error)
      });
    };

    $scope.login = function(){
      Auth.login($scope.user, config).then(function(registerdUser){
        console.log(registerdUser);
        $state.go('home.search');
      }, function(error){
        console.log(error)
      });
    }
  }])