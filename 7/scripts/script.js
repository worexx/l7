const description = document.querySelector("[data-description]");
const temp = document.querySelector("[data-temp]");
const feelsLike = document.querySelector("[data-feels_like]");
const tempMin = document.querySelector("[data-temp_min]");
const tempMax = document.querySelector("[data-temp_max]");
const pressure = document.querySelector("[data-pressure]");
const humidity = document.querySelector("[data-humidity]");
const windSpeed = document.querySelector("[data-wind_speed]");
const cityName = document.querySelector("[data-city_name]");
const cityInput = document.querySelector("[data-city]");

const getWeatherByRequest = (city, callback) => {
  const request = new XMLHttpRequest();
  request.open("GET", `/weather?city=${city}`, true);
  request.addEventListener("readystatechange", () => {
    if (request.readyState == 4 && request.status == 200) {
      callback(JSON.parse(request.responseText), city);
    }
  });
  request.send();
}

const showWeather = (weather, c) => {
  if (weather === null) {
    alert(`Город <${c}> не был найден :(`);
    return;
  }
  const main = weather.main;
  cityName.textContent = c || weather.name
  description.textContent = weather.weather[0].description.toUpperCase();
  temp.textContent = Math.round(+main.temp) + ' C°';
  feelsLike.textContent = Math.round(+main.feels_like) + ' C°';
  tempMin.textContent = Math.round(+main.temp_min) + ' C°';
  tempMax.textContent = Math.round(+main.temp_max) + ' C°';
  pressure.textContent = Math.round(+main.pressure) + ' мм.рт.ст.';
  humidity.textContent = Math.round(+main.humidity) + ' %';
  windSpeed.textContent = Math.round(+weather.wind.speed) + ' км/ч';
}

getWeatherByRequest('Запорожье', showWeather);

cityInput.addEventListener("keypress", e => {
  if (e.key === 'Enter') {
    e.preventDefault()
    getWeatherByRequest(cityInput.value, showWeather);
    cityInput.value = ''
  }
});