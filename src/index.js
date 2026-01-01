import './styles.css'

const changedataBtn = document.getElementById("dataBtn");
const cityInput = document.getElementById("cityInput");
const citySearchBtn = document.getElementById("searchBtn");
const errorBox = document.getElementById("errorBox");

//Event listeners
changedataBtn.addEventListener("click", () => {
    if(changedataBtn.textContent === "Change to Fahrenheit"){
        changedataBtn.textContent = "Change to Celsius";
    }
    else{
        changedataBtn.textContent = "Change to Fahrenheit";
    }
    setUnit();
});

citySearchBtn.addEventListener("click" , () =>{
    const raw = cityInput.value;
    if(raw.trim() === ""){
        wrongInputError();
        return;
    }
    const cityName = raw.trim();
    cityInput.value = "";
    loadPageContnent(cityName);
    resetError();
})


//gets data from API
async function LoadWeatherData(city) {
    let cityName = city.toLowerCase().trim();
    const URL =`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=QU57UCGSRME4SPSKYRKJX22VE`;
    const response = await fetch(URL);
    if (response.status === 400 || response.status === 404) {
        throw new Error('City not found');
    }
    if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

//Loads all contnet
async function loadPageContnent(cityName){
    try{
        const data = await LoadWeatherData(cityName);
        if(!data || !data.days){
            wrongInputError();
            return;
        }
        cityInput.classList.remove("wrong");
        cityInput.placeholder = "City";
        const a = new DOMweather(data);
        //call all dom funcions here
        a.setWeatherInfo();
        a.setEmoji();
        a.setTempFor7days();
    } catch(e){
        console.error(e);
        wrongInputError();
    }
}


loadPageContnent("Paris")

//loads data from api to page
class DOMweather{
    constructor(data){
        this.data = data
    }

    setWeatherInfo(){
        const humiditybox = document.getElementById("humidity");
        humiditybox.textContent = this.data.days[0]["humidity"];
        const windbox = document.getElementById("wind");
        windbox.textContent = this.data.days[0]["windspeed"];
        const rainbox = document.getElementById("rain");
        rainbox.textContent = this.data.days[0]["snow"];
        const cloudsbox = document.getElementById("cloudcover");
        cloudsbox.textContent = this.data.days[0]["cloudcover"];
        const pressurebox = document.getElementById("pressure");
        pressurebox.textContent = this.data.days[0]["pressure"];
        const sunriseTime = document.getElementById("sunrise");
        const sunsetTime = document.getElementById("sunset");
        sunriseTime.textContent = this.data.days[0]["sunrise"];
        sunsetTime.textContent = this.data.days[0]["sunset"];
        const tempNow = document.getElementById("todayTemp");
        const tempTomorrow = document.getElementById("tommorowTemp");
        tempNow.textContent = this.data.days[0]["temp"];
        tempTomorrow.textContent = this.data.days[1]["temp"];
        const cityName = document.getElementById("cityName");
        cityName.textContent = this.data["address"].charAt(0).toUpperCase() + this.data["address"].slice(1);
        const descbox = document.getElementById("desc")
        descbox.textContent = this.data["description"]
    }

    setEmoji(){
        const mainEmojiBox = document.getElementById("emojiCurentWeather");
        const iconData = this.data.days[0]["icon"];
        mainEmojiBox.textContent = this.getEmoji(iconData)
        
    }


    setTempFor7days(){
        const day1date = document.getElementById("date1");
        const day1temp = document.getElementById("weather1");
        const emoji1box = document.getElementById("emoji1")
        day1date.textContent = this.data.days[0]["datetime"]
        day1temp.textContent = this.data.days[0]["temp"]
        emoji1box.textContent = this.getEmoji(this.data.days[0]["icon"])

        const day2date = document.getElementById("date2");
        const day2temp = document.getElementById("weather2");
        const emoji2box = document.getElementById("emoji2")
        day2date.textContent = this.data.days[1]["datetime"]
        day2temp.textContent = this.data.days[1]["temp"]
        emoji2box.textContent = this.getEmoji(this.data.days[1]["icon"])

        const day3date = document.getElementById("date3");
        const day3temp = document.getElementById("weather3");
        const emoji3box = document.getElementById("emoji3")
        day3date.textContent = this.data.days[2]["datetime"]
        day3temp.textContent = this.data.days[2]["temp"]
        emoji3box.textContent = this.getEmoji(this.data.days[2]["icon"])

        const day4date = document.getElementById("date4");
        const day4temp = document.getElementById("weather4");
        const emoji4box = document.getElementById("emoji4")
        day4date.textContent = this.data.days[3]["datetime"]
        day4temp.textContent = this.data.days[3]["temp"]
        emoji4box.textContent = this.getEmoji(this.data.days[3]["icon"])

        const day5date = document.getElementById("date5");
        const emoji5box = document.getElementById("emoji5")
        const day5temp = document.getElementById("weather5");
        day5date.textContent = this.data.days[4]["datetime"]
        day5temp.textContent = this.data.days[4]["temp"]
        emoji5box.textContent = this.getEmoji(this.data.days[4]["icon"])

        const day6date = document.getElementById("date6");
        const day6temp = document.getElementById("weather6");
        const emoji6box = document.getElementById("emoji6")
        day6date.textContent = this.data.days[5]["datetime"]
        day6temp.textContent = this.data.days[5]["temp"]
        emoji6box.textContent = this.getEmoji(this.data.days[5]["icon"])

        const day7date = document.getElementById("date7");
        const day7temp = document.getElementById("weather7");
        const emoji7box = document.getElementById("emoji7")
        day7date.textContent = this.data.days[6]["datetime"]
        day7temp.textContent = this.data.days[6]["temp"]
        emoji7box.textContent = this.getEmoji(this.data.days[7]["icon"])
    }

    //return emoji based on "icon" 
    getEmoji(Data){
        switch (Data) {
            case "snow":
                return "🌨️";
                
            case "rain":
                return "🌧️";
                
            case "fog":
                return "🌫️";
                
            case "wind":
                return "💨";
                
            case "cloudy":
                return "☁️";
                
            case "partly-cloudy-day":
                return "🌥️";
                
            case "partly-cloudy-night":
                return "😶‍🌫️";
                
            case "clear-day":
                return "☀️";
                
            case "clear-night":
                return "🌕";
                
        
            default:
                return  "✨";
                
        }
    }

}




function setUnit(){
    const unit = (changedataBtn.textContent === "Change to Celsius") ? "F" : "C";
    const unitBoxes = document.querySelectorAll(".unit");
        

    unitBoxes.forEach(el => {
        el.textContent = unit; 
    });

    changeCurentTemp(unit);
}


//changes curently displayed temperaturees based on selected unit
function changeCurentTemp(unit){
    const mainTemp = document.getElementById("todayTemp");
    const tommorowTemp = document.getElementById("tommorowTemp");
    const weather1 = document.getElementById("weather1");
    const weather2 = document.getElementById("weather2");
    const weather3 = document.getElementById("weather3");
    const weather4 = document.getElementById("weather4");
    const weather5 = document.getElementById("weather5");
    const weather6 = document.getElementById("weather6");
    const weather7 = document.getElementById("weather7");

    console.log(unit)
    if(unit === "F"){
        mainTemp.textContent = (document.getElementById("todayTemp").textContent * 1.8 + 32).toFixed(1);
        tommorowTemp.textContent = (document.getElementById("tommorowTemp").textContent * 1.8 + 32).toFixed(1);
        weather1.textContent = (document.getElementById("weather1").textContent * 1.8 + 32).toFixed(1);
        weather2.textContent = (document.getElementById("weather2").textContent * 1.8 + 32).toFixed(1);
        weather3.textContent = (document.getElementById("weather3").textContent * 1.8 + 32).toFixed(1);
        weather4.textContent = (document.getElementById("weather4").textContent * 1.8 + 32).toFixed(1);
        weather5.textContent = (document.getElementById("weather5").textContent * 1.8 + 32).toFixed(1);
        weather6.textContent = (document.getElementById("weather6").textContent * 1.8 + 32).toFixed(1);
        weather7.textContent = (document.getElementById("weather7").textContent * 1.8 + 32).toFixed(1);
    }
    else{
        mainTemp.textContent = ((document.getElementById("todayTemp").textContent - 32) / 1.8).toFixed(1);
        tommorowTemp.textContent = ((document.getElementById("tommorowTemp").textContent - 32) / 1.8).toFixed(1);
        weather1.textContent = ((document.getElementById("weather1").textContent - 32) / 1.8).toFixed(1);
        weather2.textContent = ((document.getElementById("weather2").textContent - 32) / 1.8).toFixed(1);
        weather3.textContent = ((document.getElementById("weather3").textContent - 32) / 1.8).toFixed(1);
        weather4.textContent = ((document.getElementById("weather4").textContent - 32) / 1.8).toFixed(1);
        weather5.textContent = ((document.getElementById("weather5").textContent - 32) / 1.8).toFixed(1);
        weather6.textContent = ((document.getElementById("weather6").textContent - 32) / 1.8).toFixed(1);
        weather7.textContent = ((document.getElementById("weather7").textContent - 32) / 1.8).toFixed(1);
    }
}





function wrongInputError(){
    cityInput.classList.add("inputError");
    errorBox.textContent = "Invalid name";
}

function resetError(){
    cityInput.classList.remove("inputError");
    errorBox.textContent = "";
}