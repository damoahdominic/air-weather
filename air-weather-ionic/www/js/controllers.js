// Default controller
air.controller('DashCtrl', function($scope,$ionicLoading,$rootScope,$http,$state, $ionicModal, $timeout, dair, util, stations){
    function search(codeKey, myArray){
        for (var i=0; i < myArray.length; i++) {
            if (myArray[i].code === codeKey) {
                return myArray[i];
            }
        }
    }
    $rootScope.$watch('dash_data', function(newValue, oldValue){
         $scope.dash_data = newValue;
    }, true);

    /* Modal Templates */

    $ionicModal.fromTemplateUrl('templates/dialogs/airport_country.html', {
    scope: $scope
    }).then(function(modal) {
    $scope.listAir  = $rootScope.airports;
    $scope.country_modal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/dialogs/airport_station.html', {
    scope: $scope
    }).then(function(modal) {
    $scope.station_modal = modal;
    });

    // Controller Functions
    $scope.showLoading = function() {
        $ionicLoading.show({
          template: 'Collecting Data ...'
        });
    };
    $scope.hideLoading = function(){
        $ionicLoading.hide();
    };

    $scope.doRefresh = function(){
        if($rootScope.dash_data.isData){

            dair.getMetar($rootScope.dash_data.icao).then(function(data){
            var result = data.data.payload;
            var status = data.data.status;

            if(status == "104"){
                if(result.cond === undefined){
                    $rootScope.dash_data = {
                        cond: "no-data",
                        cond_icon: util.getIcon("no-data"),
                        title: result.weather_type.station,
                        time: result.weather_type.issuetime,
                        temp: result.temperature.value,
                        metar: result.metar,
                        isData: true,
                        trends: result.weather_type.desc,
                        visibility: result.visibility.desc,
                        dewpoint: result.dewpoint.value,
                        pressure: result.pressure.value,
                        wind : result.wind,
                        icao: $rootScope.dash_data.icao
                    };
                }
                else {
                    $rootScope.dash_data = {
                        cond: result.cond.value,
                        cond_icon: util.getIcon(result.cond.value),
                        title: result.weather_type.station,
                        time: result.weather_type.issuetime,
                        temp: result.temperature.value,
                        metar: result.metar,
                        isData: true,
                        trends: result.weather_type.desc,
                        visibility: result.visibility.desc,
                        dewpoint: result.dewpoint.value,
                        pressure: result.pressure.value,
                        wind : result.wind,
                        icao: $rootScope.dash_data.icao
                    };
                }

                $scope.$broadcast("scroll.refreshComplete");
            }
            else {
                alert("Data Unavailable");
            }
            }, function(err){
                alert("Connection Error: Please Check your internet connection");
            });
        }
        else {
            $timeout(function() {
            $scope.$broadcast("scroll.refreshComplete");
            }, 1000);
        }

    }
    $scope.selectAirport = function(icao){
        $scope.station_modal.hide();
        $scope.showLoading();
        dair.getMetar(icao).then(function(data){
           $scope.hideLoading();
            var result = data.data.payload;
            var status = data.data.status;
            console.dir(result);
            if(status == "104"){
                if(result.cond === undefined){
                    $rootScope.dash_data = {
                        cond: "no-data",
                        cond_icon: util.getIcon("no-data"),
                        title: result.weather_type.station,
                        time: result.weather_type.issuetime,
                        temp: result.temperature.value,
                        metar: result.metar,
                        isData: true,
                        icao: icao,
                        trends: result.weather_type.desc,
                        visibility: result.visibility.desc,
                        dewpoint: result.dewpoint,
                        pressure: result.pressure,
                        wind : result.wind
                    };
                }
                else {
                    //alert(util.getIcon(result.cond.value));
                    $rootScope.dash_data = {
                    cond: result.cond.value,
                    cond_icon: util.getIcon(result.cond.value),
                    title: result.weather_type.station,
                    time: result.weather_type.issuetime,
                    temp: result.temperature.value,
                    metar: result.metar,
                    isData: true,
                    icao: icao,
                    trends: result.weather_type.desc,
                    visibility: result.visibility.desc,
                    dewpoint: result.dewpoint.value,
                    pressure: result.pressure.value,
                    wind : result.wind
                    };
                }

            }
            else {
                alert("Data Unavailable");
            }
        }, function(err){
            alert("Connection Error: Please Check your internet connection.");
            console.dir(err)
            $scope.hideLoading();

        });
    }
    $scope.chooseStation = function(code){
        $scope.country_modal.hide();
        var station = search(code, $scope.airports).stations;
        $scope.listStation = station;
        $scope.station_modal.show();
    }
    $scope.closeChooserStation = function(){
        $scope.station_modal.hide();
        $scope.listStation = null;
        $scope.country_modal.show();
    }
    $scope.chooseCountry = function(){
        $scope.listAir  = $rootScope.airports;
        $scope.country_modal.show();
    }
    $scope.closeChooser = function(){
        $scope.country_modal.hide();
    }
});
// Menu Controller
air.controller('MenCtrl', function($scope, $state){
    $scope.goToDash = function(){
        $state.go('air.dash');
    }
});
// Blank Page Controller Controller
air.controller('BlankCtrl', function($scope, $state, $rootScope, util, data_service){
    data_service.getData().then(function(data){
            $rootScope.airports = data;
    });
    $scope.$on('$ionicView.loaded', function(){
        util.performSanity();
    });
});
// Favorites Controller
air.controller('FavCtrl', function($scope, $state){

});
// Browse Airports Controller
air.controller('BrowseCtrl', function($scope, $state, $rootScope){

});
// Settings Controller
air.controller('SettingsCtrl', function($scope, $state, $rootScope){
    $scope.settings = $rootScope.settings;
    $scope.$watch('settings',function(newValue,oldValue){
        if(newValue == null){
        }
        else {
            window.localStorage.setItem("settings", JSON.stringify(newValue));
        }
    },true);

});
// Donate Controller
air.controller('DonateCtrl', function($scope, $state){
    $scope.openBrowser = function(){
        window.open('https://www.paypal-community.com', '_system', 'location=yes');
    };
});
// Intro Controller
air.controller('IntroCtrl', function($scope, $state, $http, auth){
    //url: hostname/app/api/users/login
    
    auth.login($scope.username,$scope.password).then(function(data){
            if(data.status == true){
                $state.go("dashboard");
                $root
            }
    });
    
    
    
    var startApp = function() {
        $state.go('air.dash');
        window.localStorage.setItem("intro_taken", "true");
    };
    if(window.localStorage.getItem("intro_taken") == "true") {
        console.log('Skip intro');
        startApp();
    }
    $scope.next = function() {
        $scope.$broadcast('slideBox.nextSlide');
    };
    $scope.start = function(e){
        startApp();
    }
    $scope.slideChanged = function(index) {
    };

});
