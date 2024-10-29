// run whenever the dom loaded 
document.addEventListener('DOMContentLoaded',()=>{
    const weatherInfo = document.getElementById("weather-info")
    let content = document.getElementById("weather-input")
    let cityDisplay = document.getElementById("city-name")
    let temparatureDisplay = document.getElementById("temperature")
    let descriptionDisplay = document.getElementById("description")
    let errorMessageDisplay = document.getElementById("error-message")
    let cityName = ''

    const API_KEY = '4ad3c6ca350aba78ca187ad69379ba23'
    let getCityText = document.getElementById("submit-city").
    addEventListener("click",async (event)=>{
        cityName = content.value.trim()
        if(!cityName) return
        // server requesting part for data fetching from the api 

        try {
           const weatherData = await fetchWeatherData(cityName)
           displayWeatherData(weatherData) 
        } catch (error) {
            displayError()
        }   
    })
    
    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
        const response = await fetch(url)
        if(!response.ok){
            throw new Error("City Not Found");
        }
        const data = await response.json()
        return data
    }

    function displayWeatherData(data) {
        const {name, main, weather} = data;
        cityDisplay.textContent = `City : `+name;
        temparatureDisplay.textContent = `Temparature: ` + main.temp + ` F`
        descriptionDisplay.textContent = `Weather: `+ weather[0].description
        console.log(data)

        // add hidden class to hide the error msg in the dom result in the box 
        errorMessageDisplay.classList.add('hidden');
    }

    function displayError() {
    console.log(errorMessageDisplay.classList)
        errorMessageDisplay.classList.remove("hidden")
        console.log(errorMessageDisplay.classList)
    }

})