let searchBtn = $('#search-button');
let todayCont = $('#today');
let cityInput = $('#search-input');

let URLcity;
let cityArr = []

let currentTime = moment().format("dddd, Do MMMM YYYY")

let baseURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q="+URLcity+"&appid=";
let baseURLweather = "https://api.openweathermap.org/data/2.5/weather?q="+URLcity+"&appid=";

let APIkey = "1d7e3c1a43a8848ba84bed69fb61e0e0";

queryURLforecast = baseURLforecast + APIkey;
queryURLweather = baseURLweather + APIkey;

// $.ajax({
//     url: queryURLforecast,
//     method: "GET"
//     }).then(function(response){

//     console.log(response)
// });

// $.ajax({
//     url: queryURLweather,
//     method: "GET"
//     }).then(function(response){

//     console.log(response)
// });



searchBtn.click(function(event){
    
    event.preventDefault()
    todayCont.empty()

    city = $('<h3>');
    city.text( cityInput.val() +" "+ currentTime);
    todayCont.append(city);
    cityStored = cityInput.val()
    localStorage.setItem('city', cityStored)

})
