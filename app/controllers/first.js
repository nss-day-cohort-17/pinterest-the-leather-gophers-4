app.controller("FirstCtrl", function($scope, getFactory, $mdDialog) {
  console.log("FirstCtrl");

  // Get DATA from firebase
  getFactory.getData()
    .then(function (data) {
      $scope.result = data.data;

    })
    .then(function() {  //Add random col/row spans to each pin to randomize layout
      Object.keys($scope.result).forEach(function(id) {
        $scope.result[id].rowspan = random()
      });
    })
    .then(() => {
      $scope.pins = [];
      var keys = Object.keys($scope.result);
      keys.forEach(function(key){
        $scope.pins.push($scope.result[key]);
      });
      console.log($scope.pins.length);
    shuffleArray(($scope.pins))
    })


  //http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  // Shuffles array
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }


  // Function to return random number for col/row spans
  var random = function() {
    var r = Math.random();
    if (r < 0.2) {
      return 1;
    } else if (r < 0.5) {
      return 2;
    } else {
      return 3;
    }
  };

  //mdDialog opens when save button is click on any pin
  $scope.status = '  ';
  $scope.customFullscreen = false;

  $scope.showAdvanced = function(ev) {
    //console.log(ev.path[2].children[0].src);
    $scope.pinImg = ev.path[1].children[0].src;
    $scope.pinTitle = ev.path[1].children[2].innerText;
    console.log(ev);
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'app/partials/pinModalPartial.html',
      parent: angular.element(document.body),
      scope: $scope,
      preserveScope: true,
      targetEvent: ev,
      clickOutsideToClose:true,
      disableParentScroll: true,
      fullscreen: $scope.customFullscreen,
    });
  };

  function DialogController($scope, $mdDialog) {


    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

  }
});
