
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
 

/* index.html 화면이 열릴때 마다 실행되는 함수로
 * 상단의 날씨 이미지를 갱신하는 기능
 *  */
function init(){
	var POP = localStorage.getItem("POP");
	var PTY = localStorage.getItem("PTY");
	var SKY = localStorage.getItem("SKY");
	var T3H = localStorage.getItem("T3H");
	
	//var POP = 0;
	//var PTY = 0;
	//var SKY = 4;
	//var T3H = 5;

	//날씨 아이콘, 기온, 강수확률
	// PTY 강수형태 (0,없음)(1,비)(2,비/눈)(4,소나기)(5,빗방울)(6,빗방울/눈날림)
	//비가 오는 경우
	if(PTY == 1 || PTY == 2){
		var weather_img = document.getElementById("weather_img");
		weather_img.src = "/image/weather_icon/rain.png";
	}
	// PTY 강수형태 (3,눈)(7,눈날림)
	//눈이 오는 경우
	else if(PTY == 3){
		var weather_img = document.getElementById("weather_img");
		weather_img.src = "/image/weather_icon/snow.png";
	}
	// SKY 하늘상태 (1,맑음)
	//맑은 경우
	else if(SKY == 1){
		var weather_img = document.getElementById("weather_img");
		weather_img.src = "/image/weather_icon/sunny.png";
	}
	// SKY 하늘상태 (3,구름많음)(4,흐림)
	//구름이 많거나 흐린 경우 
	else if(SKY == 3 || SKY == 4){
		var weather_img = document.getElementById("weather_img");
		weather_img.src = "/image/weather_icon/cloud.png";
	}
	
		
	// T3H 3시간 기온
	var Temperatures = document.getElementById("Temperatures");
	Temperatures.innerText = "기온:"+ T3H + "°C";
	// POP 강수확률 #알림은 POP기준
	var probability = document.getElementById("probability");
	probability.innerText = "강수 확률:"+ POP + "%";

}

