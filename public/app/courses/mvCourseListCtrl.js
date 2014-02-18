angular.module('app').controller('mvCourseListCtrl', function ($scope, mvCachedCourses) {
	$scope.courses = mvCachedCourses.query();

	$scope.sortOptions = [
		{value : 'title', text : 'Sort By Title'},
		{value : 'published', text : 'Sort By Publish Date'}
	];

	$scope.sortOrder = $scope.sortOptions[0].value;
});