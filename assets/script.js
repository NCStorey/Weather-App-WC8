let searchBtn = $('#search-button');
let todayCont = $('#today');
let cityInput = $('#search-input');
let forecastCont = $('#forecast');
let h4 = $('#h4')
let forecast1 = $('#forecast1');
let forecast2 = $('#forecast2');
let forecast3 = $('#forecast3');
let forecast4 = $('#forecast4');
let forecast5 = $('#forecast5');
let forecast1H = $('#forecast1H')
let forecast2H = $('#forecast2H')
let forecast3H = $('#forecast3H')
let forecast4H = $('#forecast4H')
let forecast5H = $('#forecast5H')


let cityArr = [];

let currentTime = moment().format("dddd, Do MMMM YYYY");
let forecastDay1 = moment().add(1, 'd')
let forecastDay2 = moment().add(2, 'd')
let forecastDay3 = moment().add(3, 'd')
let forecastDay4 = moment().add(4, 'd')
let forecastDay5 = moment().add(5, 'd')


let APIkey = "1d7e3c1a43a8848ba84bed69fb61e0e0";

// queryURLforecast = baseURLforecast + APIkey;



// $.ajax({
//     url: queryURLforecast,
//     method: "GET"
//     }).then(function(response){

//     console.log(response)
// });


//remove duplicates from cityArr


searchBtn.click(function(event){
    
    //stop the header dissapearing by preventing the form default
    event.preventDefault()

    //clears the previous searches from the window
    todayCont.empty()

    //capturing the users intput and putting it into a variable
    let cityStored = cityInput.val().trim()

    let baseURLweather = "https://api.openweathermap.org/data/2.5/weather?q="+cityStored+"&appid=";
    queryURLweather = baseURLweather + APIkey;

    //ajax request here
    $.ajax({
        url: queryURLweather,
        method: "GET",
        success: (function(response){

            console.log(response)
    
            //creating a h3 element to store the user city
            h3 = $('<h3>');

            //makes the h3 the text that the user input
            h3.text(cityStored +" "+ currentTime);

            let img = $('<img>')
            
            let iconURL = "http://openweathermap.org/img/wn/" + (response.weather[0].icon) + "@2x.png"

            img.attr('src' , iconURL)
            img.attr('class', 'currentIcon')

            h3.append(img)
            

            //appends the h3 onto the tody container to display and the window
            todayCont.append(h3);

            //pushes the searched city onto the array
            cityArr.push(cityStored)
            console.log(cityArr)

            localStorage.setItem('city', JSON.stringify(cityArr))

            //code to creat current variables and display them in the window
            let description = response.weather[0].description
            let temp = (response.main.temp - 273.15).toFixed(1);
            let wind = response.wind.speed;
            let humid = response.main.humidity;

            let descriptionli = $('<li>')
            let templi = $('<li>')
            let windli = $('<li>')
            let humidli = $('<li>')

            descriptionli.text('Description: ' + description)
            descriptionli.attr('class', 'currentvar')

            templi.text('Temperature: ' + temp + ' C')
            templi.attr('class', 'currentvar')

            windli.text('Wind: ' + wind + " KPH")
            windli.attr('class', 'currentvar')

            humidli.text('Humidity: ' + humid + '%')
            humidli.attr('class', 'currentvar')
            
            todayCont.append(descriptionli, templi, windli, humidli)

            //logic to create the forecast information

            h4.text('5 Day Forecast')

            forecast1H.text(forecastDay1.format('DD/MM/YYYY'));
            forecast2H.text(forecastDay2.format('DD/MM/YYYY'));
            forecast3H.text(forecastDay3.format('DD/MM/YYYY'));
            forecast4H.text(forecastDay4.format('DD/MM/YYYY'));
            forecast5H.text(forecastDay5.format('DD/MM/YYYY'));

            let baseURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q="+cityStored+"&appid=";
            let queryURLforecast = baseURLforecast + APIkey;

            $.ajax({
            url: queryURLforecast,
            method: "GET"
            }).then(function(response){

            console.log(response.list)
            
            forecastDay1 = forecastDay1.format('YYYY-MM-DD [12:00:00]');
            forecastDay2 = forecastDay2.format('YYYY-MM-DD [12:00:00]');
            forecastDay3 = forecastDay3.format('YYYY-MM-DD [12:00:00]');
            forecastDay4 = forecastDay4.format('YYYY-MM-DD [12:00:00]');
            forecastDay5 = forecastDay5.format('YYYY-MM-DD [12:00:00]');
        
            // function findForecastInfo(forecastday, forecastDiv){
            //     for (i = 0; i < response.list.length; i++){
            //         if (i === 
            //     }
            // }
        });

            }),

        error: function(error){
            if (error.responseJSON.cod === "400" || "404"){
                alert("Invalid input")
                }
            }
    
    //ajax request closing brackets
    })

//event listener closing brackets
})