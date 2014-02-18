angular.module('app').controller('mvSignUpCtrl', function ($scope, mvUser, mvNotifier, $location, mvAuth) {
	$scope.signup = function () {
		var newUserData = {
			username : $scope.email,
			password : $scope.password,
			firstName : $scope.fname,
			lastName : $scope.lname
		};

		mvAuth.createUser(newUserData).then(function () {
			mvNotifier.notify('User account created!');
			$location.path('/');
		}, function () {
			mvNotifier.error(reason);
		});
	};
});