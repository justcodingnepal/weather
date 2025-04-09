//used to get api and add image in it
document.getElementById("button").addEventListener("click", weatherapi);
const apiKey = "2a3bb5eca85447b857eedca0256956d6";
const defaultCity = "Sheffield";
const apiUrl = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  function background_image(images){
    document.body.style.background=`url('images/${images}')`
    document.body.style.backgroundSize="cover"
    document.body.style.backgroundRepeat="no-repeat"
    document.body.style.backgroundRepeat="center"
  }
  //used for date and time
function updateDateTime() {
  const now = new Date();
  const day = now.toLocaleDateString("en-US", { weekday: "long" });
  const date = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  document.getElementById("day").textContent = day;
  document.getElementById("date").textContent = date;
  document.getElementById("time").textContent = time;
}
setInterval(updateDateTime, 1000 * 60);
//to get datas
async function first_load() {
  try {
    const response = await fetch(apiUrl(defaultCity));
    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
first_load();
async function weatherapi() {
  const city = document.getElementById("search_bar").value;
  try {
    const response = await fetch(apiUrl(city));
    const data = await response.json();
    updateWeatherUI(data);
  } catch (error) {
    alert("Enter correct city")
  }
}
function updateWeatherUI(data) {
  const weather_detail = data.weather[0].main;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  switch (weather_detail) {
    case "Clouds":
      background_image("Cloudy.png")
      document.getElementById('search_bar').style.color = "black";
      document.getElementById('button').style.color = "black";
      break;
    case "Thunderstorm":
       background_image("Thunderstrom.png")
      break;
    case "Rain":
      background_image("Raining.png")
      break;
    case "Snow":
      background_image("Snowing.png")
      break;
    case "Clear":
      background_image("Sunny.png")
      break;
    case "Mist":
      background_image("Misty.png")
      break;
    default:
      console.log("Other weather condition");
  }
  document.getElementById("place_name").innerHTML = data.name;
  document.getElementById("day_temp").innerHTML = `${data.main.temp}°C`;
  document.getElementById("weather_info").innerHTML = weather_detail;
  document.getElementById("info").innerHTML = data.weather[0].description;
  document.getElementById("feels_like").innerHTML = `${data.main.feels_like}`;
  document.getElementById("pressure").innerHTML = `${data.main.pressure} hPa`;
  document.getElementById("humidity").innerHTML = `${data.main.humidity}%`;
  document.getElementById("wind").innerHTML = `${data.wind.speed} m/s`;
  document.getElementById("wind_direction").innerHTML = `${data.wind.deg}°`;
  document.getElementById("icon").src = iconUrl;
  updateDateTime();
}
