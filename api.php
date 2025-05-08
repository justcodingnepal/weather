<?php
    function weather_data($city){
        try{
            $apiKey = "2a3bb5eca85447b857eedca0256956d6";
            $url = "https://api.openweathermap.org/data/2.5/weather?q=" . urlencode($city) . "&appid=" . $apiKey . "&units=metric";    
            $responseString = file_get_contents($url);
            $data = json_decode($responseString);
            return $data;
        } catch(\Throwable $th){
            return null;
        }
    }
?>
