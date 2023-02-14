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
if (localStorage.getItem("city") != null){

for (let i = 0; i < storedArr.length; i++){

    makePrevSearchButton(storedArr[i])
    cityArr.push(storedArr[i])

}}

//function that performs the ajax requests and makes the required Divs to hold the weather informations. 
function infoRender (cityStored){

    //clear both the weather and forecast containers of the previous search
    todayCont.empty()
    forecastCont.empty()

    //makes the URL for the AJAX request using the variable passed through when the infor render function is called.
    urlMaker(cityStored)


    //ajax request for weather 
    $.ajax({
    url: queryURLweather,
    method: "GET",
    success: (function(response){
    
        //this is a catch to ensure that the user has entered something into the input field
        if (cityInput.val() != ''){
        makePrevSearchButton((cityInput.val().trim()))}

        //creating a h3 element to store the user city
        h3 = $('<h3>');

        //makes the h3 the text that the user input
        h3.text(cityStored +" "+ currentTime);

        //creation of img element for weather icon appended onto H3 elements
        let img = $('<img>')
        let iconURL = "http://openweathermap.org/img/wn/" + (response.weather[0].icon) + "@2x.png"
        img.attr('src' , iconURL)
        img.attr('class', 'currentIcon')
        h3.append(img)
        
        //appends the h3 with weather icon onto the today container to display and the window
        todayCont.append(h3);

        //put the city array into local storage
        localStorage.setItem('city', JSON.stringify(cityArr))


        //code to creat current variables using the response data
        let description = response.weather[0].description
        let temp = (response.main.temp - 273.15).toFixed(1);
        let wind = response.wind.speed;
        let humid = response.main.humidity;
        
        //creation of list elements
        let descriptionli = $('<li>')
        let templi = $('<li>')
        let windli = $('<li>')
        let humidli = $('<li>')

        //text and attribute allocation for variables
        descriptionli.text('Description: ' + description)
        descriptionli.attr('class', 'currentvar')

        templi.text('Temperature: ' + temp + ' C')
        templi.attr('class', 'currentvar')

        windli.text('Wind: ' + wind + ' KPH')
        windli.attr('class', 'currentvar')

        humidli.text('Humidity: ' + humid + '%')
        humidli.attr('class', 'currentvar')
        
        //appending all variables onto the today container
        todayCont.append(descriptionli, templi, windli, humidli)



        //logic to create the forecast information

        //creation of heading for the forecast container 
        let h4 = $('<h4>')
        h4.text('5 Day Forecast')
        h4.attr('id', 'h4')
        h4.attr('class', 'col-12')
        forecastCont.append(h4)

        //creation of 5 forecast divs with heaidng elements
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

        //creation of forecast variables to hold the next 5 days dates
        let forecastDay1 = moment().add(1, 'd')
        let forecastDay2 = moment().add(2, 'd')
        let forecastDay3 = moment().add(3, 'd')
        let forecastDay4 = moment().add(4, 'd')
        let forecastDay5 = moment().add(5, 'd')

        //grabbing the forecast headings made in the for loop above and inserting the correct dates calculated in the forecastDay variables
        $('#forecast1H').text(forecastDay1.format('DD/MM/YYYY'));
        $('#forecast2H').text(forecastDay2.format('DD/MM/YYYY'));
        $('#forecast3H').text(forecastDay3.format('DD/MM/YYYY'));
        $('#forecast4H').text(forecastDay4.format('DD/MM/YYYY'));
        $('#forecast5H').text(forecastDay5.format('DD/MM/YYYY'));

        //new base URL for the forcast information
        let baseURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q="+cityStored+"&appid=";
        let queryURLforecast = baseURLforecast + APIkey;

        //ajax request for forecast information
        $.ajax({
        url: queryURLforecast,
        method: "GET"
        }).then(function(response){
        
        //forecast date stamps are in a certain format YYYY-MM-DD. Time stamp choosen was 12pm formated with [] brackets which will be ignored by moment.
        //below overwrites the previous formats and the variable can now be used to look thorugh the data to pick out specific days and a point in time.
        forecastDay1 = forecastDay1.format('YYYY-MM-DD [12:00:00]');
        forecastDay2 = forecastDay2.format('YYYY-MM-DD [12:00:00]');
        forecastDay3 = forecastDay3.format('YYYY-MM-DD [12:00:00]');
        forecastDay4 = forecastDay4.format('YYYY-MM-DD [12:00:00]');
        forecastDay5 = forecastDay5.format('YYYY-MM-DD [12:00:00]');
    
        //this function creates all of the information needed in each forecast div
        function findForecastInfo(forecastday, forecastDiv){

            //for loop that goes through the repsonse list looking for a specfic date and time
            for (i = 0; i < response.list.length; i++){
                if (response.list[i].dt_txt === forecastday){

                    //stores the found data in a variable
                    let forecastInfo = response.list[i]

                    //forecast icon
                    let forecastImg = $('<img>')
                    let forecastIconURL = "http://openweathermap.org/img/wn/" + (forecastInfo.weather[0].icon) + "@2x.png"
                    forecastImg.attr('src' , forecastIconURL)
                    forecastImg.attr('class', 'forecastIcon')
                    forecastDiv.append(forecastImg)

                    //forecast variables using information returned from ajax request
                    let forecastTemp = ((forecastInfo.main.temp) - 273.15).toFixed(1);
                    let forecastWind = forecastInfo.wind.speed
                    let forecastHumid = forecastInfo.main.humidity

                    //creation of the list items to display the variables
                    let forecasttempli = $('<li>')
                    let forecastwindli = $('<li>')
                    let forecasthumidli = $('<li>')

                    forecasttempli.text('Temperature: ' + forecastTemp + ' C')
                    forecastwindli.text('Wind: ' + forecastWind + ' KPH')
                    forecasthumidli.text('Humidity: ' + forecastHumid + '%')

                    //appending all of the information to the relative forecast div
                    forecastDiv.append(forecasttempli, forecastwindli, forecasthumidli)

        }}}

        //calling the above function to create the information for the 5 forecast divs
        findForecastInfo(forecastDay1, $('#forecast1'))
        findForecastInfo(forecastDay2, $('#forecast2'))
        findForecastInfo(forecastDay3, $('#forecast3'))
        findForecastInfo(forecastDay4, $('#forecast4'))
        findForecastInfo(forecastDay5, $('#forecast5'))

        //removes the input from the search bar 
        cityInput.val('')

        });

    }),

    //catch statement to tell user if the search failed and also to remove the incorrect search from the data 
    error: function(error){
        if (error.responseJSON.cod === "400" || "404"){
            
            cityInput.val('')
            cityArr.splice(-1, 1);
            alert("Invalid input");
            
}}})}

//actions taken when user submits a search query
searchBtn.click(function(event){

    //thie stops the header dissapearing by preventing the form default
    event.preventDefault()

    //takes the user input and stores it into the cityArr - it will later be moved to local storage
    cityArr.push(cityInput.val().trim())

    //function that performs the ajax requests and makes the required Divs to hold the weather informations. 
    infoRender(cityInput.val().trim())
})

//actions taken when a user clicks on a button in the history div
history.click(function(event){
    
    //sets the selected button as the target
    button = event.target

    //this ensures the function only fires if a button has been pressed and not the div itself
    if (button.matches('button')){
        
        //this takes the previously added buttons ID and uses it as the search variable in the ajax request
        let cityName = button.getAttribute('id')

        //runs the function to render the weather information on a previously search city
        infoRender(cityName)

    }

    

})


