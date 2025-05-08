<?php
// Enable JSON output and CORS
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Turn off error display in response, log instead
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

// API Key and DB settings
$apiKey = "2a3bb5eca85447b857eedca0256956d6";
$serverName = "localhost";
$userName = "root";
$password = "";
$dbName = "weatherapp";

// Connect to MySQL
$conn = mysqli_connect($serverName, $userName, $password, $dbName);
if (!$conn) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed"]);
    exit;
}

// Get city from query
$city = isset($_GET['city']) ? trim($_GET['city']) : '';
if (empty($city)) {
    http_response_code(400);
    echo json_encode(["error" => "City parameter is required"]);
    exit;
}

// Check recent data in DB
$sql = "SELECT * FROM weather_data 
        WHERE city = ? 
        AND timestamp >= (NOW() - INTERVAL 3 HOUR) 
        ORDER BY timestamp DESC 
        LIMIT 1";

$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "s", $city);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);

if ($row = mysqli_fetch_assoc($result)) {
    echo json_encode($row);
    exit;
}

// No recent data: fetch from API
$url = "https://api.openweathermap.org/data/2.5/weather?q=" . urlencode($city) . "&units=metric&appid=$apiKey";
$response = @file_get_contents($url);
if (!$response) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to fetch from API"]);
    exit;
}

$data = json_decode($response, true);
if (!isset($data['main'])) {
    http_response_code(500);
    echo json_encode(["error" => "Invalid API response"]);
    exit;
}

// Extract and sanitize data
$place_name = $data['name'];
$day_temp = $data['main']['temp'];
$weather_info = $data['weather'][0]['main'];
$info = $data['weather'][0]['description'];
$feels_like = $data['main']['feels_like'];
$pressure = $data['main']['pressure'];
$humidity = $data['main']['humidity'];
$wind = $data['wind']['speed'];
$wind_direction = strval($data['wind']['deg']);
$icon = $data['weather'][0]['icon'];

// Background image based on weather type
$imageMap = [
    "Clouds" => "https://i.postimg.cc/XvsjvNCT/Cloudy.png",
    "Thunderstorm" => "https://i.postimg.cc/DyXtNfy7/thunderstorm.png",
    "Rain" => "https://i.postimg.cc/ryrDfWWs/Raining.png",
    "Snow" => "https://i.postimg.cc/P52JCMG3/Snowing.png",
    "Clear" => "https://i.postimg.cc/mrgcj5NW/Sunny.png",
    "Mist" => "https://i.postimg.cc/PNnh7Pg8/Misty.png"
];
$background = $imageMap[$weather_info] ?? "https://i.postimg.cc/Y0pG6v2h/default.png";

// Insert into DB
$insert = "INSERT INTO weather_data (
    city, day_temp, weather_info, info, feels_like, pressure, humidity, wind, wind_direction, icon, background
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

$stmt = mysqli_prepare($conn, $insert);
mysqli_stmt_bind_param($stmt, "sdsssiiisss",
    $place_name, $day_temp, $weather_info, $info, $feels_like,
    $pressure, $humidity, $wind, $wind_direction, $icon, $background
);
mysqli_stmt_execute($stmt);

// Return the inserted data
echo json_encode([
    "city" => $place_name,
    "day_temp" => $day_temp,
    "weather_info" => $weather_info,
    "info" => $info,
    "feels_like" => $feels_like,
    "pressure" => $pressure,
    "humidity" => $humidity,
    "wind" => $wind,
    "wind_direction" => $wind_direction,
    "icon" => $icon,
    "background" => $background
]);

// Clean up
mysqli_stmt_close($stmt);
mysqli_close($conn);
