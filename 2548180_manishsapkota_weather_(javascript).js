document.getElementById("button").addEventListener("click", weatherapi);
const apiKey = "2a3bb5eca85447b857eedca0256956d6";
const defaultCity = "Sheffield";

const apiUrl = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

function background_image(imageUrl) {
  document.getElementById("bg-image").src = imageUrl;
}

function updateDateTime() {
  const now = new Date();
  document.getElementById("day").textContent = now.toLocaleDateString("en-US", { weekday: "long" });
  document.getElementById("date").textContent = now.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  document.getElementById("time").textContent = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
}
setInterval(updateDateTime, 60000);

async function first_load() {
  try {
    const response = await fetch(apiUrl(defaultCity));
    const data = await response.json();
    updateWeatherUI(data);
    console.log(data)
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
    console.log(data)
    updateWeatherUI(data);
  } catch (error) {
    alert("Enter correct city");
  }
}

function updateWeatherUI(data) {
  const weather_detail = data.weather[0].main;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const imageMap = {
    Clouds: "https://i.postimg.cc/XvsjvNCT/Cloudy.png",
    Thunderstorm: "https://i.postimg.cc/DyXtNfy7/thunderstorm.png",
    Rain: "https://i.postimg.cc/ryrDfWWs/Raining.png",
    Snow: "https://i.postimg.cc/P52JCMG3/Snowing.png",
    Clear: "https://i.postimg.cc/mrgcj5NW/Sunny.png",
    Mist: "https://i.postimg.cc/PNnh7Pg8/Misty.png"
  };

  background_image(imageMap[weather_detail] || "images/default.png");

  document.getElementById("place_name").innerHTML = data.name;
  document.getElementById("day_temp").innerHTML = `${data.main.temp}°C`;
  document.getElementById("weather_info").innerHTML = weather_detail;
  document.getElementById("info").innerHTML = data.weather[0].description;
  document.getElementById("feels_like").innerHTML = `${data.main.feels_like}°C`;
  document.getElementById("pressure").innerHTML = `${data.main.pressure} hPa`;
  document.getElementById("humidity").innerHTML = `${data.main.humidity}%`;
  document.getElementById("wind").innerHTML = `${data.wind.speed} m/s`;
  document.getElementById("wind_direction").innerHTML = `${data.wind.deg}°`;
  document.getElementById("icon").src = iconUrl;

  updateDateTime();
}