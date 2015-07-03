(function(){

  angular.module('trApp')
    .factory('AuthService', ['$http', AuthService]);

  function AuthService($http){

    var profile = {};
 
    // this is what gets called every route change
    // it calls the server and asks if we are in an authenticated session
    //
    profile.check = function(){
      return $http({
        method: 'GET',
        url: '/auth/profile/check'
      });
    };

    profile.update = function(user){
      return $http({
        method: 'POST',
        url: '/auth/profile/update',
        data: user
      });
    }

    return profile;
  }

})();
