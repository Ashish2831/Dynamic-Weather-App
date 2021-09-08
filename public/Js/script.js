"use strict";

const apikey = "7a7abcbbf9e44e459f199a259afc161f";

const cityName = document.getElementById('cityName');
const output = document.getElementById('output');
const temp = document.getElementById('temp');
const temp_status = document.getElementById('temp_status');
const day = document.getElementById('day');
const today_date = document.getElementById('today_date');
const temp_data = document.getElementById('temp_data');

var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

const date = new Date();

day.innerHTML = days[date.getDay()];
today_date.innerHTML = `${months[date.getMonth()]} ${date.getDate()}`;

const search = document.getElementById('search');
search.addEventListener('click', async (event) => {
    event.preventDefault();
    const cityNameValue = cityName.value;
    if (cityNameValue === "") {
        output.innerHTML = "Please Enter City Name!!";
    } else {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityNameValue}&appid=${apikey}`);
            const data = await response.json();
            if (data.message === "city not found") output.innerHTML = "Please Enter Correct City Name!!";
            else {
                output.innerHTML = `${data.name}, ${data.sys.country}`;
                temp.innerHTML = (parseFloat(data.main.temp) - 273.15).toPrecision(4);
                const weather = data.weather[0].main;
                temp_data.classList.remove('data_hide');

                if (weather == "Sunny" || weather == "Clear") {
                    temp_status.innerHTML = `<i class="fas fa-sun" aria-hidden="true"></i>`;
                } else if (weather == "Clouds") {
                    temp_status.innerHTML = `<i class="fas fa-cloud" aria-hidden="true"></i>`;
                } else if (weather == "Rain") {
                    temp_status.innerHTML = `<i class="fas fa-cloud-rain" aria-hidden="true"></i>`;
                } else {
                    temp_status.innerHTML = `<i class="fas fa-cloud" aria-hidden="true"></i>`;
                }
            }
        } catch (error) {
            console.log(error);
            output.innerHTML = "No Data Available!!";
        }
    }
})