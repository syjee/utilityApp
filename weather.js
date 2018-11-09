const weather = document.querySelector(".js-weather");

const API_KEY = "a3d815dd03860cd5b31a01530979f3bc";

//coordinate : 좌표
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(
        `https:\\api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function (res) {
        return res.json();
    }).then(function (json){
        const temp = json.main.temp;
        const place = json.name;
        weather.innerText=`${temp}℃, ${place}`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(latitude, longitude);

    const coordsObj = {
        latitude,
        longitude
    };

    saveCoords(coordsObj);
    getWeather(coordsObj.latitude, coordsObj.longitude);
}

function handleGeoError(error){
    console.log(error);
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess,handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();