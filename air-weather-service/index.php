<?php 
error_reporting(E_ALL);
require ("includes/pmew.inc.php");   
 ?>              
<html>
<head>
<title>DAir Weather Report (Web Service) - version 1.0</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<center>
  <h1>DAir Weather Report</h1>
  <?php 
    $country = $_GET['country'];
    $ICAO = $_GET['ICAO'];
    $action = $_GET['action'];
   ?>
  <form action="index.php" method="get">
      <fieldset>
        <legend>Check out the weather report for:</legend>
          <?php
          echo "<p>\n";
          echo "Your Country:\n";                               // some inescapable HTML code
          if (!isset($country)) $country="GH";                  // give him a country if not yet selected!
          echo displayCountryMenu("country","dropclass");       // call the displayCountryMenu function!
                                                                // I prefer entering here the weather for
          echo "</p>\n";                                        // Rome airport Leonardo da Vinci because
          echo "<p>\n";                                         // in a former live I lived there and that´s
          echo "Your Station:\n";                               // why I always have to look in my present

          if (!isset($ICAO)) $ICAO="DGAA";                      // give him a station if not yet selected!
          echo displayStationMenu($country,"ICAO","dropclass"); // call the displayStationMenu function!                                  
          echo "&nbsp;&nbsp;&nbsp;&nbsp;\n";                    // Civil Aviation Organization"
          echo "</p>\n";
          echo "<input class=\"button-send\" type=\"Submit\" name=\"action\" value=\"submit\">";
          echo "<br><br><b><i>Results:</i></b>";
          if ($action=="submit") {                              // if an airport is selected...
             if ($ceck=getMetarFromWWW($ICAO)) {                // and if there is a METAR code...
                echo "<p>\n";
                echo displayEasyWeather($ceck["metar"],"en");   // a very easy way to display the weather
                echo "</p>\n";
                echo "<p style=\"color:silver;font-size:9px\">\n";
                echo $ceck["metar"];
                echo "</p>\n";
             }
             if ($ceck=getTAFFromWWW($ICAO)) {                  // and if there is a TAF code...
                echo "<p>\n";
                echo displayEasyForecast($ceck["taf"],"en");    // display easily the forecast
                echo "</p>\n";
                echo "<p style=\"color:silver;font-size:9px\">\n";
                echo $ceck["taf"];
                echo "</p>\n";
             }
          }
          else {
            echo " No Results";
          }
          ?>
      </fieldset>
  </form>
</center>
</body>
</html>