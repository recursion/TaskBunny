(function(){

angular.module('trApp')
    .controller('TasksController', ['$scope', '$route', '$location', 'TaskService', 'UserService', TasksController]);

  function TasksController($scope, $route, $location, TaskService, UserService){
    $scope.states = TaskService.states;
    
    // make calls to TaskFormService to retrieve all tasks

    TaskService.retrieveUserTasks().success(function(tasks){
      tasks = _.map(tasks, function(task){
        task.information.deadline = moment(Date(task.information.deadline)).format('MMMM Do YYYY');
        return task;
      });

      $scope.createdTasks = _.filter(tasks, function(task){
        return task.isOwner;
      });

      $scope.appliedTasks = _.filter(tasks, function(task){
        return (task.appliedTo && !task.isAssignedToMe);
      });

      $scope.assignedTasks = _.filter(tasks, function(task){
        return task.isAssignedToMe;
      });

      // set our starting state
      $scope.currentTaskList = $scope.createdTasks;

    });

    $scope.viewTask = function(id) {
      $location.path('/task/' + id);
    };
    
    $scope.setTaskList = function(list){
      console.log('HI!');
      if (list === 'applied'){
        $scope.currentTaskList = $scope.appliedTasks;
      } else if (list === 'created'){
        $scope.currentTaskList = $scope.createdTasks;
      } else if (list === 'assigned') {
        $scope.currentTaskList = $scope.assignedTasks;
      }
    };

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

    $scope.cancelEditTask = function(id){
      reload(id);
    };

    // reload task information from server
    var reload = function(id){
      TaskService.retrieveTask(id).success(function(task){
        $scope.task = task;
        $scope.editMode = false;
        // date is a pesky thing to deal with
        // must always be a Date object for the model per angular's doc
        $scope.deadline = new Date( $scope.task.information.deadline );
        $scope.deadlineStr = moment($scope.deadline).format('MMMM Do YYYY');
      });
    };
    
    $scope.updateTask = function(id) {
      $scope.editMode = false;
      $scope.task.information.deadline = $scope.deadline;
      TaskService.updateTask(id, $scope.task.information).success(function(){
        $route.reload();
      }).catch(function(err){
        //display error message, maybe  $scope.errorMessage = "error" ?
        console.log(err);
      });
    };

    $scope.deleteTask = function(id) {
      $scope.editMode = false;
      TaskService.deleteTask(id).success(function(){
        $location.path("/tasks");
      });
      //todo handle error
    };

    $scope.applyForTask = function(id){
      TaskService.applyForTask(id).success(function(){
        $route.reload();
      }).catch(function(){

      });
    };

    $scope.assignToUser = function(taskId, userId){
      console.log(taskId, userId);
      TaskService.assignTask(taskId, userId).success(function(){
        $route.reload();
      }).catch(function(err){
        console.log(err);
      });
    };

    // set a 'ready' state
    // it may make sense to just create a 'state'
    // or 'progress' variable to tracke this?
    $scope.setProgress = function(id, state){
      console.log('Sending off task state change');
      TaskService.setProgress(id, state)
        .success(function(d){
          console.log('Success! :', d);
        });
    };
  } 
})();
