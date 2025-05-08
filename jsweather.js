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
setInterval(updateDateTime, 60000); // Update every minute

async function first_load() {
  await getAndDisplayWeather(defaultCity, apiKey);
}

first_load();

async function weatherapi() {
  const city = document.getElementById("search_bar").value.trim();
  if (city === "") {
    alert("Please enter a city name.");
    return;
  }
  await getAndDisplayWeather(city, apiKey);
}

async function getAndDisplayWeather(city, apiKey) {
  let data;
  if (navigator.onLine) {
    try {
      const response = await fetch(apiUrl(city));
      data = await response.json();
      if (data.cod !== 200) {
        alert("City not found. Please enter a correct city.");
        return;
      }
      localStorage.setItem(city.toLowerCase(), JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching online weather data:", error);
      alert("Failed to fetch weather online.");
      return;
    }
  } else {
    const cachedData = localStorage.getItem(city.toLowerCase());
    if (cachedData) {
      data = JSON.parse(cachedData);
      alert("We noticed you are offline showing offline data");
    } else {
      alert("No offline data available for this city.");
      return;
    }
  }

  updateWeatherUI(data);
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

  document.getElementById("place_name").textContent = data.name;
  document.getElementById("day_temp").textContent = `${data.main.temp}°C`;
  document.getElementById("weather_info").textContent = weather_detail;
  document.getElementById("info").textContent = data.weather[0].description;
  document.getElementById("feels_like").textContent = `${data.main.feels_like}°C`;
  document.getElementById("pressure").textContent = `${data.main.pressure} hPa`;
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;
  document.getElementById("wind").textContent = `${data.wind.speed} m/s`;
  document.getElementById("wind_direction").textContent = `${data.wind.deg}°`;
  document.getElementById("icon").src = iconUrl;
  updateDateTime();
}
