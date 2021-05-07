/* 워치의 뒤로가기 버튼 활성화하는 함수 */
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
            //window.history.back();
        	 window.location.replace("index.html");
         }
      }
   });
}());

/* location.html 화면이 열릴때 마다 실행되는 함수, 선택된 도와 시군구로 목적지 텍스트를 갱신하는 기능의 함수 */
function init(){
	var c_res = '현위치 : '.concat(localStorage.getItem("c_SEL_DO"),' ',localStorage.getItem("c_SEL_SIGUNGU"));
	var res = '목적지 : '.concat(localStorage.getItem("SEL_DO"),' ',localStorage.getItem("SEL_SIGUNGU"));
	if (localStorage.getItem("c_SEL_DO")){
		var c_element = document.getElementById("txt_nowloc");
		c_element.innerText = c_res;
	}
	
	if(localStorage.getItem("SEL_DO")) {
		var element = document.getElementById("txt_destination");
		element.innerText = res;
	}
}



/*------------------------------------------------------------------------------------------------------------------------------------------------*/

function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError, geo_options);
    	
    }else{
        console.log("지오 로케이션 없음")
    }
};
// getLocation





//function success(position) {
//	  const latitude  = position.coords.latitude;
//	  const longitude = position.coords.longitude;
//
//	  // Do something with your latitude and longitude
//	}
//
//function error() {
//	alert('Sorry, no position available.');
//}
//
//const options = {
//	enableHighAccuracy: true,
//	maximumAge: 30000,
//	timeout: 27000
//};
//
//const watchID = navigator.geolocation.watchPosition(success, error, options);




var Nx;
var Ny;




function locationSuccess(p){
    var latitude = p.coords.latitude,
    longitude = p.coords.longitude;
    var rs = dfs_xy_conv("toXY",latitude,longitude);
    // 위도/경도 -> 기상청 좌표x / 좌표 y 변환
    Nx = rs.nx;
    Ny = rs.ny;
}
//locationSuccess


function locationError(error){
    var errorTypes = {
        0 : "무슨 에러냥~",
        1 : "허용 안눌렀음",
        2 : "위치가 안잡힘",
        3 : "응답시간 지남"
    };
    var errorMsg = errorTypes[error.code];
    console.log(errorMsg)
}
// locationError


var geo_options = {
    enableHighAccuracy: true,
    maximumAge        : 30000,
    timeout           : 27000
};
// geo_options












//LCC DFS 좌표변환을 위한 기초 자료
//
var RE = 6371.00877; // 지구 반경(km)
var GRID = 5.0; // 격자 간격(km)
var SLAT1 = 30.0; // 투영 위도1(degree)
var SLAT2 = 60.0; // 투영 위도2(degree)
var OLON = 126.0; // 기준점 경도(degree)
var OLAT = 38.0; // 기준점 위도(degree)
var XO = 43; // 기준점 X좌표(GRID)
var YO = 136; // 기1준점 Y좌표(GRID)
//
// LCC DFS 좌표변환 ( code : "toXY"(위경도->좌표, v1:위도, v2:경도), "toLL"(좌표->위경도,v1:x, v2:y) )
//
function dfs_xy_conv(code, v1, v2) {
var DEGRAD = Math.PI / 180.0;
var RADDEG = 180.0 / Math.PI;
var re = RE / GRID;
var slat1 = SLAT1 * DEGRAD;
var slat2 = SLAT2 * DEGRAD;
var olon = OLON * DEGRAD;
var olat = OLAT * DEGRAD;
var sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
var sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
sf = Math.pow(sf, sn) * Math.cos(slat1) / sn;
var ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
ro = re * sf / Math.pow(ro, sn);
var rs = {};
if (code == "toXY") {
    rs['lat'] = v1;
    rs['lng'] = v2;
    var ra = Math.tan(Math.PI * 0.25 + (v1) * DEGRAD * 0.5);
    ra = re * sf / Math.pow(ra, sn);
    var theta = v2 * DEGRAD - olon;
    if (theta > Math.PI) theta -= 2.0 * Math.PI;
    if (theta < -Math.PI) theta += 2.0 * Math.PI;
    theta *= sn;
    rs['nx'] = Math.floor(ra * Math.sin(theta) + XO + 0.5);
    rs['ny'] = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);
}
else {
    rs['nx'] = v1;
    rs['ny'] = v2;
    var xn = v1 - XO;
    var yn = ro - v2 + YO;
    ra = Math.sqrt(xn * xn + yn * yn);
    if (sn < 0.0) - ra;
    var alat = Math.pow((re * sf / ra), (1.0 / sn));
    alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;
    if (Math.abs(xn) <= 0.0) {
        theta = 0.0;
    }
    else {
        if (Math.abs(yn) <= 0.0) {
            theta = Math.PI * 0.5;
            if (xn < 0.0) - theta;
        }
        else theta = Math.atan2(xn, yn);
    }
    var alon = theta / sn + olon;
    rs['lat'] = alat * RADDEG;
    rs['lng'] = alon * RADDEG;
}
return rs;
}
//dfs_xy_conv


