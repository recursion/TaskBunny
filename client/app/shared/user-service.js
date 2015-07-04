(function(){

  //load module
  angular.module('trApp')
    .factory('UserService', ['$http', UserService]);

  function UserService($http){
    var thisUser = null;

    // ask the server who we are.
    // returns an object with an id(for now) in it
    var whoami = function() {
      return $http({
        method: 'GET',
        url: '/api/whoami',
      }).success(function(user){
        thisUser = user.data;
        return user.data;
      }).error(function(err){
        console.log(err);
      });
    };

    var retrieveUser = function(searchQuery) {
      // returns an array of tasks related to the user
      // each task will have 'isOwner', 'isAssignedToMe', 'appliedTo'
      // boolean properties
      return $http({
        method: 'GET',
        url: '/api/users',
      }).success(function(user){
        return user;
      }).error(function(err){
        console.log(err);
      });
    };
    return {
      retrieveUser: retrieveUser,
      whoami: whoami,
    };
  }
})();
