let searchBtn = $('#search-button');
let todayCont = $('#today')

let currentTime = moment().format("dddd, Do MMMM YYYY")
console.log(currentTime)

let city = "london";

let baseURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid=";
let baseURLweather = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=";

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

    let h3 = $('<h3>')



})
