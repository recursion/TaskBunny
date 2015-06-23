(function(){

angular.module('trApp')
    .controller('TaskViewController', ['$scope', '$location', '$routeParams', 'TaskService', TaskViewController]);

  function TaskViewController($scope, $location, $routeParams, TaskService){

    // get task _id from $rootParams
    var _id = $routeParams.id;

    // reload task information from server
    var reload = function(){
      TaskService.retrieveTask(_id).success(function(task){
        $scope.task = task;
        // date is a pesky thing to deal with
        // must be always be a Date object for the model per angular's doc
        $scope.deadline = new Date( $scope.task.information.deadline );
      });
    };

    $scope.updateTask = function() {
      $scope.task.information.deadline = $scope.deadline;
      TaskService.updateTask(_id, $scope.task.information).success(function(){
        reload();
      }).catch(function(err){
        //display error message, maybe  $scope.errorMessage = "error" ?
        console.log(err);
      });
    };

    $scope.deleteTask = function() {
      TaskService.deleteTask(_id).success(function(){
        $location.path("/tasks");
      }).catch(function(err){
        //display error message
        console.log(err);
      });
    };

    reload(_id);
  };

})();

