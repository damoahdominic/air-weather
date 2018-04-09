// The DAir Service for getting actual weather
air.service('dair', function ($http){
    var host = "vvuconnect.net";
    var webservice_url = "http://"+host+"/dair/service.php";
    this.getMetar = function(icao){
        return $http.get(webservice_url+"?context=metar&ICAO="+icao.toUpperCase()+"");
    };
    this.getTaf = function(icao){
        return $http.get(webservice_url+"?context=taf&ICAO="+icao.toUpperCase()+"");
    };
});

// The Stations Service for returning Station data
air.service('stations', function($http){
    this.getData = function(){
        return $http.get('data/stations.json');
    };
});

air.service('data_service', function(stations){
    this.getData = function (){
        return stations.getData().then(function(data){
            var airports = data;
            var countries_loaded = Object.keys(data.data.countries);
            var result = Array();
            $.each(countries_loaded, function(i,country){
                var country_code = country;
                var country_name = data.data.countries[country].title;
                var stations = data.data.countries[country].stations;
                result.push({"code": country_code, "name": country_name, "flag": country_code.toLowerCase(),  "stations": stations});
            });
            return result;
        }, function(err){
            alert("Error: "+err);
        });
    };
})
