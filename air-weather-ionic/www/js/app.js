/*
    Main Angular Module (air)
*/
var air = angular.module('airweather', ['ionic'])

.run(function($ionicPlatform,dair,$rootScope,$http,stations, data_service) {

    $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
          StatusBar.styleDefault();
        }
  });
});



