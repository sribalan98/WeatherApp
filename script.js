const timequery = document.querySelector(".time-style");
const datequery = document.querySelector(".date-style");
const searchInput = document.querySelector(".input-search");
const btnSearcher = document.querySelector(".btn-search");
const temp_text = document.querySelector(".temp-text");
const weatherText = document.querySelector(".weather-text");
const citytext = document.querySelector(".Citytext");

//!
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

function successCallback(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  weatherApiCall(longitude, latitude);
}

function errorCallback(error) {
  console.error(`Error getting location: ${error.message}`);
}
//!
//*

btnSearcher.addEventListener("click", async () => {
  const cityName = searchInput.value;
  const geoAPI = `fe83163bf9694ebc8c8625752b2e3c26`;
  const geoURL = `https://api.geoapify.com/v1/geocode/search?text=${cityName}&apiKey=${geoAPI}`;
  const geoDATA = await fetch(geoURL);
  const geoResponce = await geoDATA.json();
  const geoLon = geoResponce.features[0].properties.lon;
  console.log(geoLon);
  const geoLat = geoResponce.features[0].properties.lat;
  console.log(geoLat);
  // console.log(geoResponce.features[0].properties.name);
  weatherApiCall(geoLon, geoLat);
});

//!

async function weatherApiCall(lon, lat) {
  const WAPIkey = `2be324727ee1c94f5b2b75e55bce8052`;
  const apiWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=en&appid=${WAPIkey}`;
  const WfetchData = await fetch(apiWeather);
  const responce = await WfetchData.json();
  console.log(responce);
  const tempN = responce.main.temp.toString().slice(0, 2);
  const weatherMain = responce.weather[0].main;
  const areaName = responce.name;
  updateDisplay(tempN, weatherMain, areaName);
}
function updateDisplay(temp, weatherMain, areaName) {
  temp_text.innerHTML = `${temp}<sub>.C</sub>`;
  weatherText.textContent = `${weatherMain}`;
  citytext.textContent = `${areaName}`;
}

//*

//!

setInterval(() => {
  const dataDT = new Date();
  const hours = dataDT.getHours();
  const minutes = dataDT.getMinutes();
  const seconds = dataDT.getSeconds();
  const date = dataDT.getDate();
  const month = dataDT.getMonth();
  const year = dataDT.getFullYear();
  timequery.textContent = `${timezero(hours)}:${timezero(minutes)}:${timezero(
    seconds
  )}`;
  datequery.textContent = `${date}-${month}-${year}`;
});

function timezero(zero) {
  return zero < 10 ? "0" + zero : zero;
}

//!
