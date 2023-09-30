
var map;
var geocoder;
function InitializeMap(lat, lon) {

    var latlng = new google.maps.LatLng(lat, lon);
    var myOptions =
    {
        zoom: 8,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
    };
    map = new google.maps.Map(document.getElementById("map"), myOptions);
}

function FindLocaiton() {
    geocoder = new google.maps.Geocoder();
    InitializeMap();

    var address = document.getElementById("addressinput").value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });

        }
        else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });

}


function Button1_onclick() {
    FindLocaiton();
}

window.onload = InitializeMap;


"use strict";



const searchTxt = $("#searchTxt");
const searchBtn = $("#search-btn");
const searchedCity = $("#searched-city");


function clicked(){
    console.log(searchTxt.val());
    $.ajax({
        method : "GET",
        url: `http://api.openweathermap.org/geo/1.0/direct?q=${searchTxt.val()}&appid=1e5996669319635c1bf3b6e0544995ae`,
        success : (resp) => {
           console.log(resp);
           searchedCity.html(resp[0].name +", " + resp[0].country); 
           if (resp.length > 0) {
            const { lat, lon } = resp[0];
            console.log(lat);
            getWeatherData(lat, lon);
            InitializeMap(lat, lon)

            } else {
                console.error('No coordinates found for the city:', city);
            }
        }
     });
}

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10 ? '0' + hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date + ' ' + months[month]

}, 1000);


const wdetail = $(".w-detail");
const wd1 =$(".WD-1");
const wd2 =$(".WD-2");
const explain = $(".w-explain");
const pressure = $("#Pressure");
const visibility = $("#Visibility");
const humidity = $("#Humidity");
const wind = $("#Wind");
const uVIndex = $("#UV-Index");
const sunrise = $("#sunrise");
const sunset = $("#sunset");
const sunriseTime = $(".srt1");
const todayhigh = $("#today-high");
const todaylow = $("#today-low");
const averagehigh = $("#average-high");
const averagelow = $("#average-low");
const rain = $(".infomations");
const umbrellaMust = $("#umbrella-must");
const clothingMust = $("#clothing-must");
const outdoorsMust = $("#outdoors-must");
const heatMust = $("#heat-must");

const aq = $("#Number-AQ");
const w = $("#Number-w");
const h = $("#Number-h");
const v = $("#Number-v");
const p = $("#Number-p");
const dp = $("#Number-dp");
const aqi = $(".aqi-number");

function getWeatherData(lat, lon){
    console.log(searchTxt.val());
    $.ajax({
        method : "GET",
        url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1e5996669319635c1bf3b6e0544995ae&units=metric`,
        success : (resp) => {
            console.log(resp);
            wdetail.html(resp.main.temp +" °C " ); 

            const iconCode = resp.weather[0].icon;
            
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
            $(".w-icon").attr("src", iconUrl);

            wd1.html(resp.weather[0].description);
            wd2.html("Feels like "+resp.main.feels_like + " °C");
            explain.html("The skies will be " + resp.weather[0].main + ". The low will be " + resp.main.temp_min + " °c.");

            pressure.html(resp.main.pressure + " hPa");
            visibility.html((resp.visibility)/ 1000 + " Km");
            humidity.html(resp.main.humidity + " %");
            wind.html(resp.main.humidity + " m/s");
            humidity.html(resp.clouds.all );

            const sunriseTimestamp = resp.sys.sunrise;
            const sunriseDate = new Date(sunriseTimestamp * 1000); 

            
            const formattedSunriseTime = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
            }).format(sunriseDate);
            sunrise.html(formattedSunriseTime);

            const sunsetTimestamp = resp.sys.sunset;
            const sunsetDate = new Date(sunsetTimestamp * 1000); 
            const formattedSunsetTime = new Intl.DateTimeFormat('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
                }).format(sunsetDate);
                sunset.html(formattedSunsetTime);

            const durationInSeconds = sunsetTimestamp - sunriseTimestamp;
            const hours = Math.floor(durationInSeconds / 3600);
            const minutes = Math.floor((durationInSeconds % 3600) / 60);
            sunriseTime.html(hours + " hr " + minutes + " min");   
            
            todayhigh.html(resp.main.temp_max + " °c");
            todaylow.html(resp.main.temp_min + " °c");
            averagehigh.html(resp.main.temp + " °c");
            averagelow.html(resp.main.feels_like + " °c");

            if (resp.rain && resp.rain["1h"]) {
                var rainfall = resp.rain["1h"] / 10;
                rain.html("Today's rainfall is " + rainfall + " cm. Is this above the average for than yesterday");
            } else {
                console.log("Rainfall data is unavailable");
            }


            if(iconCode==="01d" ||iconCode==="01n"||iconCode==="02d"||iconCode==="02n"||iconCode==="03d"||iconCode==="03n" ){
                umbrellaMust.html("🟢 No need");
            }
            else if(iconCode==="04d" ||iconCode==="04n"){
                umbrellaMust.html("🟡 Need");
            }
            else{
                umbrellaMust.html("🔴 Must");
            }

            if(iconCode==="01d" ||iconCode==="01n"||iconCode==="02d"||iconCode==="02n" ){
                outdoorsMust.html("🟢 Excellent");
            }
            else if(iconCode==="04d" ||iconCode==="04n"||iconCode==="03d"||iconCode==="03n"){
                outdoorsMust.html("🟡 Good");
            }
            else{
                outdoorsMust.html("🔴 Poor");
            }


            const feelingTemp = resp.main.feels_like;
            if(feelingTemp <=19 ){
                clothingMust.html("🔴 Coat");
                heatMust.html("🔴 Cold");

            }
            else if(feelingTemp<=25 && feelingTemp>=20){
                clothingMust.html("🟡 Trousers");
                heatMust.html("🟡 Good");

            }
            else{
                clothingMust.html("🟢 Shorts");
                heatMust.html("🟢 Extreme");

            }
        }
    });


    $.ajax({
        method : "GET",
        url: `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=1e5996669319635c1bf3b6e0544995ae&units=metric`,
        success : (resp) => {
            console.log(resp);
            aq.html((resp.list[0].components.so2).toFixed(3) + " μg/m³") ;
            w.html((resp.list[0].components.no2).toFixed(3)+ " μg/m³");
            h.html((resp.list[0].components.pm10).toFixed(3)+ " μg/m³");
            v.html((resp.list[0].components.pm2_5).toFixed(3)+ " μg/m³");
            p.html((resp.list[0].components.o3).toFixed(3)+ " μg/m³");
            dp.html((resp.list[0].components.co).toFixed(3)+ " μg/m³");
            aqi.html(resp.list[0].main.aqi);
        }
    })

}
