//var to told html elements
let searchBtn = $('#search-button');
let todayCont = $('#today');
let cityInput = $('#search-input');
let forecastCont = $('#forecast');
let history = $('#history')

//empty city array declared globally
let cityArr = [];

//use of moment to display current date
let currentTime = moment().format("dddd, Do MMMM YYYY");

//open weather API key for current and forecast information.
let APIkey = "1d7e3c1a43a8848ba84bed69fb61e0e0";


//function to make the query URL
function urlMaker(city){

    //uses the base URL + the function input of city 
    let baseURLweather = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=";
    //creates the query URL in ful for the API request
    queryURLweather = baseURLweather + APIkey;}

//previous searches to be made into buttons in the history section to allow the user to research a previous city - function to make this button
function makePrevSearchButton(text){
    
    //creates the button element
    let prevSearchBtn = $('<button>');
    //sets the text of the button element using the function input
    prevSearchBtn.text(text)
    //gives the button and ID tage to allow easy find 
    prevSearchBtn.attr('id', (text))
    //gives it the button class for styling and easy find
    prevSearchBtn.attr('class', 'button')
    //prepends button to the history tag so most recent searches show first
    history.prepend(prevSearchBtn)
}

//this creates a varible to hold the previously save array returned from local storage
let storedArr = JSON.parse(localStorage.getItem("city"))

//takes the stored array and pushes the items in to the city array to preserve the searches and renders the buttons
for (let i = 0; i < storedArr.length; i++){

    makePrevSearchButton(storedArr[i])
    cityArr.push(storedArr[i])

}


//
searchBtn.click(function(event){

    //stop the header dissapearing by preventing the form default
    event.preventDefault()

    cityArr.push(cityInput.val().trim())
    console.log(cityArr)
    //clears the previous searches from the window
    
    infoRender(cityInput.val().trim())
})

history.click(function(event){
    
    button = event.target

    if (button.matches('button')){
        
        let cityName = button.getAttribute('id')
        infoRender(cityName)

    }

    

})


function infoRender (cityStored){

    todayCont.empty()
    forecastCont.empty()

    urlMaker(cityStored)

    //ajax request here
    $.ajax({
    url: queryURLweather,
    method: "GET",
    success: (function(response){

        if (cityInput.val() != ''){
        makePrevSearchButton((cityInput.val().trim()))}

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

        windli.text('Wind: ' + wind + ' KPH')
        windli.attr('class', 'currentvar')

        humidli.text('Humidity: ' + humid + '%')
        humidli.attr('class', 'currentvar')
        
        todayCont.append(descriptionli, templi, windli, humidli)

        

        //logic to create the forecast information

        let h4 = $('<h4>')
        h4.text('5 Day Forecast')
        h4.attr('id', 'h4')
        h4.attr('class', 'col-12')
        forecastCont.append(h4)

        for (let i = 1; i < 6; i++){

            let forecastdiv = $('<div>')
            forecastdiv.attr('class', 'col border forecastDiv')
            forecastdiv.attr('id', ('forecast' + [i]))
            forecastCont.append(forecastdiv)

            let forecastH = $('<h5>')
            forecastH.attr('class', 'forecastHeading')
            forecastH.attr('id', ('forecast' + [i] + 'H'))
            forecastdiv.append(forecastH)

        }

        let forecastDay1 = moment().add(1, 'd')
        let forecastDay2 = moment().add(2, 'd')
        let forecastDay3 = moment().add(3, 'd')
        let forecastDay4 = moment().add(4, 'd')
        let forecastDay5 = moment().add(5, 'd')

        $('#forecast1H').text(forecastDay1.format('DD/MM/YYYY'));
        $('#forecast2H').text(forecastDay2.format('DD/MM/YYYY'));
        $('#forecast3H').text(forecastDay3.format('DD/MM/YYYY'));
        $('#forecast4H').text(forecastDay4.format('DD/MM/YYYY'));
        $('#forecast5H').text(forecastDay5.format('DD/MM/YYYY'));

        let baseURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q="+cityStored+"&appid=";
        let queryURLforecast = baseURLforecast + APIkey;

        $.ajax({
        url: queryURLforecast,
        method: "GET"
        }).then(function(response){
        
        forecastDay1 = forecastDay1.format('YYYY-MM-DD [12:00:00]');
        forecastDay2 = forecastDay2.format('YYYY-MM-DD [12:00:00]');
        forecastDay3 = forecastDay3.format('YYYY-MM-DD [12:00:00]');
        forecastDay4 = forecastDay4.format('YYYY-MM-DD [12:00:00]');
        forecastDay5 = forecastDay5.format('YYYY-MM-DD [12:00:00]');
    
        function findForecastInfo(forecastday, forecastDiv){
            for (i = 0; i < response.list.length; i++){
                if (response.list[i].dt_txt === forecastday){
                    let forecastInfo = response.list[i]

                    let forecastImg = $('<img>')
        
                    let forecastIconURL = "http://openweathermap.org/img/wn/" + (forecastInfo.weather[0].icon) + "@2x.png"
        
                    forecastImg.attr('src' , forecastIconURL)
                    forecastImg.attr('class', 'forecastIcon')

                    forecastDiv.append(forecastImg)

                    let forecastTemp = ((forecastInfo.main.temp) - 273.15).toFixed(1);
                    let forecastWind = forecastInfo.wind.speed
                    let forecastHumid = forecastInfo.main.humidity

                    let forecasttempli = $('<li>')
                    let forecastwindli = $('<li>')
                    let forecasthumidli = $('<li>')

                    forecasttempli.text('Temperature: ' + forecastTemp + ' C')
                    forecastwindli.text('Wind: ' + forecastWind + ' KPH')
                    forecasthumidli.text('Humidity: ' + forecastHumid + '%')

                    forecastDiv.append(forecasttempli, forecastwindli, forecasthumidli)

                }
            }
        }

        findForecastInfo(forecastDay1, $('#forecast1'))
        findForecastInfo(forecastDay2, $('#forecast2'))
        findForecastInfo(forecastDay3, $('#forecast3'))
        findForecastInfo(forecastDay4, $('#forecast4'))
        findForecastInfo(forecastDay5, $('#forecast5'))

        cityInput.val('')

        });

    }),

    error: function(error){
        if (error.responseJSON.cod === "400" || "404"){

            cityArr.splice(-1, 1);

            alert("Invalid input");
            

        }
    }

//ajax request closing brackets
})

}