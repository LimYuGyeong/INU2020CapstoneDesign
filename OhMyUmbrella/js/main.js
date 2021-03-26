
window.onload = function () {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
	try {
	    tizen.application.getCurrentApplication().exit();
	} catch (ignore) {
	}
    });

    // Sample code
    var textbox = document.querySelector('.contents');
    textbox.addEventListener("click", function(){
    	box = document.querySelector('#textbox');
    	//box.innerHTML = box.innerHTML == "내 우산" ? "내 우산" : "내 우산";
    });
    
};
 




/**
 * Updates weather icon, status and text.
 * @private
 */
function updateWeather() {
    /**
     * xmlHttp - XMLHttpRequest object for get information about weather
     */
    var xmlHttp = new XMLHttpRequest(),
        weatherInform,
        elWeatherIcon = document.querySelector("#weather-icon"),
        elWeatherText = document.querySelector("#weather-text"),
        weatherIcon,
        weatherText;

    xmlHttp.overrideMimeType("application/json");
    xmlHttp.open("GET", URL_WEATHER_DATA, false);
    xmlHttp.onreadystatechange = function() {
        // Checks responseText isn't empty
        if (xmlHttp.responseText) {
            // Parses responseText to JSON
            weatherInform = JSON.parse(xmlHttp.responseText);
            // Gets icon code from information
            weatherIcon = weatherInform.weather[0].icon;
            // Gets weather string from information
            weatherText = weatherInform.weather[0].main;

            elWeatherIcon.style.backgroundImage = "url('./image/weather_icon/" + weatherIcon + ".png')";
            elWeatherText.innerHTML = weatherText;
        }
        // If reponseText is empty, set no wifi icon.
        else {
            setDisableIcon("wifi");
        }
    };

    xmlHttp.send();
}