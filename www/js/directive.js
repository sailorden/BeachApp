/**
 * Created by varun on 19-03-2016.
 */

angular.module('DBApp.directives', [])
  .directive("hasNewHeader", function () {
    return function (scope, element, attrs) {
      element.ready(function () {
        angular.element(document).ready(function () {
          //var currHeight = element[0].offsetTop + 100;
          element.css("top", "15%");
        });
      })
    }
  })
  .directive("menuHeight", function () {
    return function (scope, element, attrs) {
      element.ready(function () {
        angular.element(document).ready(function () {
          //var currHeight = element[0].offsetTop + 100;
          //console.log(element[0].clientHeight);
          element.css("height", "20%");
        });
      })
    }
  })
  .directive("checkHeight", function () {
    return function (scope, element, attrs) {
      element.ready(function () {
        angular.element(document).ready(function () {
          console.log("ContentHeight", scope.contentHeight);
          element.css("top", scope.contentHeight + "px");
        });
      })
    }
  })
  .directive("getMapHeight", function () {
    return function (scope, element, attrs) {
      element.ready(function () {
        angular.element(document).ready(function () {
          scope.$parent.contentHeight = element[0].offsetHeight + element[0].offsetTop;
          var mapDime = element[0].offsetHeight
          var mapDiv = angular.element(document.getElementsByClassName("angular-google-map-container"));
          mapDiv.css("height", mapDime + "px");
          scope.$apply();
        });
      })
    }
  })
  .directive("loadContent", function () {
    return function (scope, element, attrs) {
      var mapElem = angular.element(document.getElementById("mapContent"));
      mapElem.ready(function () {
        console.log(mapElem);
        console.log("MapHeight", mapElem[0].offsetHeight);
        console.log("MapTop", mapElem[0].offsetTop);
        var newTop = mapElem[0].offsetHeight + mapElem[0].offsetTop;
        element.css("display", "none");
        element.css("top", newTop + "px");
        element.css("display", "block");
        var mapDiv = angular.element(document.getElementsByClassName("angular-google-map-container"));
        mapDiv.css("height", mapElem[0].offsetHeight + "px");
      })
    }
  })

