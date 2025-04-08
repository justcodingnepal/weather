const apiKey = "2a3bb5eca85447b857eedca0256956d6";
const apiUrl = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
const locationbar = document.getElementById("search_bar")
async function takes_location(location = "Patan"){
  try {
    const response = await fetch(apiUrl(location));
    const data = await response.json();
    const values = {
      'place_name': data.name,
      'day_temp': data.main.temp,
      'weather_info': data.weather[0].main,
      'info': data.weather[0].description,
      'feels_like': data.main.feels_like,
      'pressure': data.main.pressure,
      'humidity': data.main.humidity,
      'wind': data.wind.speed,
      'wind_direction': data.wind.deg
    };
    for (const key in values) {
      const element = document.getElementById(key);
      if (element) {
        element.innerHTML = `${values[key]}`;
      }
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
function updateDateTime() {
    const now = new Date();
    const day = now.toLocaleDateString('en-US', { weekday: 'long' });
    const date = now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const time = now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    document.getElementById("day").textContent = day;
    document.getElementById("date").textContent = date;
    document.getElementById("time").textContent = time;
}
  setInterval(updateDateTime, 1000);
  locationbar.addEventListener('keydown', (event) => {
    if(event.key === "Enter"){
        takes_location(locationbar.value);
    }
  });
  
  window.onload = () => {
    takes_location();
  };
$("day")