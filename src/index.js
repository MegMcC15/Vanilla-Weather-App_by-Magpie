// removed changing C & F for now

// Next:
// Display local conditions, & click Current button to display local conditions
// changes city name, main temp, hi & lo temp, and Feels Like temp
// Using Imperial (°F), using geolocation lat & long to display local city details
// remember!! console.log(show); use .data.main.etc or data.name for the apiUrl .then(function)

function showLocalData(show) {
	let localCityName = show.data.name;
	let localCityTemp = Math.round(show.data.main.temp);
	let localTempMax = Math.round(show.data.main.temp_max);
	let localTempMin = Math.round(show.data.main.temp_min);
	let localFeelsLike = Math.round(show.data.main.feels_like);
	let replaceCityName = document.querySelector("#change-city-name");
	let replaceCityTemp = document.querySelector("#main-temp");
	let replaceTempMax = document.querySelector("#change-main-hi");
	let replaceTempMin = document.querySelector("#change-main-lo");
	let replaceFeelsLike = document.querySelector("#change-feels-like");

	replaceCityName.innerHTML = localCityName;
	replaceCityTemp.innerHTML = localCityTemp;
	replaceTempMax.innerHTML = localTempMax;
	replaceTempMin.innerHTML = localTempMin;
	replaceFeelsLike.innerHTML = localFeelsLike;
}

function getLocalDetails(show) {
	let lat = show.coords.latitude.toFixed(2);
	let lon = show.coords.longitude.toFixed(2);
	let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
	let apiKey = "aee115d67b5ede7133bf4a0747025512";
	let unit = "imperial";
	let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

	axios.get(apiUrl).then(showLocalData);
}

function requestCurrentConditions(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(getLocalDetails);
}

let currentConditions = document.querySelector("#show-current-conditions");
currentConditions.addEventListener("click", requestCurrentConditions);

navigator.geolocation.getCurrentPosition(getLocalDetails);

// Next:
// Change city details using the Search form
// city name, main temp, hi & low temp, & Feels Like temp
// Using imperial (°F), using API city locator

function showTemperature(show) {
	let newCityName = show.data.name;
	let newCityTemp = Math.round(show.data.main.temp);
	let newTempMax = Math.round(show.data.main.temp_max);
	let newFeelsLike = Math.round(show.data.main.feels_like);
	let newTempMin = Math.round(show.data.main.temp_min);
	let replaceCityName = document.querySelector("#change-city-name");
	let replaceCityTemp = document.querySelector("#main-temp");
	let replaceTempMax = document.querySelector("#change-main-hi");
	let replaceTempMin = document.querySelector("#change-main-lo");
	let replaceFeelsLike = document.querySelector("#change-feels-like");

	replaceCityName.innerHTML = newCityName;
	replaceCityTemp.innerHTML = newCityTemp;
	replaceTempMax.innerHTML = newTempMax;
	replaceTempMin.innerHTML = newTempMin;
	replaceFeelsLike.innerHTML = newFeelsLike;
}

function replace(event) {
	event.preventDefault();
	let changeCityName = document.querySelector("#change-city-name");
	let cityInput = document.querySelector("#change-city-input");
	let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
	let apiKey = "aee115d67b5ede7133bf4a0747025512";
	let unit = "imperial";
	let apiUrl = `${apiEndpoint}?q=${cityInput.value}&appid=${apiKey}&units=${unit}`;

	if (cityInput.value) {
		changeCityName.innerHTML = cityInput.value.trim().toLowerCase();
	} else {
		cityInput.value === null;
		alert(`Please enter a city name`);
		changeCityName.innerHTML = "--";
	}

	axios.get(apiUrl).then(showTemperature);
}

let changeCity = document.querySelector("#change-city-btn");
changeCity.addEventListener("click", replace);

// Next:
// changes date & time
// index months and days

let newDate = new Date();

let year = newDate.getFullYear();
let months = [
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"June",
	"July",
	"Aug",
	"Sep",
	"Oct",
	"Nov",
	"Dec",
];
let month = months[newDate.getMonth()];
let date = newDate.getDate();
let days = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let day = days[newDate.getDay()];
let hour = newDate.getHours();
let minute = newDate.getMinutes();
let currentDate = document.querySelector("#update-date");

if (minute < 10) {
	minute = "0" + minute;
}

if (hour > 12) {
	hour = hour -= 12;
	minute = minute + "pm";
} else if (hour === 12) {
	hour = 12;
	minute = minute + "am";
} else {
	minute = minute + "am";
}

currentDate.innerHTML = `${hour}:${minute}  |  ${day} ${month} ${date}, ${year} `;

// ${hour}:${minute} <--I'd normally leave this out
// b/c smartphones, and other devices, display the time on screen even while some apps run
// so I don't think it's needed in final design?
