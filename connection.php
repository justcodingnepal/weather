<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Weather App Backend</title>
</head>
<body>
<?php
$host = "localhost";
$user = "root";
$pass = "";
$apikey = "2a3bb5eca85447b857eedca0256956d6";
$city = isset($_GET['q']) ? $_GET['q'] : "Sheffield";
$conn = mysqli_connect($host, $user, $pass) or die("Connection failed: " . mysqli_connect_error());
echo "Connected <br>";
mysqli_query($conn, "CREATE DATABASE IF NOT EXISTS Weatherapp");
mysqli_select_db($conn, "Weatherapp");
mysqli_query($conn, "DROP TABLE IF EXISTS weather");
mysqli_query($conn, "CREATE TABLE weather (
    city VARCHAR(100),
    humidity FLOAT,
    wind FLOAT,
    pressure FLOAT,
    weather_deatil VARCHAR(255),
    place_name VARCHAR(100),
    day_temp FLOAT,
    feels_like FLOAT,
    wind_direction INT,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");
$cityEscaped = mysqli_real_escape_string($conn, $city);
$url = "https://api.openweathermap.org/data/2.5/weather?q=$cityEscaped&appid=$apikey&units=metric";
$response = file_get_contents($url);
$data = json_decode($response, true);
if ($data && isset($data['main']['humidity'])) {
    $humidity = $data['main']['humidity'];
    $wind = $data['wind']['speed'];
    $pressure = $data['main']['pressure'];
    $weather_detail = $data['weather'][0]['description'];
    $place_name =$data['name'];
    $day_temp =$data['main']['temp'];
    $feels_like =$data['main']['feels_like'];
    $wind_direction =$data['wind']['deg'];
    $insert = "INSERT INTO weather (city, humidity, wind, pressure , weather_deatil, place_name , day_temp, feels_like, wind_direction)
    VALUES ('$cityEscaped', '$humidity', '$wind', '$pressure' , '$weather_detail', '$place_name', '$day_temp', '$feels_like', '$wind_direction')";
    mysqli_query($conn, $insert);
    echo "Weather data for $city inserted.<br>";
} else {
    die("Failed to fetch weather data.");
}
$result = mysqli_query($conn, "SELECT * FROM weather WHERE city = '$cityEscaped'");
$rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
header('Content-Type: application/json');
echo json_encode($rows);
mysqli_close($conn);
?>
</body>
</html>
