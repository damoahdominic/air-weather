<?php
 
   /*
   
   Recursively Traverses Courties to enumerate weather stations (MySQL)
   Snippet: Read All Counrties and Stations
   Requires: pmew.inc.php
   Author: Damoah Dominic
   
   */
   $countries = readCountrys();
   $resultant = null;
   foreach ($countries as $keyc => $valuec) {
      echo $keyc." -->".$valuec."<BR>";
      echo "Country Added [".$value."]";
      $stations = getStations($keyc);
      foreach ($stations as $key => $value) {
        $sts = split(";", $value);
        $icao = $sts[0];
        $title = $sts[1];
        $resultant["countries"][$keyc]["title"] = $valuec;
        $resultant["countries"][$keyc]["stations"][] = array("title" => $title, "icao"=> $icao);
        echo "Added [ $icao and $title ] To Store<br>";
      }
   }
   echo "<h1>Done Testing</h1>";
   echo json_encode($resultant);

 ?>