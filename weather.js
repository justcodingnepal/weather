document.getElementById("button").addEventListener("click", weatherapi);
const apiKey = "2a3bb5eca85447b857eedca0256956d6";
const defaultCity = "Sheffield";
const apiUrl = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
async function first_load() {
  try {
    const response = await fetch(apiUrl(defaultCity));
    const data = await response.json();
    console.log("Weather for Sheffield:", data);
    document.getElementById("place_name").innerHTML=`${data.name}`
    document.getElementById("day_temp").innerHTML=`${data.main.temp}`
    document.getElementById("weather_info").innerHTML=`${data.weather[0].main}`
    document.getElementById("info").innerHTML=`${data.weather[0].description}`
    document.getElementById("feels_like").innerHTML=`${data.main.feels_like}`
    document.getElementById("pressure").innerHTML=`${data.main.pressure}`
    document.getElementById("humidity").innerHTML=`${data.main.humidity}`
    document.getElementById("wind").innerHTML=`${data.wind.speed}`
    document.getElementById("wind_direction").innerHTML=`${data.wind.deg}`
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
  updateDateTime();
  setInterval(updateDateTime, 1000*60);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
first_load()
async function weatherapi() {
  const city=document.getElementById("search_bar").value
  try {
    const response = await fetch(apiUrl(city));
    const data = await response.json();

    
    console.log("Weather for Sheffield:", data);
    document.getElementById("place_name").innerHTML=`${data.name}`
    document.getElementById("day_temp").innerHTML=`${data.main.temp}`
    document.getElementById("weather_info").innerHTML=`${data.weather[0].main}`
    document.getElementById("info").innerHTML=`${data.weather[0].description}`
    document.getElementById("feels_like").innerHTML=`${data.main.feels_like}`
    document.getElementById("pressure").innerHTML=`${data.main.pressure}`
    document.getElementById("humidity").innerHTML=`${data.main.humidity}`
    document.getElementById("wind").innerHTML=`${data.wind.speed}`
    document.getElementById("wind_direction").innerHTML=`${data.wind.deg}`
    // const values = {
    //   'place_name': data.name,
    //   'day_temp': data.main.temp,
    //   'weather_info': data.weather[0].main,
    //   'info': data.weather[0].description,
    //   'feels_like': data.main.feels_like,
    //   'pressure': data.main.pressure,
    //   'humidity': data.main.humidity,
    //   'wind': data.wind.speed,
    //   'wind_direction': data.wind.deg
    // };
    
    // console.log("Weather for Sheffield:", data);
    
    // Update DOM elements dynamically
    // for (const key in values) {
    //   const element = document.getElementById(key);
    //   if (element) {
    //     element.innerHTML = `${values[key]}`;
    //   }
    // }
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
  updateDateTime();
  setInterval(updateDateTime, 1000);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
