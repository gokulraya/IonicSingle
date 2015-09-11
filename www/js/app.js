// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('myreddit', ['ionic', 'angularMoment'] );

app.controller('RedditCtrl', function($http, $scope) {
  $scope.stories = [];
  $scope.loadMore = function() {
    var params = {};
    if($scope.stories.length > 0) {
      params['after'] = $scope.stories[$scope.stories.length -1].name;
    }
  $http.get('https://www.reddit.com/r/gaming/new/.json' , {params:params}).success(function(response) {
      angular.forEach(response.data.children, function(child) {
        $scope.stories.push(child.data);
      });
      $scope.$broadcast('scroll.infiniteScrollComplete');
  })
  };

  
 });


app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
