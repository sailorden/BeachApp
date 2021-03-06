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
    'ionic-zoom-view',
  ])

  .run(function ($ionicPlatform, $rootScope, uiGmapIsReady, $ionicLoading, $localStorage, $state, HomeMenu,CatList, $cordovaNetwork) {
    $ionicPlatform.on("resume", function () {

    });
    $ionicPlatform.ready(function () {
      document.addEventListener("offline", onOffline, false);
      HomeMenu.getAmenities().then(function (response) {
        $localStorage.amenities = response;
        console.log(response);
      }, function (err) {
        console.log(err);
      });
      HomeMenu.getAll().then(function (response) {
        console.log("All Categories fetched");
        //console.log("All", response);
      })
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
    $rootScope.showMap = true;
    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams, options) {

      $ionicLoading.show({
        template: 'Please wait..'
      });
    });
    $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
      $ionicLoading.hide();
    })
    function onOffline() {
      $state.go("deviceOffline");
    }
  })

  .config(function ($stateProvider, $urlRouterProvider, $httpProvider, $ionicConfigProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl',
        resolve: {
          Icons: function (HomeMenu) {
            return HomeMenu.homeIcons();
          }
        }
      })
      .state("deviceOffline", {
        templateUrl: 'templates/offline.html',
        controller: 'offlineCtrl'
      })
      .state('mainApp', {
        url: '/main',
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl',
        abstract: true,
      })
      .state('mainApp.category', {
        url: '/category/:id',
        params: {name: null,"data":null},
        views: {
          'menuContent': {
            templateUrl: 'templates/category.html',
            controller: 'catCtrl',
            resolve: {
              //catList: function (CatList,$stateParams) {
              //  var id = $stateParams.id;
              //  console.log($stateParams);
              //  //return CatList.catlist(id);
              //  //console.log($stateParams.id);
              //  //console.log(CatList.catlist(id));
              //  return CatList.catlist(id);
              //  //return $stateParams.data;
              //
              //},
            }
          },
        }
      })
      .state('mainApp.subCategory', {
        url: '/subCategory/:id',
        params: {data: null},
        views: {
          'menuContent': {
            templateUrl: 'templates/subCategory.html',
            controller: 'subCatCtrl',
            //resolve: {
            //  catList: function (CatList, $stateParams) {
            //    var id = $stateParams.id;
            //    console.log($stateParams);
            //    return CatList.catlist(id);
            //  },
            //}
          },
        }
      })
      .state('mainApp.establishment', {
        url: '/establishment/',
        params: {data: null, name: null,icon:null},
        views: {
          'menuContent': {
            templateUrl: 'templates/establishmentList.html',
            controller: 'establishmentCtrl',
            //resolve: {
            //  catList: function (CatList, $stateParams) {
            //    var id = $stateParams.id;
            //    console.log($stateParams);
            //    return CatList.catlist(id);
            //  },
            //}
          },
        }
      })
      .state('mainApp.detailView', {
        url: '/detail/:id',
        params: {data: null},
        views: {
          'menuContent': {
            templateUrl: 'templates/detail.html',
            controller: 'detailCtrl',
            resolve: {
              Data: function (detailData, $stateParams, $q) {
                var id = $stateParams.id;
                //return detailData.getData(id);
                var deferred = $q.defer();
                if ($stateParams.data == null || $stateParams.data == "") {
                  deferred.resolve(detailData.getData(id));
                }
                else {
                  console.log($stateParams);
                  var Object1 = {};
                  Object1.Data = $stateParams.data
                  deferred.resolve(Object1);
                }
                return deferred.promise;
              },
            }
          },
        }
      })
      .state('mainApp.parkingdetailView', {
        url: '/parkingDetail/:id',
        params: {data: null},
        views: {
          'menuContent': {
            templateUrl: 'templates/parkingdetail.html',
            controller: 'parkingdetailCtrl',
            resolve: {
              detailData: function (detailData, $stateParams, $q) {
                console.log($stateParams);
                var deferred = $q.defer();
                deferred.resolve($stateParams.data);
                return deferred.promise;
                //var id = $stateParams.id;
                //return detailData.getData(id);
              },
            }
          },
        }
      })
      .state('mainApp.events', {
        url: '/events',
        views: {
          'menuContent': {
            templateUrl: 'templates/eventListing.html',
            controller: 'eventCtrl',
            resolve: {
              eventData: function (eventListing, $stateParams) {
                return eventListing.getListing();
              }
            }
          },
        }
      })
      .state('mainApp.eventDetail', {
        url: '/eventDetail/:id',
        views: {
          'menuContent': {
            templateUrl: 'templates/eventDetail.html',
            controller: 'eventDetailCtrl',
            resolve: {
              eventData: function (eventListing, $stateParams) {
                console.log($stateParams);
                var id = $stateParams.id
                return eventListing.getEventDetail(id);
              }
            }
          },
        }
      })
      .state('mainApp.theAve', {
        url: '/theave',
        views: {
          'menuContent': {
            templateUrl: 'templates/theave.html',
            controller: 'theAveCtrl',
            resolve: {
              establishments: function (establishmentList) {
                return establishmentList.getList();
              }
            }
          },
        }
      })
      .state('mainApp.completedEventsListing', {
        url: '/completedEventsListing',
        views: {
          'menuContent': {
            templateUrl: 'templates/completedEventsListing.html',
            controller: 'completedEventsListingCtrl',
            resolve: {
              completedEvents: function (eventListing) {
                return eventListing.getCompletedEvents();
              }
            }
          },
        }
      })
      .state('mainApp.completedEventPhotos', {
        url: '/completedEventPhotos/',
        params: {gallery: null},
        views: {
          'menuContent': {
            templateUrl: 'templates/completedEventPhotos.html',
            controller: 'completedEventPhotosCtrl',
          },
        }
      })
      .state('mainApp.maps', {
        url: '/maps/',
        params: {gallery: null},
        views: {
          'menuContent': {
            templateUrl: 'templates/maps.html',
            controller: 'mapsCtrl',
          },
        }
      })
      .state('mainApp.deals', {
        url: '/deals',
        views: {
          'menuContent': {
            templateUrl: 'templates/dealListing.html',
            controller: 'dealCtrl',
            resolve: {
              dealData: function (dealListing, $stateParams) {
                return dealListing.getListing();
              }
            }
          },
        }
      })

      .state('mainApp.dealsDetail', {
        url: '/dealDetail/:id',
        params: {data: null},
        views: {
          'menuContent': {
            templateUrl: 'templates/dealDetail.html',
            controller: 'dealDetailCtrl',
            resolve: {
              dealData: function ($stateParams, $q, dealListing) {
                var deferred = $q.defer();
                console.log($stateParams);
                if ($stateParams.data !== "" && $stateParams.data !== null) {
                  var finalData = {dealDetail: $stateParams.data};
                  deferred.resolve(finalData);
                }
                else {
                  deferred.resolve(dealListing.getDetail($stateParams.id));

                }
                //return dealListing.getListing();
                return deferred.promise;
              }
            }
          },
        }
      })
      .state('mainApp.menuGallery', {
        url: '/menuGallery',
        params: {images: null},
        views: {
          'menuContent': {
            templateUrl: 'templates/menuGallery.html',
            controller: 'menuGalleryCtrl',
          },
        }
      });

    $ionicConfigProvider.tabs.position("bottom");
    $ionicConfigProvider.backButton.previousTitleText(false);
    $ionicConfigProvider.backButton.text('');
    $urlRouterProvider.otherwise('/home');
    //$httpProvider.defaults.headers.common["lat"] = "123456";
    //$httpProvider.defaults.headers.common["long"] = "123456";
    $httpProvider.interceptors.push("ManageHeader");
  })
  .constant("API_URL", "http://www.swaraasolutions.com/beachApp/api/")
  .constant("IMG_URL", "http://www.swaraasolutions.com")
  .constant("HOME_IMG_URL", "http://www.swaraasolutions.com/beachApp/images/");

