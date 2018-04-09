<?php 
	error_reporting(E_ALL);
	require ("includes/pmew.inc.php");
	require ("includes/functions.php");

	// Simlple GET Based Web Service to Extract Weather reports based on the ICAO code using PHPMyEasyWeather
	// Status Codes

	$STATUS = array("101" => "Generic Error", 
					"102" => "Input DATA Format Error",
					"103" => "Data Unavailable Error",
					"104" => "OK. Request Processed",
					"105" => "OK. However feature not complete",
					"106" => "ICAO Not Found Error");

	if(!isset($_GET['context'])){
		echo json_encode(array("status" => "102", "msg" => $STATUS['102'], "payload"=> null));
	}
	else {

		if($_GET['context'] == "metar"){
			if(isset($_GET['ICAO'])){
				$ICAO = $_GET['ICAO'];
				$out_metar = getMetarFromWWW($ICAO);
				$out_weather = displayEasyWeatherJSON($out_metar["metar"], "en");
				if(empty($out_metar["metar"])){
					$code  = "106";
					echo array2json(array("status" => $code, "msg" => $STATUS[$code], "payload"=> $out_weather));
				}
				else {
					$code  = "104";
					echo array2json(array("status" => $code, "msg" => $STATUS[$code], "payload"=> $out_weather));
				}	
					
			}
		}
		// unavailable service
		else if($_GET['context'] == "taf"){
			if(isset($_GET['ICAO'])){
				$ICAO = $_GET['ICAO'];
				$out_taf = getTAFFromWWW($ICAO);
				$result = array("taf" => $out_taf);
				
				$code = "105";
				echo json_encode(array("status" => $code, "msg" => $STATUS[$code], "payload"=> $result));
			}
		}
		else if($_GET['context'] == "data-init"){
			$string = file_get_contents('stations.json');
			$arrx = json_decode($string);
			$code = "104";
			echo json_encode(array("status" => $code, "msg" => $STATUS[$code], "payload"=> $arrx));		
		}
	}


 ?>