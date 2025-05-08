<?php
    include("./database.php");

    // Get DB connection and store it
    $connection = connect_database("localhost", "root", "", "weather");

    $data = '{
        "coord": {
            "lon": -1.4659,
            "lat": 53.383
        },
        "weather": [
            {
                "id": 804,
                "main": "Clouds",
                "description": "overcast clouds",
                "icon": "04d"
            }
        ],
        "base": "stations",
        "main": {
            "temp": 15.68,
            "feels_like": 14.87,
            "temp_min": 15.68,
            "temp_max": 15.68,
            "pressure": 1017,
            "humidity": 60,
            "sea_level": 1017,
            "grnd_level": 995
        },
        "visibility": 10000,
        "wind": {
            "speed": 0.54,
            "deg": 94,
            "gust": 2
        },
        "clouds": {
            "all": 95
        },
        "dt": 1746184383,
        "sys": {
            "country": "GB",
            "sunrise": 1746160156,
            "sunset": 1746214575
        },
        "timezone": 3600,
        "id": 2638077,
        "name": "Sheffield",
        "cod": 200
    }';
    $apiData = json_decode($data, true);
    echo insert_data($connection, "Sheffield", $apiData);
?>