var myItemsApp = angular.module('poaCarros', []);


myItemsApp.factory('itemsFactory', ['$http', function($http){
  var itemsFactory ={
    itemDetails: function() {
      return $http(
      {
        url: "../json/products.json",
        method: "GET",
      })
      .then(function (response) {
        return response.data;
        });
      }
    };
    return itemsFactory;
  
}]);


myItemsApp.controller('productController', ['$scope', 'itemsFactory', function($scope, itemsFactory){
  var promise = itemsFactory.itemDetails();

    promise.then(function (data) {
        $scope.itemDetails = data;
        console.log(data);
    });
    $scope.select = function(item) {
      $scope.selected = item;
    }
    $scope.selected = {};
}]);

myItemsApp.directive("owlCarousel", ['$timeout',function($timeout) {
	return {
		restrict: 'E',
		transclude: false,
		link: function (scope) {
  			scope.initCarousel = function(element) {
  			   $timeout(function () {
      			  // provide any default options you want
      				var defaultOptions = {
      				};
      				var customOptions = scope.$eval($(element).attr('data-options'));
      				// combine the two options objects
      				for(var key in customOptions) {
      					defaultOptions[key] = customOptions[key];
      				}
      				// init carousel
      				$(element).owlCarousel(defaultOptions);
  			   },50);
  		};
		}
	};
}])
.directive('owlCarouselItem', [function() {
	return {
		restrict: 'A',
		transclude: false,
		link: function(scope, element) {
		  // wait for the last item in the ng-repeat then call init
			if(scope.$last) {
				scope.initCarousel(element.parent());
			}
		}
	};
}]);


// function teste (){
//     document.querySelector('#carros').innerHTML = "<button>teste</button>";
//     alert("carregou");
// }


// var mainAngular = angular.module('poaCarros', ['ngRoute']);
// mainAngular.controller('productController', function ($scope, $http) {
//     var hCat = "../json/products.json";
//     $http.get(hCat).success(function (response) {
//         $scope.categories = response;
//     });
// });