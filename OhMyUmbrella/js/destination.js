// 워치의 뒤로가기 버튼 활성화하는 함수
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

// location 페이지의 "목적지:도,시/군/구"를 선택한 목적지로 갱신하는 함수
function DestinationUpdate() {
	var target1 = document.getElementById("area1");
	var target2 = document.getElementById("area2");
	var selected_do = target1.options[target1.selectedIndex].text;
	var selected_sigungu = target2.options[target2.selectedIndex].text;
	// alert(selected_value1 + ' : ' + selected_value2);
	
    var result = '목적지 : '.concat(selected_do,' , ',selected_sigungu);
    localStorage.setItem("RESULT",result);
    // window.open("location.html?");
    // location.href="location.html"
    //xml2jsonCurrentWth("61", "126")
    fun2();
    history.back();
}





// main 페이지의 목적지 날씨 아이콘을 선택한 목적지의 날씨 아이콘으로 갱신하는 함수 (-> 일단 alert 알림창으로 구현)

function fun2() {
//자신이 조회를 원하는 지역의 경도와 위도를 입력해주세요 
var nx = "61"; //경도 
var ny = "126"; //위도 
var baseTime = "1500"; //자신이 조회하고싶은 시간대를 입력해주세요 

// 서비스 인증키입니다. 공공데이터포털에서 제공해준 인증키를 넣어주시면 됩니다. 
var serviceKey = "mlzKHRPrHbPpzQwhDvGPcvWIlwvBQ4Ovap5TRNxs3%2BlQrrCs7dFpbrDCfoLOTJxhD3RJA8l5GS%2B4meEDTtHSzA%3D%3D"; 
// 정보를 모아서 URL정보를 만들면됩니다. 맨 마지막 "&_type=json"에 따라 반환 데이터의 형태가 정해집니다. 
var requestURL = "http://apis.data.go.kr/1360000/VilageFcstInfoService/getVilageFcst?serviceKey=mlzKHRPrHbPpzQwhDvGPcvWIlwvBQ4Ovap5TRNxs3%2BlQrrCs7dFpbrDCfoLOTJxhD3RJA8l5GS%2B4meEDTtHSzA%3D%3D&pageNo=1&numOfRows=10&base_date=20210326&base_time=1400&nx=60&ny=127&dataType=JSON"; 

var request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';
request.send();

request.onload = function() {
	console.log(request);
	}

}






