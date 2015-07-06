(function(){

  angular.module('trApp')
    .config(function($routeProvider) {

      $routeProvider
        .when('/', {
            templateUrl: 'app/components/landing/landing.html',
            controller: 'LandingPageController',
            publicAccess: true
        })
        .when('/sign-in', {
            templateUrl: 'app/components/sign-in/sign-in.html',
            controller: 'SignInPageController',
            publicAccess: true
        })
        .when('/create-task', {
            templateUrl: 'app/components/taskNew/task-form.html',
            controller: 'TaskFormController'
        })
        .when('/tasks', {
            templateUrl: 'app/components/myTasks/tasks.html',
            controller: 'TasksController',
            hotkeys: [
                ['1', 'Switch to Applied Tasks', 'setTaskList(\'applied\')'],
                ['2', 'Switch to Assigned Tasks', 'setTaskList(\'assigned\')'],
                ['3', 'Switch to Created Tasks', 'setTaskList(\'created\')']
                // When these items become available uncomment them
                // ['1', 'Switch to Confirmed Tasks', 'setTaskList(\'confirmed\')'],
                // ['1', 'Switch to Completed Tasks', 'setTaskList(\'completed\')'],
                // ['n', 'Make a New Task', '(make task view here)'],
                // ['f', 'Find a Task', '(make task view here)']
            ]
        })
        .when('/task/:id', {
            templateUrl: 'app/components/taskDetails/task-view.html',
            controller: 'TaskViewController'
        })
        .when('/search', {
            templateUrl: 'app/components/taskSearch/taskSearch.html',
            controller: 'TaskSearchController'
        })
        .when('/settings', {
            templateUrl: 'app/components/userSettings/template.html',
            controller: 'SettingsController'
        })
        .otherwise({redirectTo: '/'});

    });

})();
