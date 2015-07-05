(function(){

angular.module('trApp')
    .controller('TaskViewController', ['$scope', '$location', '$routeParams', 'TaskService', 'UserService', TaskViewController]);

  function TaskViewController($scope, $location, $routeParams, TaskService, UserService){

    // get task _id from $rootParams
    var _id = $routeParams.id;

    // get the states array from our task service
    // this is used for translating state (which is a number) to a string
    $scope.states = TaskService.states;

    // set the id for this user
    UserService.whoami()
      .then(function(results){
        $scope.me = results.data;
      });

    $scope.editMode = false;

    $scope.editTask = function(){
      if($scope.task.isOwner && !$scope.task.assignedTo && $scope.task.applicants.length === 0){
        $scope.editMode = true;
      }
    };

    $scope.cancelEditTask = function(){
      reload();
    };

    // reload task information from server
    var reload = function(){
      TaskService.retrieveTask(_id).success(function(task){
        $scope.task = task;
        $scope.editMode = false;
        // date is a pesky thing to deal with
        // must always be a Date object for the model per angular's doc
        $scope.deadline = new Date( $scope.task.information.deadline );
        $scope.deadlineStr = moment($scope.deadline).format('MMMM Do YYYY');
      });
    };
    
    $scope.updateTask = function() {
      $scope.editMode = false;
      $scope.task.information.deadline = $scope.deadline;
      TaskService.updateTask(_id, $scope.task.information).success(function(){
        reload();
      }).catch(function(err){
        //display error message, maybe  $scope.errorMessage = "error" ?
        console.log(err);
      });
    };

    $scope.deleteTask = function() {
      $scope.editMode = false;
      TaskService.deleteTask(_id).success(function(){
        $location.path("/tasks");
      });
      //todo handle error
    };

    $scope.applyForTask = function(){
      TaskService.applyForTask(_id).success(function(){
        reload();
      }).catch(function(){

      });
    };

    $scope.assignToUser = function(userId){

      TaskService.assignTask(_id, userId).success(function(){
        reload();
      }).catch(function(err){
        console.log(err);
      });
    };

    // set a 'ready' state
    // it may make sense to just create a 'state'
    // or 'progress' variable to tracke this?
    $scope.setProgress = function(state){
      console.log('Sending off task state change');
      TaskService.setProgress(_id, state)
        .success(function(d){
          console.log('Success! :', d);
          $location.path("/tasks");
        });
    };
    
    reload(_id);
  }

})();
