String.prototype.contains = function(it) { return this.indexOf(it) != -1; };

air.factory('util', function($state, stations, $rootScope){
    var OBJ = {};

    OBJ.getIcon = function(str){
        if(str.contains("showers")){
            return "wi-day-showers";
        }
        else if(str.contains("drizzle")){
            return "wi-sprinkle";
        }
        else if(str.contains("rain")){
            return "wi-rain";
        }
        else if(str.contains("snow")){
            return "wi-snow";
        }
        else if(str.contains("mist")){
            return "wi-cloudy-windy";
        }
        else if(str.contains("smoke")){
            return "wi-smoke";
        }
        else if(str.contains("blowing")){
            return "wi-strong-wind";
        }
        else if(str.contains("sandstorm")){
            return "wi-sandstorm";
        }
        else if(str.contains("dust storm")){
            return "wi-dust";
        }
        else if(str.contains("thunderstorm")){
            return "wi-thunderstorm";
        }
        else if(str.contains("supercooled (freezing)")){
            return "wi-snowflake-cold";
        }
        else if(str.contains("hail")){
            return "wi-hail";
        }
        else if(str.contains("haze")){
            return "wi-day-haze";
        }
        else if(str.contains("no-data")){
            return "wi-na";
        }
        else {
            return "wi-cloudy";
        }
    };
    OBJ.performSanity = function(){
        var status = window.localStorage.getItem("intro_taken");
        if(status == "true"){
           $state.go("air.dash");
        }
        else if(status == "false") {
           $state.go("intro");
        }
        else if(status == null) {
            $state.go("intro");
        }


        //Init Dashbord Values
        var dash = window.localStorage.getItem("dash_item");
        if(dash == null){

            $rootScope.dash_data = {
                cond: "no-data",
                cond_icon: this.getIcon("no-data"),
                title: "Not Available",
                time: "N/A",
                temp: "0",
                metar: "No Data",
                isData: false,
                icao: null,
                trends: 'Not Available',
                visibility: "N/A",
                dewpoint: "N/A",
                pressure: "N/A",
                wind : { desc: "No Wind." }
            };
        }
        else {
            $rootScope.dash_data = dash;
        }


        // Init Settings
        var settings = JSON.parse(window.localStorage.getItem("settings"));

        if(settings == null){
            $rootScope.settings = {
                collection: true,
                enable_taf: true
            };
        }
        else {
            $rootScope.settings = settings;
        }
    }
    return OBJ;
});
