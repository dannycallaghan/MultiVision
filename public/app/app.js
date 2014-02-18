angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
	var routeRoleChecks = {
		admin : {
			auth : function (mvAuth) {
				return mvAuth.authoriseCurrentUserForRoute('admin');
			},
			user : function (mvAuth) {
				return mvAuth.authoriseAuthenticatedUserForRoute();
			}
		}
	};

	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {
			templateUrl : '/partials/main/main', 
			controller : 'mvMainCtrl'
		})
		.when('/admin/users', {
			templateUrl : '/partials/admin/user-list', 
			controller : 'mvUserListCtrl',
			resolve : routeRoleChecks.admin
		})
		.when('/signup', {
			templateUrl : '/partials/account/signup',
			controller : 'mvSignUpCtrl'
		})
		.when('/profile', {
			templateUrl : '/partials/account/profile',
			controller : 'mvProfileCtrl',
			resolve : routeRoleChecks.user
		})
		.when('/courses', {
			templateUrl : '/partials/courses/course-list',
			controller : 'mvCourseListCtrl'
		});
});

angular.module('app').run(function ($rootScope, $location) {
	$rootScope.$on('$routeChangeError', function (e, current, previous, rejection) {
		if (rejection === 'not authorised') {
			$location.path('/');
		}
	});
});