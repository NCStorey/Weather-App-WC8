let searchBtn = $('#search-button');
let todayCont = $('#today');
let cityInput = $('#search-input');
let forecastCont = $('#forecast')


let cityArr = []

let currentTime = moment().format("dddd, Do MMMM YYYY")

// let baseURLforecast = "https://api.openweathermap.org/data/2.5/forecast?q="+cityStored+"&appid=";


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

    //ajax request here for validation of city input
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