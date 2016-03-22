// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('DBApp', ['ionic',
    'DBApp.controllers',
    'DBApp.directives',
    'DBApp.factory',
    'DBApp.filters',
    'DBApp.services',
    'uiGmapgoogle-maps',
    'ngStorage',
    'ngCordova',
  ])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function ($localStorage) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      var geoOptions = {maximumAge: 3000, timeout: 5000, enableHighAccuracy: true};
      navigator.geolocation.getCurrentPosition(function (position) {
        $localStorage.lat = position.coords.latitude;
        $localStorage.long = position.coords.longitude;
      }, function (err) {
        console.log(err);
      }, geoOptions);

    });
  })

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $stateProvider

      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl',
        resolve: {
          Icons: function (HomeMenu, $localStorage) {
            console.log(HomeMenu.homeIcons());
            return HomeMenu.homeIcons();
          }
        }
      })
      .state('mainApp', {
        url: '/main',
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl',
        abstract: true,
      })
      .state('mainApp.category', {
        url: '/category',
        views: {
          'menuContent': {
            templateUrl: 'templates/category.html',
            controller: 'catCtrl',
            resolve: {
              catList: function (CatList) {
                return CatList.catlist(1);
              }
            }
          },
        }
      });


    $urlRouterProvider.otherwise('/home');
    //$httpProvider.defaults.headers.common["lat"] = "123456";
    //$httpProvider.defaults.headers.common["long"] = "123456";
    $httpProvider.interceptors.push("ManageHeader");
  })
  .constant("API_URL", "http://www.swaraasolutions.com/beachApp/api/")
  .constant("IMG_URL", "http://www.swaraasolutions.com")
  .constant("HOME_IMG_URL", "http://www.swaraasolutions.com/beachApp/images/");

