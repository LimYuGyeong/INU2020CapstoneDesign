/*
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
*/

(function () {
	   window.addEventListener("tizenhwkey", function (ev) {
	      var activePopup = null,
	         page = null,
	         pageId = "";

	      if (ev.keyName === "back") {
	         activePopup = document.querySelector(".ui-popup-active");
	         page = document.getElementsByClassName("ui-page-active")[0];
	         pageId = page ? page.id : "";

	         if (pageId === "main" && !activePopup) {
	            try {
	               tizen.application.getCurrentApplication().exit();
	            } catch (ignore) {
	            }
	         } else {
	            window.history.back();
	         }
	      }
	   });
	}());
 

localStorage.setItem("c_or_d","c");
var c_or_d = localStorage.getItem("c_or_d");
console.log(c_or_d);
/* index.html 화면이 열릴때 마다 실행되는 함수로
 * 상단의 날씨 이미지를 갱신하는 기능
 *  */
function main_init(){
	var now = new Date();
	console.log('now : ', now);
	
	/* 메인 화면 UI 설정 부분 */
	var battery = document.getElementById("battery")
	var bat = localStorage.getItem("BATTERY");
	battery.innerText = bat;
	
	if (parseInt(bat) < 25) {
		alert("우산 충전이 필요합니다");
	}
	
	var textbox = document.getElementById("textbox")
	
	if (localStorage.getItem("UMBRELLA") != null) {
		textbox.innerText = localStorage.getItem("UMBRELLA");
	}
	else{
		textbox.innerText = "내 우산";
	}
	
	var connectStatus = document.getElementById("connectStatus")
	
	if (localStorage.getItem("connectStatus") != null) {
		connectStatus.innerText = localStorage.getItem("connectStatus");
	}
	


   
	   
	var c_or_d = localStorage.getItem("c_or_d");
	console.log("main_init 안");
	console.log(c_or_d);
	if(c_or_d == "c"){
		updateWeatherCurrentLocation();
	}
	else if(c_or_d == "d"){
		updateWeatherDestination();
	}
	
	setTimeout(set_img, 1000);
	
	function set_img(){
	
		if(c_or_d == "c"){
			var POP = localStorage.getItem("c_POP");
			var PTY = localStorage.getItem("c_PTY");
			var SKY = localStorage.getItem("c_SKY");
			var T3H = localStorage.getItem("c_T3H");
		}
		else if(c_or_d == "d"){
			var POP = localStorage.getItem("POP");
			var PTY = localStorage.getItem("PTY");
			var SKY = localStorage.getItem("SKY");
			var T3H = localStorage.getItem("T3H");
		}
		
		if (POP && PTY && SKY && T3H) {
			//var POP = 0;
			//var PTY = 0;
			//var SKY = 4;
			//var T3H = 5;
		
			//날씨 아이콘, 기온, 강수확률
			// PTY 강수형태 (0,없음)(1,비)(2,비/눈)(4,소나기)(5,빗방울)(6,빗방울/눈날림)
			//비가 오는 경우
			if(PTY == 1 || PTY == 2 || PTY == 4 || PTY == 5 || PTY == 6){
				var weather_img = document.getElementById("weather_img");
				weather_img.src = "/image/weather_icon/rain.png";
				
				var hour = localStorage.getItem('HOUR');
				var minute = localStorage.getItem('MINUTE');
				console.log('hour : ', hour, ', minute : ',minute);
				
				if (now.getHours()==hour && now.getMinutes()==minute) {
					console.log('in if');
					var notificationGroupDict =
			    	{
			    	  content: "오늘은 비가 오니 우산을 챙겨가세요!",
			    	  actions: {soundPath: "music/Over the horizon.mp3", vibration: true}
			    	};

			    	var notification = new tizen.UserNotification('SIMPLE', '비 알림', notificationGroupDict);
			    	tizen.notification.post(notification);
				}
				
			}
			// PTY 강수형태 (3,눈)(7,눈날림)
			//눈이 오는 경우
			else if(PTY == 3 || PTY == 7){
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
			var CorD = document.getElementById("CorD");
			if (c_or_d == "c"){
				CorD.innerText = "현위치";
			} 
			else if (c_or_d == "d"){
				CorD.innerText = "목적지";
			}
			
			var Temperatures = document.getElementById("Temperatures");
			Temperatures.innerText = "기온:"+ T3H + "°C";
			// POP 강수확률 #알림은 POP기준
			var probability = document.getElementById("probability");
			probability.innerText = "강수 확률:"+ POP + "%";
		
			}
		else{
				console.log("여기라도..");
				var CorD = document.getElementById("CorD");
				if (c_or_d == "c"){
					CorD.innerText = "현위치";
				} 
				else if (c_or_d == "d"){
					CorD.innerText = "목적지";
				}
				
				var weather_img = document.getElementById("weather_img");
				weather_img.src = "/image/weather_icon/null.png";
				// T3H 3시간 기온
				var Temperatures = document.getElementById("Temperatures");
				Temperatures.innerText = "기온:"+ "미설정";
				// POP 강수확률 #알림은 POP기준
				var probability = document.getElementById("probability");
				probability.innerText = "강수 확률:"+ "미설정";
			}
	}
}

function chageLocation(){
	var c_or_d = localStorage.getItem("c_or_d");
	if(c_or_d == "c"){
		localStorage.setItem("c_or_d","d");
	}
	else{
		localStorage.setItem("c_or_d","c");
	}
	main_init();
}

function updateWeatherCurrentLocation(){
	/* 현재 시간을 매개변수로 하여 날씨정보를 불러올 시간을 반환하는 함수 */
	   function getFormatTime(date) {
		   var hour = date.getHours();
		   var day = date.getDate();
		   
	      if (hour < 3) {
	         temp_hour = '20' 
	        date.setDate(day-1);
	      } else if (hour < 6) {
	         temp_hour = '23' 
        	 date.setDate(day-1);
	      } else if (hour < 9) {
	         temp_hour = '02' 
	      } else if (hour < 12) {
	         temp_hour = '05' 
	      } else if (hour < 15) {
	         temp_hour = '08' 
	      } else if (hour < 18) {
	         temp_hour = '11' 
	      } else if (hour < 21) {
	         temp_hour = '14' 
	      } else if (hour < 24) {
	         temp_hour = '17' 
	      }
	      return temp_hour + '00'    
	   }

	   /* 현재 날짜를 가져오는 함수를 매개변수로 하여 날씨정보를 불러올 날짜를 반환하는 함수 */
	   function getFormatDate(date){
	       var year = date.getFullYear();              // yyyy
	       var month = (1 + date.getMonth());          // M
	       month = month >= 10 ? month : '0' + month;  // month 두자리로 저장
	       var day = date.getDate();                   // d
	       day = day >= 10 ? day : '0' + day;          // day 두자리로 저장
	       return  year + '' + month + '' + day;       // yyyymmdd 형태로 반환
	   }

	   var date = new Date();

	   //hour = date.getHours();                // 현재 시간

	   var base_time = getFormatTime(date)    // 날씨정보를 불러올 시간
	   //console.log(base_time);

	   var base_date = getFormatDate(date);   // 날씨정보를 불러올 날짜
	   console.log('base_date : ' + base_date);



	   var Nx;
	   var Ny;
	      
	      $.ajax({
	          url: '../excel/gisang_real_final_utf.csv',
	          dataType: 'text',
	          //contentType: "application/x-www-form-urlencoded; charset=euc-kr"
	        }).done(successFunction);

	      function successFunction(data) {
	          //console.log('success');

	          var allRows = data.split(/\r?\n|\r/);
	          
	          for (var singleRow = 1; singleRow < allRows.length; singleRow++) {

	             if(allRows[singleRow].includes(localStorage.getItem("c_SEL_DO")) && allRows[singleRow].includes(localStorage.getItem("c_SEL_SIGUNGU")))
	             {
	                var split_str = allRows[singleRow].split(',');
	                Nx = split_str[3];
	                Ny = split_str[4];
	                //console.log('x : ' + Nx + 'y: ' + Ny);
	             }
	             
	          }
	        }


	   /*---------------------------------------------------------------------------------------------*/





	   setTimeout(send_url, 100);  // csv파일을 읽어 온 후 URL을 생성하기 위한 코드

	   var pop;  // 강수확률
	   var pty;  // 강수형태
	   var sky;  // 하늘상태

	   /* 서버에 json 형태의 최신날씨정보를 요청하고 날씨 정보를 로컬스토리지에 저장하는 함수*/
	   function send_url(){

	      var xhr = new XMLHttpRequest();
	       
	       var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst'; /*URL*/
	       var queryParams = '?' + encodeURIComponent('ServiceKey') + '='+'mlzKHRPrHbPpzQwhDvGPcvWIlwvBQ4Ovap5TRNxs3%2BlQrrCs7dFpbrDCfoLOTJxhD3RJA8l5GS%2B4meEDTtHSzA%3D%3D'; /*Service Key*/
	       queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
	       queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
	       queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
	       queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(base_date); /**/
	       queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(base_time); /**/
	       queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(Nx); /**/
	       queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(Ny); /**/
	       xhr.open('GET', url + queryParams);
	       xhr.onreadystatechange = function () {
	           if (this.readyState == 4) {
	              //console.log('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
	              var weather_TEXT = this.responseText;
	              //console.log(weather_TEXT);
	              //console.log(typeof(weather_TEXT));
	              var weather_JSON = JSON.parse(weather_TEXT);
	              //console.log(weather_JSON);
	              //console.log(typeof(weather_JSON));
	              
	              //console.log(base_date);
	              //console.log(base_time);
	              
	              //console.log(Nx);
	              //console.log(Ny);
	              
	              //console.log(weather_JSON.response.body.items.item[0].fcstValue);
	              for (var i = 0; i < 10; i++) {
	           	   if (weather_JSON.response.body.items.item[i].category == "POP"){  // 강수확률 정보를 가져옴
	           		   pop = weather_JSON.response.body.items.item[i].fcstValue;
	           	   }
	           	   else if (weather_JSON.response.body.items.item[i].category == "PTY") {  // 강수형태 정보를 가져옴
	           		   pty = weather_JSON.response.body.items.item[i].fcstValue;
	   			   }
	           	   else if (weather_JSON.response.body.items.item[i].category == "SKY") {  // 하늘상태 정보를 가져옴
	           		   sky = weather_JSON.response.body.items.item[i].fcstValue;
	   			   }
	           	   else if (weather_JSON.response.body.items.item[i].category == "T3H") {  // 3시간 기온 정보를 가져옴
	           		   t3h = weather_JSON.response.body.items.item[i].fcstValue;
	   			   }
	   		      }
	              //console.log(pop);
	              //console.log(pty);
	              //console.log(sky);
	              localStorage.setItem("c_POP",pop);
	              localStorage.setItem("c_PTY",pty);
	              localStorage.setItem("c_SKY",sky);
	              localStorage.setItem("c_T3H",t3h);
	              console.log("c_POP: "+localStorage.getItem("c_POP"));
	              console.log("c_PTY: "+localStorage.getItem("c_PTY"));
	              console.log("c_SKY: "+localStorage.getItem("c_SKY"));
	              console.log("c_T3H: "+localStorage.getItem("c_T3H"));
	              
	            
	              
	           }
	       };

	       xhr.send('');
	   }
	}



function updateWeatherDestination(){
	   /* 현재 시간을 매개변수로 하여 날씨정보를 불러올 시간을 반환하는 함수 */
	   function getFormatTime(date) {
		   var hour = date.getHours();
		   var day = date.getDate();
		   
	      if (hour < 3) {
	         temp_hour = '20' 
	        date.setDate(day-1);
	      } else if (hour < 6) {
	         temp_hour = '23' 
        	 date.setDate(day-1);
	      } else if (hour < 9) {
	         temp_hour = '02' 
	      } else if (hour < 12) {
	         temp_hour = '05' 
	      } else if (hour < 15) {
	         temp_hour = '08' 
	      } else if (hour < 18) {
	         temp_hour = '11' 
	      } else if (hour < 21) {
	         temp_hour = '14' 
	      } else if (hour < 24) {
	         temp_hour = '17' 
	      }
	      return temp_hour + '00'    
	   }

	   /* 현재 날짜를 가져오는 함수를 매개변수로 하여 날씨정보를 불러올 날짜를 반환하는 함수 */
	   function getFormatDate(date){
	       var year = date.getFullYear();              // yyyy
	       var month = (1 + date.getMonth());          // M
	       month = month >= 10 ? month : '0' + month;  // month 두자리로 저장
	       var day = date.getDate();                   // d
	       day = day >= 10 ? day : '0' + day;          // day 두자리로 저장
	       return  year + '' + month + '' + day;       // yyyymmdd 형태로 반환
	   }

	   var date = new Date();

	   //hour = date.getHours();                // 현재 시간

	   var base_time = getFormatTime(date)    // 날씨정보를 불러올 시간
	   //console.log(base_time);

	   var base_date = getFormatDate(date);   // 날씨정보를 불러올 날짜
	   //console.log(base_date);



	   var Nx;
	   var Ny;
	      
	      $.ajax({
	          url: '../excel/gisang_real_final_utf.csv',
	          dataType: 'text',
	          //contentType: "application/x-www-form-urlencoded; charset=euc-kr"
	        }).done(successFunction);

	      function successFunction(data) {
	          //console.log('success');

	          var allRows = data.split(/\r?\n|\r/);
	          
	          for (var singleRow = 1; singleRow < allRows.length; singleRow++) {

	             if(allRows[singleRow].includes(localStorage.getItem("SEL_DO")) && allRows[singleRow].includes(localStorage.getItem("SEL_SIGUNGU")))
	             {
	                var split_str = allRows[singleRow].split(',');
	                Nx = split_str[3];
	                Ny = split_str[4];
	                //console.log('x : ' + Nx + 'y: ' + Ny);
	             }
	             
	          }
	        }


	   /*---------------------------------------------------------------------------------------------*/





	   setTimeout(send_url, 100);  // csv파일을 읽어 온 후 URL을 생성하기 위한 코드

	   var pop;  // 강수확률
	   var pty;  // 강수형태
	   var sky;  // 하늘상태

	   /* 서버에 json 형태의 최신날씨정보를 요청하고 날씨 정보를 로컬스토리지에 저장하는 함수*/
	   function send_url(){

	      var xhr = new XMLHttpRequest();
	       
	       var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst'; /*URL*/
	       var queryParams = '?' + encodeURIComponent('ServiceKey') + '='+'mlzKHRPrHbPpzQwhDvGPcvWIlwvBQ4Ovap5TRNxs3%2BlQrrCs7dFpbrDCfoLOTJxhD3RJA8l5GS%2B4meEDTtHSzA%3D%3D'; /*Service Key*/
	       queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /**/
	       queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /**/
	       queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /**/
	       queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(base_date); /**/
	       queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(base_time); /**/
	       queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(Nx); /**/
	       queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(Ny); /**/
	       xhr.open('GET', url + queryParams);
	       xhr.onreadystatechange = function () {
	           if (this.readyState == 4) {
	              //console.log('Status: '+this.status+'nHeaders: '+JSON.stringify(this.getAllResponseHeaders())+'nBody: '+this.responseText);
	              var weather_TEXT = this.responseText;
	              //console.log(weather_TEXT);
	              //console.log(typeof(weather_TEXT));
	              var weather_JSON = JSON.parse(weather_TEXT);
	              //console.log(weather_JSON);
	              //console.log(typeof(weather_JSON));
	              
	              //console.log(base_date);
	              //console.log(base_time);
	              
	              //console.log(Nx);
	              //console.log(Ny);
	              
	              //console.log(weather_JSON.response.body.items.item[0].fcstValue);
	              for (var i = 0; i < 10; i++) {
	           	   if (weather_JSON.response.body.items.item[i].category == "POP"){  // 강수확률 정보를 가져옴
	           		   pop = weather_JSON.response.body.items.item[i].fcstValue;
	           	   }
	           	   else if (weather_JSON.response.body.items.item[i].category == "PTY") {  // 강수형태 정보를 가져옴
	           		   pty = weather_JSON.response.body.items.item[i].fcstValue;
	   			   }
	           	   else if (weather_JSON.response.body.items.item[i].category == "SKY") {  // 하늘상태 정보를 가져옴
	           		   sky = weather_JSON.response.body.items.item[i].fcstValue;
	   			   }
	           	   else if (weather_JSON.response.body.items.item[i].category == "T3H") {  // 3시간 기온 정보를 가져옴
	           		   t3h = weather_JSON.response.body.items.item[i].fcstValue;
	   			   }
	   		      }
	              //console.log(pop);
	              //console.log(pty);
	              //console.log(sky);
	              localStorage.setItem("POP",pop);
	              localStorage.setItem("PTY",pty);
	              localStorage.setItem("SKY",sky);
	              localStorage.setItem("T3H",t3h);
	              console.log("POP: "+localStorage.getItem("POP"));
	              console.log("PTY: "+localStorage.getItem("PTY"));
	              console.log("SKY: "+localStorage.getItem("SKY"));
	              console.log("T3H: "+localStorage.getItem("T3H"));
	              
	            
	              
	           }
	       };

	       xhr.send('');
	   }
	}
